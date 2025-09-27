import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Document = {
  id: number
  company_id: number
  kind: string
  title: string | null
  issue_date: string | null
  status: string
  analyzed: number
  created_by: number
  created_at: string
  updated_at: string
  upload_id: number
  original_filename: string
  size_bytes: number
  content_type: string
}

type DocsStore = {
  docs: Document[]
}

type DocsActions = {
  setDocs: (docs: Document[]) => void
  clearDocs: () => void
  addDoc: (doc: Document) => void
  updateDoc: (id: number, updates: Partial<Document>) => void
  removeDoc: (id: number) => void
}

const initialState: DocsStore = {
  docs: []
}

export const useDocsStore = create<DocsStore & DocsActions>()(
  persist(
    (set) => ({
      // Data Store
      ...initialState,

      // Actions
      setDocs: (docs: Document[]) => set({ docs }),
      clearDocs: () => set({ docs: [] }),
      addDoc: (doc: Document) => set((state) => ({ docs: [...state.docs, doc] })),
      updateDoc: (id: number, updates: Partial<Document>) => set((state) => ({ docs: state.docs.map((doc) => (doc.id === id ? { ...doc, ...updates } : doc)) })),
      removeDoc: (id: number) => set((state) => ({ docs: state.docs.filter((doc) => doc.id !== id) }))
    }),
    {
      name: 'docs-storage'
    }
  )
)
