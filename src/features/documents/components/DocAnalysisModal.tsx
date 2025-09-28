import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DocAnalysisModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  documentId?: number
}

export default function DocAnalysisModal({ open, onOpenChange, documentId }: DocAnalysisModalProps) {
  const handleStartAnalysis = () => {
    console.log('Iniciando análisis del documento seleccionado, ID:', documentId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Análisis de Documento</DialogTitle>
          <DialogDescription>Inicia el análisis de inteligencia artificial del documento seleccionado</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleStartAnalysis}>Iniciar Análisis</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
