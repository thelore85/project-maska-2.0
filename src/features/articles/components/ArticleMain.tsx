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
        <div className="mx-auto mb-8 w-full max-w-[800px] rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Resumen</h3>
            <p className="text-sm leading-relaxed text-gray-700">{article?.text_summary}</p>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Url</h3>
            <a href={article?.url} target="_blank" className="text-sm break-all text-blue-600 underline hover:text-blue-800">
              {article?.url}
            </a>
          </div>
        </div>

        <ArticleRiskCard high={high} middle={middle} low={low} />

        {/* Article claims  */}
        <div className="mx-auto mb-8 w-full max-w-[800px] rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">Listado de afirmaciones</h3>
          <div className="space-y-4">
            {article?.claims.map((claim) => {
              return <ClaimCard key={claim.claim_id} card={claim} setSelectedClaim={setSelectedClaim} />
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ClaimDetailsModal card={selectedClaim} isOpen={selectedClaim ? true : false} setIsOpen={setSelectedClaim} />
    </>
  )
}
