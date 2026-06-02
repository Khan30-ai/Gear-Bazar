import { useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setSuccessMessage("")
        setIsLoading(true)
        try {
            const response = await api.post("/auth/forgot-password", { email })
            setSuccessMessage(response.data?.message || "Reset link sent successfully. Please check your inbox.")
            setEmail("")
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send reset link. Please check the email and try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans antialiased">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-slate-950 rounded-sm flex items-center justify-center">
                            <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-slate-950 tracking-tight group-hover:text-orange-600 transition-colors">
                            GearBazar
                        </span>
                    </Link>
                </div>

                <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-8">
                    <h1 className="text-xl font-semibold text-slate-950 mb-2">
                        Forgot Password
                    </h1>
                    <p className="text-xs text-slate-500 mb-6">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="forgot-email" className="block text-sm font-medium text-slate-950 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                id="forgot-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-sm text-xs">
                                {error}
                            </div>
                        )}

                        {successMessage && (
                            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-sm text-xs font-medium">
                                {successMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer disabled:opacity-70"
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <p className="text-sm text-slate-500 text-center mt-6">
                        Remember your password?{" "}
                        <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium transition-colors cursor-pointer">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
