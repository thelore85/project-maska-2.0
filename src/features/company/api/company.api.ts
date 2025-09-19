import { getAccessToken } from '@/features/auth/utils/msalClient'

const API_BASE = import.meta.env.VITE_API_BASE

export type CreateCompanyRequest = {
    name: string
    cif: string
    sector: string
}

export type CreateCompanyResponse = {
    id: number
    name: string
    slug: string
    cif: string
    sector: string
    status: 'active' | 'inactive'
}

export async function createCompany(data: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    try {
        const token = await getAccessToken()
        const response = await fetch(`${API_BASE}/company/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        console.log('✅ createCompany success:', result)

        return result.company
    } catch (error) {
        console.error('❌ createCompany failed:', error)
        throw error
    }
}
