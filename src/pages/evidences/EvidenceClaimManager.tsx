import SidebarLayout from '@/layouts/SidebarLayout'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { TClaimCard } from '@/types/compTypes'
import EvidenceList from '@/features/evidences/EvidenceList'
import EvidenceSelector from '@/features/evidences/EvidenceSelector'
import NewDocumentMenuButton from '@/features/documents/components/NewDocumentsMenuButton'

export default function EvidenceClaimManager() {
  const { claimId } = useParams()
  const [claim, setClaim] = useState<TClaimCard | null>(null)

  useEffect(() => {
    // Retrieve claim from sessionStorage
    const storedClaim = sessionStorage.getItem('selectedClaim')
    if (storedClaim) {
      const parsedClaim = JSON.parse(storedClaim) as TClaimCard
      setClaim(parsedClaim)
    }
  }, [claimId])

  if (!claim) {
    return (
      <SidebarLayout title="Gestion de evidencias">
        <div className="flex-1 overflow-auto py-10">
          <div className="mx-auto w-full max-w-[800px] text-center">
            <p className="text-gray-500">Cargando claim...</p>
          </div>
        </div>
      </SidebarLayout>
    )
  }

  return (
    <>
      <SidebarLayout title="Gestion de evidencias">
        <div className="flex-1 overflow-auto py-10">
          <div className="mx-auto w-full max-w-[800px] space-y-6">
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <h2 className="mb-1 w-full text-2xl font-bold text-gray-900">Todas las evidencias</h2>
                <div className="w-full max-w-[200px]">
                  <NewDocumentMenuButton size="xs" />
                </div>
              </div>
              <EvidenceSelector evidences={claim.fullClaimData.evidences} />
            </div>

            <h2 className="mb-1 text-2xl font-bold text-gray-900">Evidencias en uso</h2>
            <EvidenceList evidences={claim.fullClaimData.evidences} />
            <span className="text-sm text-gray-500">This evidence has been positive for past analysis. Will be automatically added</span>
          </div>
        </div>
      </SidebarLayout>
    </>
  )
}
