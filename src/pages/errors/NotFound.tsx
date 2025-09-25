import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

import LogoMain from '@/components/common/LogoMain'

export default function NotFound() {
    return (
        <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            {/* Background decorative elements */}
            <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-30 blur-2xl"></div>
            <div className="absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 opacity-40 blur-3xl"></div>

            {/* Main content */}
            <div className="relative z-10 mx-auto max-w-md">
                {/* Logo */}
                <div className="mb-8">
                    <LogoMain />
                </div>

                {/* 404 illustration */}
                <div className="mb-6">
                    <div className="mt-2 text-6xl">📚🔍</div>
                </div>

                {/* Error message */}
                <div className="mb-8 space-y-3">
                    <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent">Oops! Page Not Found</h1>

                    <p className="leading-relaxed text-gray-600">
                        It looks like this page got lost in translation!
                        <br />
                        Let's get you back to your learning journey.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                    <Link to="/">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-2.5 font-medium text-white hover:from-blue-600 hover:to-purple-700">🏠 Back to Home</Button>
                    </Link>
                </div>

                {/* Help text */}
                <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-sm text-blue-800">
                        <strong>💡 Tip:</strong> Use the navigation menu to explore all learning features, or check your progress in the dashboard.
                    </p>
                </div>
            </div>
        </div>
    )
}
