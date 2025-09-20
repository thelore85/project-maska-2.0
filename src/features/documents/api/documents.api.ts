import { getAccessToken } from '@/features/auth/utils/msalClient'
import type { PresignUploadRequest, PresignUploadResponse } from './documents.types'

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
