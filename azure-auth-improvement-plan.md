# Piano di Miglioramento - Sistema Autenticazione Azure B2C

## PROBLEMI IDENTIFICATI

### 🔴 CRITICI
1. **getAccessToken()** - Bug nel flow redirect (ritorna stringa vuota)
2. **Store Zustand** - Completamente scollegato da MSAL 
3. **Token refresh** - Non gestito automaticamente
4. **Error handling** - Insufficiente in tutte le funzioni API

### ⚠️ SICUREZZA  
5. **Token validation** - Mancante controllo validità/scadenza
6. **Console.log** - Rimasto in produzione (auth.api.ts:14)
7. **Error exposure** - Errori MSAL non gestiti correttamente

### 🟡 ARCHITETTURA
8. **LoginButton** - Responsabilità multiple (login/logout/test)
9. **Duplicazione** - Logout in 2 componenti diversi
10. **React Query** - Query inutile per auth (useAzureLogin)

---

## PIANO DI IMPLEMENTAZIONE

### FASE 1: FIX CRITICI (Priorità ALTA)

#### Step 1.1: Fix getAccessToken()
- **File**: `src/features/auth/utils/msalClient.ts:16-25`
- **Problema**: Dopo redirect, il token non viene recuperato
- **Soluzione**: Implementare pattern async/await corretto con gestione redirect

#### Step 1.2: Sincronizzazione Store
- **File**: `src/store/authStore.ts`
- **Problema**: Store isolato da MSAL, stato inconsistente
- **Soluzione**: Hook per sincronizzare MSAL accounts → Zustand

#### Step 1.3: Error Handling
- **File**: `src/features/auth/api/auth.api.ts`
- **Problema**: Errori non gestiti, console.log in produzione
- **Soluzione**: Try/catch appropriati + logging condizionale

### FASE 2: SICUREZZA (Priorità ALTA)

#### Step 2.1: Token Validation
- **Nuovo file**: `src/features/auth/utils/tokenValidator.ts`
- **Funzione**: Validare token prima dell'uso (scadenza, formato)

#### Step 2.2: Auto Token Refresh
- **File**: `src/features/auth/utils/msalClient.ts`
- **Implementazione**: Interceptor per refresh automatico

### FASE 3: REFACTORING ARCHITETTURA (Priorità MEDIA)

#### Step 3.1: Separazione Componenti
- **LoginButton** → Solo login
- **LogoutButton** → Solo logout  
- **AuthTestPanel** → Testing (solo dev)

#### Step 3.2: Pulizia React Query
- Rimuovere `useAzureLogin` query inutile
- Sostituire con mutation per operazioni auth

#### Step 3.3: Centralizzazione Auth Logic
- **Nuovo file**: `src/features/auth/hooks/useAuth.ts`
- Hook centralizzato per tutte le operazioni auth

---

## IMPLEMENTAZIONE DETTAGLIATA

### 1. NUOVO msalClient.ts (FIX PRINCIPALE)

```typescript
// src/features/auth/utils/msalClient.ts
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser'
import { msalConfig, loginRequest } from './authConfig'

export const msal = new PublicClientApplication(msalConfig)

export async function initializeMsal(): Promise<void> {
  await msal.initialize()
  await msal.handleRedirectPromise()
}

export async function getAccessToken(): Promise<string> {
  const account = getActiveAccount()
  if (!account) throw new Error('No active account')

  try {
    const response = await msal.acquireTokenSilent({
      ...loginRequest,
      account
    })
    return response.accessToken
  } catch (error) {
    // Fallback a interactive token
    const response = await msal.acquireTokenPopup(loginRequest)
    return response.accessToken
  }
}

function getActiveAccount(): AccountInfo | null {
  const accounts = msal.getAllAccounts()
  return accounts[0] || null
}
```

### 2. NUOVO Auth Hook Centralizzato

```typescript
// src/features/auth/hooks/useAuth.ts
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { msal, getAccessToken } from '../utils/msalClient'

export function useAuth() {
  const { setToken, setUser, logout } = useAuthStore()
  
  useEffect(() => {
    // Sync MSAL → Zustand
    const accounts = msal.getAllAccounts()
    if (accounts.length > 0) {
      setUser({ 
        id: accounts[0].localAccountId, 
        email: accounts[0].username 
      })
      // Token sarà recuperato on-demand
    }
  }, [])

  const login = async () => {
    await msal.loginPopup(loginRequest)
    // Auto-sync dopo login
  }

  const handleLogout = () => {
    logout() // Store
    msal.logoutRedirect() // MSAL
  }

  return { login, logout: handleLogout, getAccessToken }
}
```

### 3. API SECURITY IMPROVEMENTS

```typescript
// src/features/auth/utils/tokenValidator.ts
export function isTokenValid(token: string): boolean {
  if (!token) return false
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000
    return Date.now() < exp
  } catch {
    return false
  }
}

// src/features/auth/api/auth.api.ts
import { getAccessToken } from '../utils/msalClient'
import { isTokenValid } from '../utils/tokenValidator'

export async function callMe() {
  try {
    const token = await getAccessToken()
    
    if (!isTokenValid(token)) {
      throw new Error('Invalid or expired token')
    }

    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Auth API error:', error)
    throw error
  }
}
```

---

## TIMELINE IMPLEMENTAZIONE

### 🚨 IMMEDIATO (1-2 ore)
- [ ] Fix getAccessToken() function
- [ ] Rimuovere console.log da produzione  
- [ ] Implementare basic error handling

### 📅 SETTIMANA 1 (8 ore)
- [ ] Sincronizzazione Store ↔ MSAL
- [ ] Token validation
- [ ] Refactoring componenti Login/Logout

### 📅 SETTIMANA 2 (4 ore)  
- [ ] Auto token refresh
- [ ] Hook centralizzato useAuth
- [ ] Testing e documentazione

---

## RISCHI E MITIGAZIONI

### 🚨 ALTO RISCHIO
- **Breaking changes** → Test approfonditi prima del deploy
- **Token refresh loops** → Implementare circuit breaker

### ⚠️ MEDIO RISCHIO  
- **MSAL config changes** → Backup configurazione attuale
- **Store state inconsistency** → Implementare gradualmente

---

## TESTING STRATEGY

### Unit Tests
- [ ] msalClient functions
- [ ] tokenValidator utilities
- [ ] useAuth hook

### Integration Tests
- [ ] Login/logout flow completo
- [ ] Token refresh scenarios
- [ ] Error handling paths

### Manual Testing
- [ ] Login con utente reale
- [ ] Refresh token scaduto
- [ ] Network errors
- [ ] Redirect flow

---

## POST-IMPLEMENTAZIONE

### Monitoring
- Log errori autenticazione
- Metriche token refresh
- Tempo login/logout

### Performance
- Riduzione chiamate API ridondanti
- Cache intelligente dei token
- Lazy loading dei moduli auth

---

**NOTA**: Questo piano segue l'approccio conservativo richiesto - modifiche chirurgiche, un file alla volta, con testing incrementale.