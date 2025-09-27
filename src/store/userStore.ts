import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  id: number
  tenant_id: string
  sub: string
  email: string
  name: string
  oid: string
  created_at: string
  updated_at: string
}

type UserState = {
  user: User | null
  isAuthenticated: boolean
}

type UserActions = {
  setUser: (user: User) => void
  clearUser: () => void
  updateUser: (updates: Partial<User>) => void
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      // Initial State
      ...initialState,

      // Actions
      setUser: (user: User) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) set({ user: { ...currentUser, ...updates } })
      }
    }),
    {
      name: 'user-storage'
    }
  )
)
