import { useQuery } from '@tanstack/react-query'
import { callMe } from '@/features/auth/api'

export function useAzureLogin(enabled = true) {
  return useQuery({
    queryKey: ['auth', 'azureLogin'],
    queryFn: () => callMe(),
    enabled: enabled,
    staleTime: 0, // Sempre considera i dati stale
    retry: false // Non riprovare se fallisce
  })
}
