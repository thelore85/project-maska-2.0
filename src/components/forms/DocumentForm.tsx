import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { UploadIcon, FileIcon, XIcon, CheckCircleIcon, TestTube } from 'lucide-react'
import { useDocumentUpload } from '@/features/documents/api'
import { useCompanyStore } from '@/store/companyStore'

type DocumentFile = {
    id: string
    file: File
    name: string
    size: number
    type: string
    preview?: string
}

export type DocumentFormData = {
    title: string
    description: string
    file: DocumentFile | null
    uploadResponse?: any
}

type DocumentFormProps = {
    onSubmit: (data: DocumentFormData) => void
    onCancel: () => void
    isLoading?: boolean
    maxFileSize?: number // in bytes
    acceptedTypes?: string[]
}

export function DocumentForm({
    onSubmit,
    onCancel,
    isLoading = false,
    maxFileSize = 10 * 1024 * 1024, // 10MB
    acceptedTypes = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png']
}: DocumentFormProps) {
    const [formData, setFormData] = useState<DocumentFormData>({
        title: '',
        description: '',
        file: null
    })

    const [errors, setErrors] = useState<{
        title?: string
        description?: string
        file?: string
    }>({})

    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const documentUpload = useDocumentUpload()
    const companyId = useCompanyStore((state) => state.company?.id)

    const handleInputChange = (field: keyof Pick<DocumentFormData, 'title' | 'description'>, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const validateFile = (file: File): string | null => {
        if (file.size > maxFileSize) {
            return `File "${file.name}" exceeds maximum size of ${Math.round(maxFileSize / (1024 * 1024))}MB`
        }

        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
        if (!acceptedTypes.includes(fileExtension)) {
            return `File type "${fileExtension}" is not supported`
        }

        return null
    }

    const processFile = (file: File) => {
        const validationError = validateFile(file)

        if (validationError) {
            setErrors((prev) => ({ ...prev, file: validationError }))
            return
        }

        // Clear existing file preview if any
        if (formData.file?.preview) {
            URL.revokeObjectURL(formData.file.preview)
        }

        const newFile: DocumentFile = {
            id: crypto.randomUUID(),
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        }

        setFormData((prev) => ({
            ...prev,
            file: newFile
        }))

        setErrors((prev) => ({ ...prev, file: undefined }))
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files[0]) {
            processFile(files[0])
        }
        // Reset input value to allow selecting the same file again
        e.target.value = ''
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0])
        }
    }

    const removeFile = () => {
        if (formData.file?.preview) {
            URL.revokeObjectURL(formData.file.preview)
        }
        setFormData((prev) => ({
            ...prev,
            file: null
        }))
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Document title is required'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        }

        if (!formData.file) {
            newErrors.file = 'A file is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && formData.file) {
            try {
                if (!companyId) {
                    setErrors(prev => ({ ...prev, file: 'Company ID is required for upload' }))
                    return
                }

                const uploadMetadata = {
                    company_id: companyId,
                    kind: 'docs' as const,
                    filename: formData.file.name,
                    content_type: formData.file.type
                }

                console.log('Uploading document:', {
                    title: formData.title,
                    description: formData.description,
                    fileName: formData.file.name,
                    fileSize: formData.file.size,
                    metadata: uploadMetadata
                })

                const uploadResponse = await documentUpload.mutateAsync({
                    file: formData.file.file,
                    metadata: uploadMetadata
                })

                console.log('Document uploaded successfully:', uploadResponse)

                // Call parent onSubmit with the complete form data and upload response
                onSubmit({
                    ...formData,
                    uploadResponse
                })
            } catch (error) {
                console.error('Upload failed:', error)
                setErrors(prev => ({ ...prev, file: 'Upload failed. Please try again.' }))
            }
        }
    }

    const handleTestAPI = async () => {
        try {
            // Load real PDF file from public assets
            const response = await fetch('/assets/file-test.pdf')
            const blob = await response.blob()
            const testFile = new File([blob], 'file-test.pdf', {
                type: 'application/pdf'
            })

            const testMetadata = {
                company_id: 2,
                kind: 'docs',
                filename: 'file-test.pdf',
                content_type: 'application/pdf'
                // size_bytes: testFile.size,
                // sha256: 'calculated_hash_here',
                // claim_id: 1,
                // note: 'Real PDF file test upload'
            }

            console.log('Testing document upload with real PDF file:', {
                fileName: testFile.name,
                fileSize: testFile.size,
                fileType: testFile.type,
                metadata: testMetadata
            })

            const uploadResponse = await documentUpload.mutateAsync({ file: testFile, metadata: testMetadata })
            console.log('OK - Document Upload Response:', uploadResponse)
        } catch (error) {
            console.error('KO - Document Upload Error:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
                <label htmlFor="title" className="text-foreground text-sm font-medium">
                    Document Title *
                </label>
                <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                        errors.title ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Enter document title"
                    disabled={isLoading}
                />
                {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
                <label htmlFor="description" className="text-foreground text-sm font-medium">
                    Description *
                </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className={`bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full resize-none rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                        errors.description ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Enter document description"
                    disabled={isLoading}
                />
                {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
            </div>

            {/* File Upload Area */}
            <div className="space-y-2">
                <label className="text-foreground text-sm font-medium">Document *</label>

                <div
                    className={`relative rounded-lg border-2 border-dashed p-6 transition-colors ${
                        dragActive ? 'border-primary bg-primary/5' : errors.file ? 'border-destructive bg-destructive/5' : 'border-input hover:border-primary/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={acceptedTypes.join(',')}
                        onChange={handleFileSelect}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        disabled={isLoading || !!formData.file}
                    />

                    <div className="text-center">
                        <UploadIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                        <div className="text-foreground mb-2 font-medium">{dragActive ? 'Drop file here' : formData.file ? 'File selected' : 'Drag & drop a file here, or click to select'}</div>
                        <p className="text-muted-foreground text-sm">
                            Supported formats: {acceptedTypes.join(', ')} • Max {Math.round(maxFileSize / (1024 * 1024))}MB
                        </p>
                    </div>
                </div>

                {errors.file && <p className="text-destructive text-sm">{errors.file}</p>}
            </div>

            {/* Selected File */}
            {formData.file && (
                <div className="space-y-2">
                    <h4 className="text-foreground text-sm font-medium">Selected File</h4>
                    <div className="bg-muted/50 border-input flex items-center gap-3 rounded-md border p-3">
                        <div className="flex-shrink-0">
                            {formData.file.preview ? (
                                <img src={formData.file.preview} alt={formData.file.name} className="h-10 w-10 rounded object-cover" />
                            ) : (
                                <FileIcon className="text-muted-foreground h-10 w-10" />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-foreground truncate text-sm font-medium">{formData.file.name}</p>
                            <p className="text-muted-foreground text-xs">{formatFileSize(formData.file.size)}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                            <Button type="button" variant="ghost" size="sm" onClick={removeFile} disabled={isLoading} className="text-muted-foreground hover:text-destructive h-auto p-1">
                                <XIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Test API Button */}
            <div className="pt-2">
                <Button type="button" variant="outline" onClick={handleTestAPI} disabled={documentUpload.isPending} className="w-full">
                    <TestTube className="mr-2 h-4 w-4" />
                    {documentUpload.isPending ? 'Testing API...' : 'Test Document Upload'}
                </Button>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading} className="flex-1">
                    Cancel
                </Button>
                <Button type="submit" variant="default" disabled={isLoading || !formData.file} className="flex-1">
                    {isLoading ? 'Uploading...' : 'Upload Document'}
                </Button>
            </div>
        </form>
    )
}
