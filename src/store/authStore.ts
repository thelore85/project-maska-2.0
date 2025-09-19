// New file: client/src/store/authStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

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
    setUser: (user: User | null) => void
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null
}

export const useAuthStore = create<AuthState & AuthActions>()(
    devtools(
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
                    }),
                setUser: (user: User | null) =>
                    set({
                        user,
                        isAuthenticated: !!user
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
        ),
        { name: 'authStore' }
    )
)
