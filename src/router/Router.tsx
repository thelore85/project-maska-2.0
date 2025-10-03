import { Routes, Route } from 'react-router-dom'
import NotFound from '@/pages/errors/NotFound'
import SingleDocumentPage from '@/pages/documents/SingleDocumentPage'
import AuthPage from '@/pages/auth/AuthPage'
import LoginPage from '@/pages/auth/LoginPage'
import AdminPage from '@/pages/admin/AdminPage'
import AuthGuard from '@/components/auth/AuthGuard'
import DocumentsPage from '@/pages/documents/DocumentsPage'
import ClaimDetailPage from '@/pages/claims/ClaimDetailPage'

export default function Router() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <AuthGuard requireAuth={false}>
            <LoginPage />
          </AuthGuard>
        }
      />
      <Route
        path="/auth"
        element={
          <AuthGuard requireAuth={false}>
            <AuthPage />
          </AuthGuard>
        }
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <AuthGuard requireAuth={true}>
            <AdminPage />
          </AuthGuard>
        }
      />
      <Route
        path="/admin"
        element={
          <AuthGuard requireAuth={true}>
            <AdminPage />
          </AuthGuard>
        }
      />
      <Route
        path="/documents/:id"
        element={
          <AuthGuard requireAuth={true}>
            <SingleDocumentPage />
          </AuthGuard>
        }
      />
      <Route
        path="/documents"
        element={
          <AuthGuard requireAuth={true}>
            <DocumentsPage />
          </AuthGuard>
        }
      />
      <Route
        path="/claim/:claimId"
        element={
          <AuthGuard requireAuth={true}>
            <ClaimDetailPage />
          </AuthGuard>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
