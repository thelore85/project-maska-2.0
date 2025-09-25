import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Company {
    id: number
    name: string
    cif: string
    sector: string
    slug: string
    container_docs: string
    container_evidence: string
}

interface CompanyState {
    company: Company | null
    setCompany: (company: Company) => void
    clearCompany: () => void
    updateCompany: (updates: Partial<Company>) => void
}

export const useCompanyStore = create<CompanyState>()(
    persist(
        (set, get) => ({
            company: null,

            setCompany: (company: Company) => {
                set({ company })
            },

            clearCompany: () => {
                set({ company: null })
            },

            updateCompany: (updates: Partial<Company>) => {
                const currentCompany = get().company
                if (currentCompany) {
                    set({
                        company: { ...currentCompany, ...updates }
                    })
                }
            }
        }),
        {
            name: 'company-storage'
        }
    )
)
