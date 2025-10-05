import type { TClaimCard } from '@/types/compTypes'

type LegalAnalysisProps = {
  claim: TClaimCard
}

export default function LegalAnalysis({ claim }: LegalAnalysisProps) {
  if (!claim.fullClaimData?.last_run) {
    return null
  }

  const lastRun = claim.fullClaimData.last_run

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="mb-4 text-base font-semibold text-gray-900">Analisis Juridico</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Nivel de Riesgo:</span>
          <div className="mt-1 flex items-center gap-2">
            <div
              className={`h-3 w-3 rounded-full ${lastRun.traffic_light === 'red' ? 'bg-red-500' : lastRun.traffic_light === 'orange' ? 'bg-orange-500' : lastRun.traffic_light === 'green' ? 'bg-green-500' : 'bg-gray-300'}`}
            ></div>
          </div>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Explanation:</span>
          <p className="mt-1 text-sm text-gray-700">{lastRun.explanation}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500">Revised Claim:</span>
          <p className="mt-1 text-sm text-gray-700">{lastRun.revised_claim}</p>
        </div>
        {lastRun.gaps && lastRun.gaps.length > 0 && (
          <div>
            <span className="text-sm font-medium text-gray-500">Gaps:</span>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-700">
              {lastRun.gaps.map((gap: any, index: any) => (
                <li key={index}>{gap}</li>
              ))}
            </ul>
          </div>
        )}
        {lastRun.supporting_snippets && lastRun.supporting_snippets.length > 0 && (
          <div>
            <span className="text-sm font-medium text-gray-500">Supporting Snippets:</span>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-700">
              {lastRun.supporting_snippets.map((snippet: any, index: any) => (
                <li key={index}>{snippet}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
