import type { TClaimCard } from '@/types/compTypes'
import ClaimCard from '@/features/claims/components/ClaimCard'
import { useState, useEffect } from 'react'
import ClaimDetailsModal from '@/features/claims/components/ClaimDetailsModal'
import ArticleRiskCard from './ArticleRiskCard'
import type { DocumentByIdResponse, Claim } from '@/features/documents/api/documents.types'

type DocumentDetailsProps = {
  document?: DocumentByIdResponse
}

export default function DocumentDetails({ document }: DocumentDetailsProps) {
  // state
  const [selectedClaim, setSelectedClaim] = useState<null | TClaimCard>(null)
  const [low, setLow] = useState(0)
  const [middle, setMiddle] = useState(0)
  const [high, setHigh] = useState(0)

  // Calculate risk levels based on traffic_light from last_run
  useEffect(() => {
    if (document?.claims) {
      let redCount = 0
      let orangeCount = 0
      let greenCount = 0

      document.claims.forEach((claim) => {
        const trafficLight = claim.last_run?.traffic_light
        if (trafficLight === 'red') redCount++
        else if (trafficLight === 'orange') orangeCount++
        else if (trafficLight === 'green') greenCount++
      })

      setHigh(redCount)
      setMiddle(orangeCount)
      setLow(greenCount)
    }
  }, [document?.claims])

  // Transform API claim to TClaimCard format

  const transformClaim = (claim: Claim): TClaimCard => ({
    claim_id: claim.id,
    claim: claim.claim,
    categories: [claim.category],
    relevant_laws: claim.risk,
    evidence_needed: claim.evidence_needed.join('\n'),
    analysis: {
      existence: { result: '', explanation: claim.explanation },
      sufficiency: { result: '', explanation: '' },
      actuality: { result: '', explanation: '' },
      independence: { result: '', explanation: '' }
    },
    legal_reasoning: {
      norma_infringida: claim.risk,
      razonamiento: claim.explanation,
      consecuencia: claim.last_run?.revised_claim || '',
      overall: {
        color: claim.last_run?.traffic_light === 'red' ? 'Rojo' : claim.last_run?.traffic_light === 'orange' ? 'Naranja' : claim.last_run?.traffic_light === 'green' ? 'Verde' : 'Gris',
        recommendation: claim.last_run?.explanation || ''
      }
    },
    fullClaimData: claim
  })

  if (!document) {
    return (
      <div className="flex-1 overflow-auto py-10">
        <div className="mx-auto w-full max-w-[800px] text-center">
          <p className="text-gray-500">Cargando documento...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 overflow-auto py-10">
        {/* Document metadata  */}
        <h2 className="mx-auto mb-3 w-full max-w-[800px] text-3xl font-bold">{document.document.title || document.document.original_filename}</h2>
        <div className="mx-auto mb-8 w-full max-w-[800px] rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Información del documento</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Nombre del archivo:</span> {document.document.original_filename}
              </p>
              <p>
                <span className="font-medium">Estado:</span> {document.document.status}
              </p>
              <p>
                <span className="font-medium">Tipo:</span> {document.document.content_type}
              </p>
              <p>
                <span className="font-medium">Tamaño:</span> {(document.document.size_bytes / 1024).toFixed(2)} KB
              </p>
              <p>
                <span className="font-medium">Fecha de creación:</span> {new Date(document.document.created_at).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Resumen del análisis</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-medium">Total de afirmaciones:</span> {document.aggregates.claims_count}
              </p>
              <p>
                <span className="font-medium">Análisis pendientes:</span> {document.aggregates.runs_missing_count}
              </p>
              <p>
                <span className="font-medium">Evidencias adjuntas:</span> {document.aggregates.evidences_count}
              </p>
            </div>
          </div>
        </div>

        <ArticleRiskCard high={high} middle={middle} low={low} />

        {/* Claims list */}
        <div className="mx-auto mb-8 w-full max-w-[800px] rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">Listado de afirmaciones</h3>
          <div className="space-y-4">
            {document.claims.length > 0 ? (
              document.claims.map((claim) => {
                const transformedClaim = transformClaim(claim)
                return <ClaimCard key={claim.id} card={transformedClaim} setSelectedClaim={setSelectedClaim} />
              })
            ) : (
              <p className="text-center text-gray-500">No hay afirmaciones disponibles</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ClaimDetailsModal card={selectedClaim} isOpen={selectedClaim ? true : false} setIsOpen={setSelectedClaim} />
    </>
  )
}
