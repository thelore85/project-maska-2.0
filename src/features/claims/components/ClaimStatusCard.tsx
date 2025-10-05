import type { TClaimCard } from '@/types/compTypes'

type ClaimStatusCardProps = {
  claim: TClaimCard
}

export default function ClaimStatusCard({ claim }: ClaimStatusCardProps) {
  const runStatus = claim.fullClaimData?.last_run?.run_status

  if (!runStatus || (runStatus !== 'running' && runStatus !== 'submitted' && runStatus !== 'failed')) {
    return null
  }

  const getMessage = () => {
    if (runStatus === 'running' || runStatus === 'submitted') {
      return 'Analysis is running'
    }
    if (runStatus === 'failed') {
      return "Analisi didn't succeeded, try again"
    }
    return ''
  }

  const getStyles = () => {
    if (runStatus === 'running' || runStatus === 'submitted') {
      return 'border-blue-200 bg-blue-50 text-blue-800'
    }
    if (runStatus === 'failed') {
      return 'border-red-200 bg-red-50 text-red-800'
    }
    return ''
  }

  return (
    <div className={`rounded-lg border p-4 ${getStyles()}`}>
      <p className="text-sm font-medium">{getMessage()}</p>
    </div>
  )
}
