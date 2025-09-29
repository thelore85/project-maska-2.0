import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

type ArticleRiskCardProps = {
  high: number
  middle: number
  low: number
}

export default function ArticleRiskCard({ high, middle, low }: ArticleRiskCardProps) {
  return (
    <>
      <h2 className="mx-auto mb-3 w-full max-w-[800px] text-3xl font-bold">Analisis de afirmaciones</h2>
      <div className="mx-auto mb-8 w-full max-w-[800px] rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">Nivel de riesgo de la afirmacione del articulo</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Risk Alert */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center mb-3">
              <div className="mr-3 h-3 w-3 rounded-full bg-red-500"></div>
              <h3 className="text-sm font-medium text-gray-500">Alert</h3>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900">{high}</p>
              <p className="text-xs text-gray-500 mt-1">Articles with high risk</p>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center mb-3">
              <div className="mr-3 h-3 w-3 rounded-full bg-orange-500"></div>
              <h3 className="text-sm font-medium text-gray-500">Warning</h3>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900">{middle}</p>
              <p className="text-xs text-gray-500 mt-1">Articles need attention</p>
            </div>
          </div>

          {/* Risk OK */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center mb-3">
              <div className="mr-3 h-3 w-3 rounded-full bg-green-500"></div>
              <h3 className="text-sm font-medium text-gray-500">Certified</h3>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-900">{low}</p>
              <p className="text-xs text-gray-500 mt-1">Articles are OK</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
