// New file: client/src/store/authStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type User = {
    id: string
    email: string
}

type AuthState = {
    isAuthenticated: boolean
    token: string | null
    user: User | null
}

type AuthActions = {
    login: () => void
    logout: () => void
    setToken: (token: string | null) => void
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            ...initialState,
            login: () =>
                set({
                    isAuthenticated: true
                }),
            logout: () => set({ ...initialState }),
            setToken: (token: string | null) =>
                set({
                    token,
                    isAuthenticated: !!token
                })
        }),
        {
            name: 'authStorage',
            storage: createJSONStorage(() => localStorage)
            // partialize: (state) => ({
            //   isAuthenticated: state.isAuthenticated,
            //   token: state.token,
            //   user: state.user,
            // }),
        }
    )
)
