import { useState } from 'react'
import Button from '@/components/cta/Button'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useCompanyStore } from '@/store/companyStore'
import { DocumentModal } from './DocumentModal'
import type { DocumentFormData } from '@/components/forms/DocumentForm'

export default function DocumentsMenuButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    // const { companies } = useCompanyStore()  // add to button on desable prop to control display

    const handleSubmit = async (data: DocumentFormData) => {
        // TODO: Implement document upload API call
        console.log('Document data to upload:', data)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const handleButtonClick = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <Button variant="primary" disabled={false} onClick={handleButtonClick}>
                <FontAwesomeIcon icon={faPlusCircle} className="mr-4" />
                <h1>New Document</h1>
            </Button>

            <DocumentModal open={isModalOpen} onOpenChange={setIsModalOpen} onSubmit={handleSubmit} />
        </>
    )
}
