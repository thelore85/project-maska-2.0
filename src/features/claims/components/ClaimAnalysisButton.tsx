import { Button } from '@/components/ui/button'

type Props = { claim: any }

export default function ClaimAnalysisButton({ claim }: Props) {
  const runStatus = claim?.last_run?.run_status

  const isDisabled = runStatus === 'running' || runStatus === 'submitted'

  const handleAnalysis = () => {
    console.log('Analizar afirmacion')
  }

  return (
    <>
      <Button variant="default" disabled={isDisabled} className="w-full" onClick={handleAnalysis}>
        {runStatus === 'running' ? 'Analizando...' : runStatus === 'submitted' ? 'Enviado...' : 'Analizar afirmacion'}
      </Button>
    </>
  )
}
