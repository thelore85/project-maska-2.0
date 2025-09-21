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

    // example response data:
    // {
    //     "upload_id": 11,
    //     "method": "PUT",
    //     "put_url": "https://greentruststorage.blob.core.windows.net/test-8f01f33b-docs/2025/09/20/af5b6d0bf03748678b1cbd3affc213a2__test-document.pdf?st=2025-09-20T11%3A41%3A20Z&se=2025-09-20T11%3A52%3A20Z&sp=cw&spr=https&sv=2025-07-05&sr=b&rsct=application/pdf&skoid=2c3afb71-6c32-4301-8872-5af829a6a20c&sktid=6de4b266-c8c3-410f-80f2-88e3cfedc9b5&skt=2025-09-20T11%3A41%3A20Z&ske=2025-09-20T11%3A57%3A20Z&sks=b&skv=2025-07-05&sig=an%2BvnFjCfR1QFzHXhZPLh%2BRtu9hsMAedknc%2BUiF80d4%3D",
    //     "blob_url": "https://greentruststorage.blob.core.windows.net/test-8f01f33b-docs/2025/09/20/af5b6d0bf03748678b1cbd3affc213a2__test-document.pdf",
    //     "required_headers": {
    //         "x-ms-blob-type": "BlockBlob",
    //         "Content-Type": "application/pdf"
    //     },
    //     "expires_at": "2025-09-20T11:52:20.788670+00:00"
    // }
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
