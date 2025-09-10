import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/styles/index.css'
import App from '@/App'

import { MsalProvider } from '@azure/msal-react'
import { msal, initializeMsal } from '@/features/auth/utils/msalClient'

const queryClient = new QueryClient()

// Initialize MSAL before rendering
initializeMsal().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <MsalProvider instance={msal}>
                    <App />
                </MsalProvider>
            </QueryClientProvider>
        </StrictMode>
    )
}).catch(console.error)
