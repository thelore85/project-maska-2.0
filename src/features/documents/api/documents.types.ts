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
    upload_id: number
    method: string
    put_url: string
    blob_url: string
    required_headers: Record<string, string>
    expires_at: string
}

export interface CompleteUploadRequest {
    company_id: number
    upload_id: number
}

export interface CompleteUploadResponse {
    success: boolean
    document_id: string
    message?: string
}

export interface DocumentUploadError {
    error: string
    message: string
    code?: number
}

export interface LastRun {
    id: number
    run_status: string
    model_name: string
    prompt_version: string
    traffic_light: string
    category_at_run: string
    explanation: string
    revised_claim: string
    gaps: string[]
    supporting_snippets: string[]
    created_at: string
}

export interface Evidence {
    link_id: number
    status: string
    note: string
    created_at: string
    useful_in_last_run: boolean
    document: {
        id: number
        company_id: number
        kind: string
        status: string
        analyzed: number
        created_by: number
        created_at: string
        updated_at: string
        upload_id: number
        original_filename: string
        size_bytes: number
        content_type: string
    }
}

export interface Claim {
    id: number
    claim: string
    category: string
    probability: number
    explanation: string
    risk: string
    evidence_needed: string[]
    created_at: string
    last_run: LastRun | null
    evidences: Evidence[]
}

export interface DocumentDetail {
    id: number
    company_id: number
    kind: string
    title: string | null
    issue_date: string | null
    status: string
    analyzed: number
    created_by: number
    created_at: string
    updated_at: string
    upload_id: number
    original_filename: string
    size_bytes: number
    content_type: string
}

export interface DocumentByIdResponse {
    document: DocumentDetail
    claims: Claim[]
    aggregates: {
        claims_count: number
        runs_missing_count: number
        evidences_count: number
    }
}
