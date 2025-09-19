import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CompanyForm } from '@/components/forms/CompanyForm'
import { useCreateCompany } from '../api'
import { useCompanyStore } from '@/store/companyStore'

type CompanyData = {
    name: string
    cif: string
    sector: string
}

type CompanyModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CompanyModal({ open, onOpenChange }: CompanyModalProps) {
    const { createCompany: addToStore } = useCompanyStore()
    const { mutate: createCompany, isPending, error } = useCreateCompany()

    const handleSubmit = (data: CompanyData) => {
        createCompany(data, {
            onSuccess: (newCompany) => {
                addToStore(newCompany)
                onOpenChange(false)
            },
            onError: (error) => {
                console.error('Error during company creation:', error)
            }
        })
    }

    const handleCancel = () => {
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>New Company</DialogTitle>
                </DialogHeader>
                {error && <div className="rounded bg-red-50 p-2 text-sm text-red-500">Errore: {error.message}</div>}
                <CompanyForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isPending} />
            </DialogContent>
        </Dialog>
    )
}
