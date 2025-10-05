import { useMutation, useQuery } from '@tanstack/react-query'
import { createPresignUpload, uploadFileToAzure, completeUpload, getDocuments, documentAnalysis, getDocumentById } from './documents.api'
import type { PresignUploadRequest } from './documents.types'
import { useDocsStore } from '@/store/docsStore'
import type { Document } from '@/store/docsStore'
import { useEffect } from 'react'
import { useCompanyStore } from '@/store/companyStore'

export function usePresignUpload() {
  return useMutation({
    mutationFn: (data: PresignUploadRequest) => createPresignUpload(data),
    retry: false
  })
}

type DocumentUploadParams = {
  file: File
  metadata: PresignUploadRequest
}

export function useDocumentUpload() {
  const companyId = useCompanyStore((state) => state.company?.id)
  return useMutation({
    mutationKey: ['documents', 'upload'],
    mutationFn: async ({ file, metadata }: DocumentUploadParams) => {
      // Step 1: Get presigned URL
      console.log('Step 1: Getting presigned URL...')
      const presignResponse = await createPresignUpload(metadata)
      console.log('OK - Step 1 Success - Presign response:', presignResponse)

      // Step 2: Upload file to Azure Storage
      console.log(' Step 2: Uploading file to Azure...', file)
      await uploadFileToAzure(file, presignResponse.put_url, presignResponse.required_headers)
      console.log('OK Step 2 Success - File uploaded to Azure')

      // Step 3: Complete upload (inform server of successful upload)
      console.log('Step 3: Completing upload...', presignResponse.upload_id)
      if (!companyId) {
        throw new Error('Company ID is required')
      }
      const completeResponse = await completeUpload({
        company_id: companyId,
        upload_id: presignResponse.upload_id
      })
      console.log('OK - Step 3 Success - Complete response:', completeResponse)

      return {
        presign: presignResponse,
        complete: completeResponse
      }
    },
    retry: false
  })
}

export function useGetDocuments() {
  const setDocs = useDocsStore((state) => state.setDocs)

  const query = useQuery({
    queryKey: ['documents', 'get'],
    queryFn: () => getDocuments(),
    staleTime: 0, // Sempre considera i dati stale
    gcTime: 0, // Non cachare i dati
    refetchOnMount: 'always', // Sempre refetch on mount
    refetchOnWindowFocus: true, // Refetch quando la finestra torna in focus
    retry: false // Non riprovare se fallisce
  })

  // Aggiorna lo store quando i dati cambiano - usando useEffect
  useEffect(() => {
    if (query.data) {
      console.log('///////// Query response:', query.data)
      setDocs(query.data as unknown as Document[])
    }
  }, [query.data, query.dataUpdatedAt, setDocs]) // Aggiungi dataUpdatedAt come dependency

  return query
}

export function useDocumentAnalysis() {
  const updateDocs = useDocsStore((state) => state.updateDoc)
  const mutation = useMutation({
    mutationKey: ['documents', 'analysis'],
    mutationFn: (documentId: number) => documentAnalysis(documentId),
    retry: false
  })

  // Aggiorna lo store quando i dati cambiano - usando useEffect
  useEffect(() => {
    if (mutation.data) {
      console.log('🔍 Analysis response:', mutation.data)
      console.log('📄 Document ID to update:', mutation.data.document_id)

      if (mutation.data.resource.id) {
        updateDocs(mutation.data.resource.id, { analyzed: 2 })
        console.log('✅ Store updated: analyzed = 2 for doc ID:', mutation.data.document_id)
      } else {
        console.error('❌ No document_id in response:', mutation.data.resource.id)
      }
    }
  }, [mutation.data, updateDocs])

  return mutation
}

export function useGetDocumentById(documentId: number) {
  return useQuery({
    queryKey: ['documents', 'getById', documentId],
    queryFn: () => getDocumentById(documentId),
    enabled: !!documentId,
    retry: false
  })
}
