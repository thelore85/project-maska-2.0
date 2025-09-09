import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import NotFound from '@/pages/errors/NotFound'
import ArticlesPage from '@/pages/articles/ArticlesPage'
import AuthPage from '@/pages/auth/AuthPage'
import { useAuthStore } from '@/store/authStore'

// Route guard components
function RequireAuth() {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/auth" replace />
  return <Outlet />
}

function RedirectIfAuthenticated() {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />
  return <Outlet />
}

export default function Router() {
  return (
    <Routes>
      {/* Public route(s) */}
      <Route element={<RedirectIfAuthenticated />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      {/* Protected route(s) */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<ArticlesPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
