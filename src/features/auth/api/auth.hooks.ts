import { useQuery } from '@tanstack/react-query'
import { callMe } from '@/features/auth/api'

// export function useLogin() {
//   const mutation = useMutation({
//     mutationFn: authAPI.login,
//     retry: false,
//   })

//   const login = (body: { email: string; password: string }) => mutation.mutateAsync(body)

//   return {
//     login,
//     data: mutation.data,
//     error: mutation.error,
//     isLoading: mutation.isPending,
//     reset: mutation.reset,
//   }
// }

export function useAzureLogin(enabled = true) {
  return useQuery({
    queryKey: ['auth', 'azureLogin'],
    queryFn: () => callMe(),
    enabled: enabled,
  })
}
