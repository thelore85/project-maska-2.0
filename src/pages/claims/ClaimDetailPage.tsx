import SidebarLayout from '@/layouts/SidebarLayout'
import { useParams } from 'react-router-dom'
import type { TClaimCard } from '@/types/compTypes'
import { useEffect, useState } from 'react'
import EvidenceItem from '@/features/evidences/EvidenceItem'
import EvidenceList from '@/features/evidences/EvidenceList'
import ClaimDetails from '@/features/claims/components/ClaimDetails'
import LegalAnalysis from '@/features/claims/components/LegalAnalysis'
import ClaimAnalysisButton from '@/features/claims/components/ClaimAnalysisButton'
import ClaimStatusCard from '@/features/claims/components/ClaimStatusCard'

export default function ClaimDetailPage() {
  const { claimId } = useParams()
  const [claim, setClaim] = useState<TClaimCard | null>(null)

  useEffect(() => {
    // Retrieve claim from sessionStorage
    const storedClaim = sessionStorage.getItem('selectedClaim')
    if (storedClaim) {
      const parsedClaim = JSON.parse(storedClaim) as TClaimCard
      setClaim(parsedClaim)
      console.log(parsedClaim.fullClaimData)
    }
  }, [claimId])

  if (!claim) {
    return (
      <SidebarLayout>
        <div className="flex-1 overflow-auto py-10">
          <div className="mx-auto w-full max-w-[800px] text-center">
            <p className="text-gray-500">Cargando claim...</p>
          </div>
        </div>
      </SidebarLayout>
    )
  }

  return (
    <SidebarLayout>
      <div className="flex-1 overflow-auto py-10">
        <div className="mx-auto w-full max-w-[800px] space-y-6">
          {/* Status Card */}
          <ClaimStatusCard claim={claim} />

          {/* Detalles De la afirmacion */}
          <ClaimDetails claim={claim} />

          {/* Analisis Juridico */}
          <LegalAnalysis claim={claim} />

          {/* Boton de analisis */}
          <ClaimAnalysisButton claim={claim} />
        </div>
      </div>
    </SidebarLayout>
  )
}
