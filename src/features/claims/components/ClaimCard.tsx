import type { TClaimCard } from '@/types/compTypes'
import { useNavigate } from 'react-router-dom'

type ClaimCardProps = {
  card: TClaimCard
  setSelectedClaim: (card: TClaimCard) => void
}

export default function ClaimCard({ card, setSelectedClaim }: ClaimCardProps) {
  const status = card.legal_reasoning.overall.color
  const claimCategory = card.categories
  const navigate = useNavigate()

  const handleClick = () => {
    // Store claim in sessionStorage for the detail page
    sessionStorage.setItem('selectedClaim', JSON.stringify(card))
    // Navigate to claim detail page
    navigate(`/claim/${card.claim_id}`)
  }

  return (
    <div className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50" onClick={handleClick}>
      <div className="flex items-center gap-4">
        {/* Status indicator */}
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full ${status === 'Rojo' ? 'bg-red-500' : status === 'Naranja' ? 'bg-orange-500' : status === 'Verde' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="mb-2 text-base font-semibold text-gray-900 leading-snug">
            {card.claim?.slice(0, 100)} {card.claim.length > 100 && '...'}
          </h1>
          <div className="flex flex-wrap gap-1">
            {claimCategory?.map((category) => (
              <span key={category} className="text-xs text-gray-500">
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
