// Documents API Types

export interface PresignUploadRequest {
    company_id: number
    kind: string
    filename: string
    content_type: string
    // size_bytes: number
    // sha256: string
    // claim_id: number
    // note: string
}

export interface PresignUploadResponse {
    upload_url: string
    document_id: string
    expires_at: string
}

export interface DocumentUploadError {
    error: string
    message: string
    code?: number
}
