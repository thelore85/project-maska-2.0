import { useQuery } from '@tanstack/react-query'
import { getEvidenceDocuments } from '@/features/documents/api/documents.api'

export function useGetEvidenceDocuments() {
  return useQuery({
    queryKey: ['evidences', 'documents'],
    queryFn: () => getEvidenceDocuments(),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    retry: false
  })
}
