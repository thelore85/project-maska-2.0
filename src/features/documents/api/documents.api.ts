import { getAccessToken } from '@/features/auth/utils/msalClient'
import type { PresignUploadRequest, PresignUploadResponse, CompleteUploadRequest, CompleteUploadResponse } from './documents.types'

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
