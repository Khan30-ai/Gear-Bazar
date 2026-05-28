import { X, LogIn } from "lucide-react"

export default function LoginRequiredModal({ isOpen, onClose, onContinue }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white border border-slate-200 rounded-sm shadow-xl w-full max-w-sm mx-4 p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-orange-100 rounded-full">
                    <LogIn className="w-6 h-6 text-orange-600" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">
                    Sign In Required
                </h3>
                <p className="text-sm text-slate-500 text-center mb-6">
                    Please sign in to add products to your cart.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={onContinue}
                        className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-sm transition-colors"
                    >
                        Continue to Sign In
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-sm transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
