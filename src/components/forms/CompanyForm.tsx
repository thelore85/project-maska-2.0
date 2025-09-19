import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

type CompanyData = {
    name: string
    cif: string
    sector: string
}

type CompanyFormProps = {
    onSubmit: (data: CompanyData) => void
    onCancel: () => void
    isLoading?: boolean
}

export function CompanyForm({ onSubmit, onCancel, isLoading = false }: CompanyFormProps) {
    const [formData, setFormData] = useState<CompanyData>({
        name: '',
        cif: '',
        sector: ''
    })

    const [errors, setErrors] = useState<Partial<CompanyData>>({})

    const handleInputChange = (field: keyof CompanyData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<CompanyData> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Company name is required'
        }

        if (!formData.cif.trim()) {
            newErrors.cif = 'CIF is required'
        } else if (formData.cif.length < 9) {
            newErrors.cif = 'CIF must be at least 9 characters'
        }

        if (!formData.sector.trim()) {
            newErrors.sector = 'Sector is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            onSubmit(formData)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-foreground text-sm font-medium">
                    Company Name *
                </label>
                <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                        errors.name ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Enter company name"
                    disabled={isLoading}
                />
                {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="cif" className="text-foreground text-sm font-medium">
                    CIF *
                </label>
                <input
                    id="cif"
                    type="text"
                    value={formData.cif}
                    onChange={(e) => handleInputChange('cif', e.target.value.toUpperCase())}
                    className={`bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                        errors.cif ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Enter CIF"
                    maxLength={9}
                    disabled={isLoading}
                />
                {errors.cif && <p className="text-destructive text-sm">{errors.cif}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="sector" className="text-foreground text-sm font-medium">
                    Sector *
                </label>
                <input
                    id="sector"
                    type="text"
                    value={formData.sector}
                    onChange={(e) => handleInputChange('sector', e.target.value)}
                    className={`bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                        errors.sector ? 'border-destructive' : 'border-input'
                    }`}
                    placeholder="Enter sector"
                    disabled={isLoading}
                />
                {errors.sector && <p className="text-destructive text-sm">{errors.sector}</p>}
            </div>

            <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading} className="flex-1">
                    Cancel
                </Button>
                <Button type="submit" variant="default" disabled={isLoading} className="flex-1">
                    {isLoading ? 'Creation...' : 'Create Company'}
                </Button>
            </div>
        </form>
    )
}
