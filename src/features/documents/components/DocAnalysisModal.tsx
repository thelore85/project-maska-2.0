import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDocumentAnalysis } from '../api/documents.hooks'
import { useEffect, useState } from 'react'

type DocAnalysisModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  documentId?: number
}

export default function DocAnalysisModal({ open, onOpenChange, documentId }: DocAnalysisModalProps) {
  const { mutate: documentAnalysis, data, isSuccess, error, isPending, reset } = useDocumentAnalysis()
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [analysisSuccess, setAnalysisSuccess] = useState<string | null>(null)

  const handleStartAnalysis = () => {
    console.log('Iniciando análisis del documento seleccionado, ID:', documentId)
    if (!documentId) return
    documentAnalysis(documentId)
  }

  // 3. Gestire la risposta con useEffect
  useEffect(() => {
    if (isSuccess && data) {
      setAnalysisSuccess(data.message)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (error) {
      setAnalysisError(error.message)
    }
  }, [error])

  // Reset states quando il modal si chiude
  useEffect(() => {
    if (!open) {
      setAnalysisError(null)
      setAnalysisSuccess(null)
      reset() // Reset mutation state
    }
  }, [open, reset])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[750px]">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="mb-6 text-center">Análisis de Documento</DialogTitle>
          <DialogDescription className="flex flex-wrap justify-center gap-4">
            <span className="mb-6 text-center">
              Empieza el analisis del documento. <br />
              Clickando el boton 'Start Analysis', el agente AI analizara el documento y te devolvera un informe.
            </span>
            {analysisSuccess && <span className="mb-4 text-green-700">{analysisSuccess}</span>}
            {analysisError && <span className="mb-4 text-red-900">{analysisError}</span>}
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleStartAnalysis} disabled={isPending}>
              {isPending ? 'Analyzing...' : 'Start Analysis'}
            </Button>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
