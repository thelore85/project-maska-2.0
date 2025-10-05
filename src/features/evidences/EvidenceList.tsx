import EvidenceItem from './EvidenceItem'

type Props = {
  claim: any
}

export default function EvidenceList({ claim }: Props) {
  return (
    <>
      {claim.fullClaimData?.evidences && claim.fullClaimData.evidences.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-4 text-base font-semibold text-gray-900">Evidences ({claim.fullClaimData.evidences.length})</h3>
          <div className="space-y-2">
            {claim.fullClaimData.evidences.map((evidence: any) => (
              <EvidenceItem key={evidence.link_id} evidence={evidence} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
