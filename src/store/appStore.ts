import { create } from 'zustand'
import type { ArticleCard, ClaimCards } from '@/types/compTypes'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

type AppStore = {
  init: boolean
  claimCards: ClaimCards[]
  articleList: ArticleCard[] | null
  cardSelected: number | null
  articleSelected: number | null
  searchQuery: string
}

type AppActions = {
  setSearchQuery: (query: string) => void
  resetArticleList: () => void
  restartApp: () => void
  initDataApp: (data: ArticleCard[]) => void
  selectCard: (id: number | null) => void
  selectArticle: (id: number | null) => void
}

const initialState: AppStore = { init: true, cardSelected: null, articleSelected: null, claimCards: [], articleList: [], searchQuery: '' }

export const useStore = create<AppStore & AppActions>()(
  devtools(
    persist(
      (set) => ({
        // Data Store
        ...initialState,

        // Actions
        setSearchQuery: (query) => set({ searchQuery: query }),
        initDataApp: (data) => set({ articleList: data, init: true }),
        restartApp: () => set({ init: false, cardSelected: null, articleSelected: null, claimCards: [], articleList: [], searchQuery: '' }),
        selectCard: (id) => set({ cardSelected: id }),
        resetArticleList: () => set({ articleList: [] }),
        selectArticle: (id) => set({ articleSelected: id })
      }),
      {
        name: 'appStorage',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)
