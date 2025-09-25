import { Routes, Route } from 'react-router-dom'
import NotFound from '@/pages/errors/NotFound'
import ArticlesPage from '@/pages/articles/ArticlesPage'
import AuthPage from '@/pages/auth/AuthPage'
import LoginPage from '@/pages/auth/LoginPage'
import AdminPage from '@/pages/admin/AdminPage'
import AuthGuard from '@/components/auth/AuthGuard'

export default function Router() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={
                <AuthGuard requireAuth={false}>
                    <LoginPage />
                </AuthGuard>
            } />
            <Route path="/auth" element={
                <AuthGuard requireAuth={false}>
                    <AuthPage />
                </AuthGuard>
            } />

            {/* Protected routes */}
            <Route path="/" element={
                <AuthGuard requireAuth={true}>
                    <AdminPage />
                </AuthGuard>
            } />
            <Route path="/admin" element={
                <AuthGuard requireAuth={true}>
                    <AdminPage />
                </AuthGuard>
            } />
            <Route path="/articles" element={
                <AuthGuard requireAuth={true}>
                    <ArticlesPage />
                </AuthGuard>
            } />

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
