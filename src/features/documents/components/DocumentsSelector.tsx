import Button from '@/components/cta/Button'
import { useDocsStore } from '@/store/docsStore'
import { useGetDocuments } from '../api/documents.hooks'

export default function DocumentsSelector() {
  const { docs } = useDocsStore()
  const { isLoading, refetch: refetchDocsData } = useGetDocuments()

  const handlerAnalyze = (status: number, id: number) => {
    const docSelected = docs.filter((doc) => doc.id === id)[0]
    if (status === 0) console.log('Document not analyzed', docSelected)
    if (status === 1) console.log('Document analyzed', docSelected)
    if (status === 2) console.log('Document Pending', docSelected)
  }

  const handlerUpdate = () => {
    refetchDocsData()
    console.log('Refreshing documents...')
  }

  const analyzedStyle = 'bg-green-100 text-green-800'
  const pendingStyle = 'bg-yellow-100 text-yellow-800'
  const notAnalyzedStyle = 'bg-red-100 text-red-800'

  return (
    <>
      {/* Docs Store */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
        {docs && docs.length > 0 ? (
          <div className="space-y-4 overflow-y-auto p-1">
            {docs?.map((doc) => (
              <div key={doc.id} className="cursor-pointer rounded border border-gray-100 bg-white p-3 hover:bg-gray-50 hover:shadow-sm" onClick={() => handlerAnalyze(doc.analyzed, doc.id)}>
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-md font-medium text-gray-900">{doc.original_filename}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${doc.analyzed === 0 ? notAnalyzedStyle : doc.analyzed === 1 ? analyzedStyle : pendingStyle}`}
                    onClick={() => handlerAnalyze(doc.analyzed, doc.id)}
                  >
                    {/* onClick={() => handlerAnalyze(doc.analyzed)} */}
                    {doc.analyzed === 0 ? 'Not Analyzed' : doc.analyzed === 1 ? 'Analyzed' : doc.analyzed === 2 ? 'Pending' : 'Unknown'}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>
                    Size: {(doc.size_bytes / 1024).toFixed(1)} KB; Type: {doc.content_type}
                  </div>
                  <div>Created: {new Date(doc.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No documents available</p>
        )}
      </div>

      <Button variant="tertiary" onClick={handlerUpdate} className="cursor-pointer" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Actualizar'}
      </Button>
    </>
  )
}
