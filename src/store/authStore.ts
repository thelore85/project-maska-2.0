import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { useUserStore } from './userStore'
import { useCompanyStore } from './companyStore'
import { useDocsStore } from './docsStore'
import type { User } from './userStore'
import type { Company } from './companyStore'
import type { Document } from './docsStore'

type LoginResponse = {
  user: User
  company: Company
  docs: Document[]
}

type AuthState = {
  isAuthenticated: boolean
  token: string | null
}

type AuthActions = {
  login: (loginData: LoginResponse) => void
  logout: () => void
  setToken: (token: string | null) => void
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        // Initial State
        ...initialState,

        // Actions
        login: (loginData: LoginResponse) => {
          const { user, company, docs } = loginData

          useUserStore.getState().setUser(user)
          useCompanyStore.getState().setCompany(company)
          useDocsStore.getState().setDocs(docs)

          set({
            isAuthenticated: true
          })
        },

        logout: () => {
          useUserStore.getState().clearUser()
          useCompanyStore.getState().clearCompany()
          useDocsStore.getState().clearDocs()

          set({ ...initialState })
        },

        setToken: (token: string | null) => set({ token, isAuthenticated: !!token })
      }),
      {
        name: 'authStorage',
        storage: createJSONStorage(() => localStorage)
      }
    ),
    { name: 'authStore' }
  )
)
