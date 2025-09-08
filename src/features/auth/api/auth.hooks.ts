import { useMutation, useQuery } from '@tanstack/react-query'
import { authAPI } from './auth.api'

export function useLogin() {
  const mutation = useMutation({
    mutationFn: authAPI.login,
    retry: false,
  })

  const login = (body: { email: string; password: string }) => mutation.mutateAsync(body)

  return {
    login,
    data: mutation.data,
    error: mutation.error,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  }
}

export function useMe(token?: string, enabled = true) {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authAPI.me(token),
    enabled: !!token && enabled,
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
  })
}
