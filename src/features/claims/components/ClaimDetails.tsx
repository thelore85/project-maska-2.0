type Props = {
  claim: any
}

export default function ClaimDetails({ claim }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="space-y-4">
        <div>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-lg font-bold text-gray-700">{claim.fullClaimData?.claim}</p>
          </div>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Category:</span>
          <p className="mt-1 text-sm text-gray-700">{claim.fullClaimData?.category}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Explanation:</span>
          <p className="mt-1 text-sm text-gray-700">{claim.fullClaimData?.explanation}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Risk:</span>
          <p className="mt-1 text-sm text-gray-700">{claim.fullClaimData?.risk}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Evidence Needed:</span>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-700">{claim.fullClaimData?.evidence_needed?.map((evidence: any, index: any) => <li key={index}>{evidence}</li>)}</ul>
        </div>
      </div>
    </div>
  )
}
