import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import { useCompanyStore } from '@/store/companyStore'
import { useDocsStore } from '@/store/docsStore'
import SidebarLayout from '@/layouts/SidebarLayout'
import DocumentsList from '@/features/documents/components/DocumentsList'

export default function AdminPage() {
    const { isAuthenticated, token } = useAuthStore()
    const { user } = useUserStore()
    const { company } = useCompanyStore()
    const { docs } = useDocsStore()

    return (
        <SidebarLayout>
            {/* Header */}

            {/* Content */}

            {/* Status Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="flex items-center">
                        <div className={`mr-3 h-3 w-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <h3 className="text-sm font-medium text-gray-500">Authentication</h3>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="flex items-center">
                        <div className={`mr-3 h-3 w-3 rounded-full ${user ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <h3 className="text-sm font-medium text-gray-500">User Data</h3>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">{user ? 'Loaded' : 'Not Loaded'}</p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="flex items-center">
                        <div className={`mr-3 h-3 w-3 rounded-full ${company ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <h3 className="text-sm font-medium text-gray-500">Company Data</h3>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">{company ? 'Loaded' : 'Not Loaded'}</p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="flex items-center">
                        <div className={`mr-3 h-3 w-3 rounded-full ${docs.length > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <h3 className="text-sm font-medium text-gray-500">Documents</h3>
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">{docs.length} docs</p>
                </div>
            </div>

            {/* Detailed Data */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Auth Store */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">Auth Store</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-500">Authenticated:</span>
                            <span className="text-sm text-gray-900">{isAuthenticated ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-500">Has Token:</span>
                            <span className="text-sm text-gray-900">{token ? 'Yes' : 'No'}</span>
                        </div>
                        {token && (
                            <div className="border-t pt-2">
                                <p className="mb-1 text-xs font-medium text-gray-500">Token (truncated):</p>
                                <p className="text-xs break-all text-gray-400">{token.substring(0, 50)}...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* User Store */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">User Store</h2>
                    {user ? (
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">ID:</span>
                                <span className="text-sm text-gray-900">{user.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">Name:</span>
                                <span className="text-sm text-gray-900">{user.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">Email:</span>
                                <span className="text-sm text-gray-900">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">Tenant ID:</span>
                                <span className="truncate text-sm text-gray-400">{user.tenant_id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">Created:</span>
                                <span className="text-sm text-gray-900">{new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No user data available</p>
                    )}
                </div>

                {/* Company Store */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">Company Store</h2>
                    {company ? (
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">ID:</span>
                                <span className="text-sm text-gray-900">{company.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">Name:</span>
                                <span className="text-sm text-gray-900">{company.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">CIF:</span>
                                <span className="text-sm text-gray-900">{company.cif}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">Sector:</span>
                                <span className="text-sm text-gray-900">{company.sector}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">Slug:</span>
                                <span className="text-sm text-gray-900">{company.slug}</span>
                            </div>
                            <div className="border-t pt-2">
                                <p className="mb-1 text-xs font-medium text-gray-500">Containers:</p>
                                <p className="text-xs text-gray-400">Docs: {company.container_docs}</p>
                                <p className="text-xs text-gray-400">Evidence: {company.container_evidence}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No company data available</p>
                    )}
                </div>

                <DocumentsList />
            </div>
        </SidebarLayout>
    )
}
