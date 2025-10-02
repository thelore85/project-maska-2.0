import { getAccessToken } from '@/features/auth/utils/msalClient'
import type { PresignUploadRequest, PresignUploadResponse, CompleteUploadRequest, CompleteUploadResponse, DocumentByIdResponse } from './documents.types'

const API_BASE = import.meta.env.VITE_API_BASE

export async function createPresignUpload(data: PresignUploadRequest): Promise<PresignUploadResponse> {
  try {
    const token = await getAccessToken()
    const response = await fetch(`${API_BASE}/uploads/presign`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    return result as PresignUploadResponse
  } catch (error) {
    console.error('Error creating presign upload:', error)
    throw error
  }
}

export async function uploadFileToAzure(file: File, putUrl: string, requiredHeaders: Record<string, string>): Promise<void> {
  try {
    console.log('////////////////////// api call: Uploading file to Azure')
    console.log('file', file)
    console.log('putUrl', putUrl)
    console.log('requiredHeaders', requiredHeaders)

    const response = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        ...requiredHeaders
      },

      body: file
    })

    if (!response.ok) {
      const message = await response.json()
      throw new Error(`///// Azure upload failed: ${response.status} ${message.error}`)
    }

    console.log('File uploaded to Azure successfully')
  } catch (error) {
    console.error('////// Error uploading file to Azure:', error)
    throw error
  }
}

export async function completeUpload(data: CompleteUploadRequest): Promise<CompleteUploadResponse> {
  try {
    const token = await getAccessToken()
    const response = await fetch(`${API_BASE}/uploads/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const message = await response.json()
      throw new Error(`API error: ${response.status} ${message.error}`)
    }

    const result = await response.json()
    return result as CompleteUploadResponse
  } catch (error) {
    console.error('Error completing upload:', error)
    throw error
  }
}

export async function getDocuments() {
  try {
    const token = await getAccessToken()
    const response = await fetch(`${API_BASE}/documents/ready`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`API documents.getDocuments() error: ${response.status} -  ${response.statusText}`)
    }

    const result = await response.json()
    return result.docs as Document[]
  } catch (error) {
    console.error('Error getting documents:', error)
    throw error
  }
}

export async function documentAnalysis(documentId: number) {
  try {
    const token = await getAccessToken()
    const response = await fetch(`${API_BASE}/prefect/run_greenwashing_document_async`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        resource_type: 'document',
        resource_id: documentId,
        prob_threshold: 0.5
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`API error: ${response.status} ${error.message}`)
    }

    const result = await response.json()
    console.log('/////////////// analysis result', result)
    return result
  } catch (error) {
    console.error('Error during documentsAnalysis() api call:', error)
    throw error
  }
}

export async function getDocumentById(documentId: number): Promise<DocumentByIdResponse> {
  try {
    const token = await getAccessToken()
    const response = await fetch(`${API_BASE}/documents/documents/${documentId}/view`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    return result as DocumentByIdResponse
  } catch (error) {
    console.error('Error getting document by id:', error)
    throw error
  }
}
