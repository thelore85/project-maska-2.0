import { useMutation } from '@tanstack/react-query'
import { createCompany, type CreateCompanyRequest } from './company.api'

export function useCreateCompany() {
    return useMutation({
        mutationFn: (data: CreateCompanyRequest) => createCompany(data),
        onSuccess: (data) => {
            console.log('Company created successfully:', data)
        },
        onError: (error) => {
            console.error('Failed to create company:', error)
        }
    })
}
