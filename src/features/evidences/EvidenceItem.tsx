type Props = {
  evidence: any
  isSelectable?: boolean
  isSelected?: boolean
  onToggle?: (id: number) => void
}

export default function EvidenceItem({ evidence, isSelectable = false, isSelected = false, onToggle }: Props) {
  return (
    <div key={evidence.link_id} className="rounded-lg border border-gray-100 bg-gray-50 p-2">
      <div className="flex items-center justify-between gap-2">
        {isSelectable && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle?.(evidence.link_id)}
            className="h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{evidence.document.original_filename}</p>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-600">
            <span>{(evidence.document.size_bytes / 1024).toFixed(2)} KB</span>
            <span>•</span>
            <span>Useful: {evidence.useful_in_last_run ? 'Yes' : 'No'}</span>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${evidence.useful_in_last_run ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {evidence.useful_in_last_run ? 'Useful' : 'Not useful'}
        </span>
      </div>
    </div>
  )
}
