import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

type Props = { claim: any }

export default function ClaimAnalysisButton({ claim }: Props) {
  const navigate = useNavigate()
  const runStatus = claim?.last_run?.run_status

  const isDisabled = runStatus === 'running' || runStatus === 'submitted'

  const handleAnalysis = () => {
    if (!isDisabled && claim?.claim_id) {
      navigate(`/claim-evidence/${claim.claim_id}`)
    }
  }

  return (
    <>
      <Button variant="default" disabled={isDisabled} className="w-full" onClick={handleAnalysis}>
        {runStatus === 'running' ? 'Analizando...' : runStatus === 'submitted' ? 'Enviado...' : 'Analizar afirmacion'}
      </Button>
    </>
  )
}
