import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

type Company = {
    id: number
    name: string
    slug: string
    cif: string
    sector: string
    status: 'active' | 'inactive'
}

type CompanyState = {
    companies: Company[]
    selectedCompany: Company | null
    isLoading: boolean
    error: string | null
    filters: {
        sector: string
        searchQuery: string
    }
}

type CompanyActions = {
    createCompany: (data: Omit<Company, 'id' | 'slug' | 'status'>) => Promise<void>
    updateCompany: (id: number, data: Partial<Company>) => Promise<void>
    deleteCompany: (id: number) => Promise<void>
    setSelectedCompany: (company: Company | null) => void
    setFilters: (filters: Partial<CompanyState['filters']>) => void
    fetchCompanies: () => Promise<void>
    clearError: () => void
    resetFilters: () => void
}

const initialState: CompanyState = {
    companies: [],
    selectedCompany: null,
    isLoading: false,
    error: null,
    filters: {
        sector: '',
        searchQuery: ''
    }
}

export const useCompanyStore = create<CompanyState & CompanyActions>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,

                createCompany: async (data) => {
                    set({ isLoading: true, error: null })
                    try {
                        // TODO: Replace with actual API call
                        const newCompany: Company = {
                            ...data,
                            id: Math.floor(Math.random() * 1000), // Mock ID
                            slug: data.name.toLowerCase().replace(/\s+/g, '-'),
                            status: 'active' as const
                        }

                        set((state) => ({
                            companies: [...state.companies, newCompany],
                            isLoading: false
                        }))
                    } catch (error) {
                        set({
                            error: error instanceof Error ? error.message : 'Errore nella creazione',
                            isLoading: false
                        })
                    }
                },

                updateCompany: async (id, data) => {
                    set({ isLoading: true, error: null })
                    try {
                        // TODO: Replace with actual API call
                        set((state) => ({
                            companies: state.companies.map((company) => (company.id === id ? { ...company, ...data } : company)),
                            selectedCompany: state.selectedCompany?.id === id ? { ...state.selectedCompany, ...data } : state.selectedCompany,
                            isLoading: false
                        }))
                    } catch (error) {
                        set({
                            error: error instanceof Error ? error.message : "Errore nell'aggiornamento",
                            isLoading: false
                        })
                    }
                },

                deleteCompany: async (id) => {
                    set({ isLoading: true, error: null })
                    try {
                        // TODO: Replace with actual API call
                        set((state) => ({
                            companies: state.companies.filter((company) => company.id !== id),
                            selectedCompany: state.selectedCompany?.id === id ? null : state.selectedCompany,
                            isLoading: false
                        }))
                    } catch (error) {
                        set({
                            error: error instanceof Error ? error.message : "Errore nell'eliminazione",
                            isLoading: false
                        })
                    }
                },

                fetchCompanies: async () => {
                    set({ isLoading: true, error: null })
                    try {
                        // TODO: Replace with actual API call
                        // const response = await fetch('/api/companies')
                        // const companies = await response.json()

                        // Mock data for now
                        const mockCompanies: Company[] = []

                        set({
                            companies: mockCompanies,
                            isLoading: false
                        })
                    } catch (error) {
                        set({
                            error: error instanceof Error ? error.message : 'Errore nel caricamento',
                            isLoading: false
                        })
                    }
                },

                setSelectedCompany: (company) => set({ selectedCompany: company }),

                setFilters: (filters) =>
                    set((state) => ({
                        filters: { ...state.filters, ...filters }
                    })),

                clearError: () => set({ error: null }),

                resetFilters: () => set({ filters: initialState.filters })
            }),
            {
                name: 'companyStorage',
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({
                    companies: state.companies,
                    selectedCompany: state.selectedCompany,
                    filters: state.filters
                })
            }
        ),
        { name: 'companyStore' }
    )
)
