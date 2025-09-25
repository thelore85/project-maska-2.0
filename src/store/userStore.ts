import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
    id: number
    tenant_id: string
    sub: string
    email: string
    name: string
    oid: string
    created_at: string
    updated_at: string
}

interface UserState {
    user: User | null
    isAuthenticated: boolean
    setUser: (user: User) => void
    clearUser: () => void
    updateUser: (updates: Partial<User>) => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user: User) => {
                set({
                    user,
                    isAuthenticated: true
                })
            },

            clearUser: () => {
                set({
                    user: null,
                    isAuthenticated: false
                })
            },

            updateUser: (updates: Partial<User>) => {
                const currentUser = get().user
                if (currentUser) {
                    set({
                        user: { ...currentUser, ...updates }
                    })
                }
            }
        }),
        {
            name: 'user-storage'
        }
    )
)
