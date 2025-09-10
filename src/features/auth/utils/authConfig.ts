import type { Configuration } from '@azure/msal-browser'
const DOMAIN = import.meta.env.VITE_B2C_AUTH_DOMAIN // greenimpactcust.ciamlogin.com
const TENANT = import.meta.env.VITE_B2C_TENANT // greenimpactcust.onmicrosoft.com
const CLIENT = import.meta.env.VITE_B2C_SPA_CLIENT_ID // GUID del SPA
const SCOPE = import.meta.env.VITE_API_SCOPE // api://.../access_as_user

// En CIAM/B2C usa TU dominio + tenant y marca knownAuthorities:
const authority = `https://${DOMAIN}/${TENANT}/`

export const msalConfig: Configuration = {
    auth: {
        clientId: CLIENT,
        authority,
        knownAuthorities: [DOMAIN], // requerido para B2C/External ID
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin
    },
    cache: { cacheLocation: 'localStorage' },
    system: {
        loggerOptions: {
            logLevel: 1, // Info level for debugging
            loggerCallback: (level, message, containsPii) => {
                if (!containsPii) {
                    console.log(`MSAL: ${message}`)
                }
            }
        }
    }
}
export const loginRequest = { scopes: [SCOPE] }
