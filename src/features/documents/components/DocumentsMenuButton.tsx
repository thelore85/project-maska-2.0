import Button from '@/components/cta/Button'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCompanyStore } from '@/store/companyStore'
import { useEffect } from 'react'

export default function DocumentsMenuButton() {
    const { companies } = useCompanyStore()

    useEffect(() => {
        console.log('//////////////', companies)
    }, [companies])

    return (
        <>
            <Button variant="primary" disabled={companies.length === 0}>
                <FontAwesomeIcon icon={faPlusCircle} className="mr-4" />
                <h1>New Docuddment</h1>
            </Button>
        </>
    )
}
