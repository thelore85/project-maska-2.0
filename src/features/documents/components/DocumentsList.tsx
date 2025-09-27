import { useDocsStore } from '@/store/docsStore'

export default function DocumentsList() {
    const { docs } = useDocsStore()
    return (
        <>
            {/* Docs Store */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Documents Store ({docs.length})</h2>
                {docs.length > 0 ? (
                    <div className="space-y-4 overflow-y-auto">
                        {docs.map((doc) => (
                            <div key={doc.id} className="rounded border border-gray-100 p-3">
                                <div className="mb-2 flex items-start justify-between">
                                    <span className="text-sm font-medium text-gray-900">{doc.original_filename}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            doc.status === 'ready' ? 'bg-green-100 text-green-800' : doc.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {doc.status}
                                    </span>
                                </div>
                                <div className="space-y-1 text-xs text-gray-500">
                                    <div>
                                        ID: {doc.id} | Kind: {doc.kind}
                                    </div>
                                    <div>Size: {(doc.size_bytes / 1024).toFixed(1)} KB</div>
                                    <div>Type: {doc.content_type}</div>
                                    <div>Created: {new Date(doc.created_at).toLocaleDateString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No documents available</p>
                )}
            </div>
        </>
    )
}
