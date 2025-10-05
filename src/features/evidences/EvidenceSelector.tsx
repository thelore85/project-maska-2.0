import { useEffect } from 'react'
import EvidenceItem from './EvidenceItem'
import { useGetEvidenceDocuments } from './api/evidences.hooks'

type Props = {
  evidences: any
  title?: string
}

export default function EvidenceSelector({ evidences, title }: Props) {
  const { data: documents } = useGetEvidenceDocuments()

  useEffect(() => {
    if (documents) {
      console.log('Evidence documents response:', documents)
    }
  }, [documents])

  return (
    <>
      {evidences && evidences.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          {title && <h3 className="mb-4 text-base font-semibold text-gray-900">{title}</h3>}
          <div className="space-y-2">
            {evidences.map((evidence: any) => (
              <EvidenceItem key={evidence.link_id} evidence={evidence} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
