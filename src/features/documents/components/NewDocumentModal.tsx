import { useState } from 'react'
import { Modal } from '@/components/common/Modal'
import { DocumentForm } from '@/components/forms/DocumentForm'
import type { DocumentFormData } from '@/components/forms/DocumentForm'

type DocumentModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit?: (data: DocumentFormData) => void
}

export function NewDocumentModal({ open, onOpenChange, onSubmit }: DocumentModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (data: DocumentFormData) => {
        if (!onSubmit) return

        setIsLoading(true)
        try {
            await onSubmit(data)
            onOpenChange(false)
        } catch (error) {
            console.error('Error uploading documents:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        onOpenChange(false)
    }

    return (
        <Modal open={open} onOpenChange={onOpenChange} title="Upload New Documents">
            <DocumentForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
        </Modal>
    )
}
