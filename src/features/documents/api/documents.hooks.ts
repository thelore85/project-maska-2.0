import { useMutation } from '@tanstack/react-query'
import { createPresignUpload } from './documents.api'
import type { PresignUploadRequest } from './documents.types'

export function usePresignUpload() {
    return useMutation({
        mutationFn: (data: PresignUploadRequest) => createPresignUpload(data),
        retry: false
    })
}
