import { useEffect, useState } from 'react'
import EvidenceItem from './EvidenceItem'
import { useGetEvidenceDocuments } from './api/evidences.hooks'
import Button from '@/components/cta/Button'

type Props = {
  evidences: any
  title?: string
}

export default function EvidenceSelector({ evidences, title }: Props) {
  const { data: documents } = useGetEvidenceDocuments()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  useEffect(() => {
    if (documents) {
      console.log('Evidence documents response:', documents)
    }
  }, [documents])

  const handleToggle = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]))
  }

  const handleSelect = () => {
    console.log('Selected evidence IDs:', selectedIds)
  }

  return (
    <>
      {evidences && evidences.length > 0 && (
        <>
          <div className="mb-1 rounded-lg border border-gray-200 bg-white p-4">
            {title && <h3 className="mb-4 text-base font-semibold text-gray-900">{title}</h3>}
            {evidences.map((evidence: any) => (
              <EvidenceItem key={evidence.link_id} evidence={evidence} isSelectable isSelected={selectedIds.includes(evidence.link_id)} onToggle={handleToggle} />
            ))}
          </div>
          <Button variant="primary" onClick={handleSelect} disabled={selectedIds.length === 0} className="mt-4">
            Select ({selectedIds.length})
          </Button>
        </>
      )}
    </>
  )
}
