import { useState } from 'react'
import Button from '@/components/cta/Button'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CompanyModal } from './CompanyModal'

export default function ComanyMenuButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                <FontAwesomeIcon icon={faPlusCircle} className="mr-4" />
                <h1>New Company</h1>
            </Button>

            <CompanyModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </>
    )
}
