import SidebarLayout from '@/layouts/SidebarLayout'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { TClaimCard } from '@/types/compTypes'
import EvidenceList from '@/features/evidences/EvidenceList'

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
            <EvidenceList claim={claim} title="Evidencias en uso" />
            <span className="text-sm text-gray-500">This evidence has been positive for past analysis. Will be automatically added</span>
          </div>
        </div>
      </SidebarLayout>
    </>
  )
}
