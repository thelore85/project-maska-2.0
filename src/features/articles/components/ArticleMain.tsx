import type { TClaimCard } from '@/types/compTypes'
import ClaimCard from '@/features/claims/components/ClaimCard'
import { useState } from 'react'
import ClaimDetailsModal from '@/features/claims/components/ClaimDetailsModal'
import ArticleRiskCard from './ArticleRiskCard'
import { CLAIM_CARD_DB } from '@/lib/db'

export default function ArticleMain() {
  // state
  const [selectedClaim, setSelectedClaim] = useState<null | TClaimCard>(null)
  const [low, setLow] = useState(0)
  const [middle, setMiddle] = useState(0)
  const [high, setHigh] = useState(0)

  const articleList = CLAIM_CARD_DB
  // Moke articles
  const article = articleList[0]
  return (
    <>
      <div className="flex-1 overflow-auto py-10">
        {/* Article metatada  */}
        <h2 className="mx-auto mb-3 w-full max-w-[800px] text-3xl font-bold">{article?.title}</h2>
        <div className="bg-card mx-auto mb-10 w-full max-w-[800px] rounded-2xl p-4 text-sm shadow-md transition-transform">
          <div className="mb-4">
            <h3 className="mb-2 border-b-1 border-gray-200 text-lg font-bold">Resumen</h3>
            <p>{article?.text_summary}</p>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 border-b-1 border-gray-200 text-lg font-bold">Url</h3>
            <a href={article?.url} target="_blank" className="hover:text-primary text-gray-300 italic">
              {article?.url}
            </a>
          </div>
        </div>

        <ArticleRiskCard high={high} middle={middle} low={low} />

        {/* Article claims  */}
        <div className="bg-card mx-auto mb-10 w-full max-w-[800px] cursor-pointer rounded-2xl p-4 text-sm shadow-md transition-transform">
          <h3 className="mb-6 border-b-1 border-gray-200 text-lg font-bold">Listado de afirmaciones</h3>
          {article?.claims.map((claim) => <ClaimCard key={claim.claim_id} card={claim} setSelectedClaim={setSelectedClaim} />)}
        </div>
      </div>

      {/* Modal */}
      <ClaimDetailsModal card={selectedClaim} isOpen={selectedClaim ? true : false} setIsOpen={setSelectedClaim} />
    </>
  )
}
