import { Modal } from '../../../components/common/Modal'
import type { TClaimCard } from '@/types/compTypes'

type ClaimDetailsProps = {
  card: TClaimCard | null
  isOpen: boolean
  setIsOpen: (data: null) => void
}

export default function ClaimDetailsModal({ card, isOpen, setIsOpen }: ClaimDetailsProps) {
  return (
    <Modal open={isOpen} onOpenChange={() => setIsOpen(null)} title="Dettagli Claim">
      <div className="space-y-6">
        {/* Claim Title with Status */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 flex items-start gap-3">
            <div className={`mt-1 h-3 w-3 rounded-full ${card?.legal_reasoning.overall.color === 'Rojo' ? 'bg-red-500' : card?.legal_reasoning.overall.color === 'Naranja' ? 'bg-orange-500' : card?.legal_reasoning.overall.color === 'Verde' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">{card?.claim}</h2>
          </div>
        </div>

        {/* Basic Information */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-4 text-base font-semibold text-gray-900">Informazioni Generali</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Categories:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {card?.categories.map((category) => (
                  <span key={category} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Relevant Laws:</span>
              <p className="mt-1 text-sm text-gray-700">{card?.relevant_laws}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Evidence Needed:</span>
              <p className="mt-1 text-sm text-gray-700">{card?.evidence_needed}</p>
            </div>
          </div>
        </div>

        {/* Legal Reasoning */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-4 text-base font-semibold text-gray-900">Ragionamento Legale</h3>
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Norma Infringida:</span>
              <p className="mt-1 text-sm text-gray-700">{card?.legal_reasoning.norma_infringida || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Razonamiento:</span>
              <p className="mt-1 text-sm text-gray-700">{card?.legal_reasoning.razonamiento}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Consecuencia:</span>
              <p className="mt-1 text-sm text-gray-700">{card?.legal_reasoning.consecuencia}</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3">
              <span className="text-sm font-medium text-blue-900">Recommendation:</span>
              <p className="mt-1 text-sm text-blue-800">{card?.legal_reasoning.overall.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
