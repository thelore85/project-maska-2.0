import { Routes, Route } from 'react-router-dom'
import NotFound from '@/pages/errors/NotFound'
import ArticlesPage from '@/pages/articles/ArticlesPage'
import AuthPage from '@/pages/auth/AuthPage'
// import { useAuthStore } from '@/store/authStore'

export default function Router() {
    return (
        <Routes>
            {/* Public route(s) */}
            <Route>
                <Route path="/auth" element={<AuthPage />} />
            </Route>

            {/* Protected route(s) */}
            <Route>
                <Route path="/" element={<ArticlesPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
