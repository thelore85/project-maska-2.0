type Props = {
  evidence: any
}

export default function EvidenceItem({ evidence }: Props) {
  return (
    <div key={evidence.link_id} className="rounded-lg border border-gray-100 bg-gray-50 p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{evidence.document.original_filename}</p>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-600">
            <span>{(evidence.document.size_bytes / 1024).toFixed(2)} KB</span>
            <span>•</span>
            <span>Useful: {evidence.useful_in_last_run ? 'Yes' : 'No'}</span>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${evidence.status === 'selected' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {evidence.status}
        </span>
      </div>
    </div>
  )
}
