import { useState } from 'react'
import Button from '@/components/cta/Button'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useCompanyStore } from '@/store/companyStore'
import { NewDocumentModal } from './NewDocumentModal'
import type { DocumentFormData } from '@/components/forms/DocumentForm'

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function NewDocumentMenuButton({ size = 'sm' }: Props) {
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
      <Button variant="primary" disabled={false} onClick={handleButtonClick} size={size}>
        <FontAwesomeIcon icon={faPlusCircle} className="mr-4" />
        <span>New Document</span>
      </Button>

      <NewDocumentModal open={isModalOpen} onOpenChange={setIsModalOpen} onSubmit={handleSubmit} />
    </>
  )
}
