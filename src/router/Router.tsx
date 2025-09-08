import { Routes, Route } from 'react-router-dom'
import NotFound from '@/pages/errors/NotFound'
import ArticlesPage from '@/pages/articles/ArticlesPage'
import AuthPage from '@/pages/auth/AuthPage'

// Simple route guards

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
