import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"

export default function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccessMessage("")

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.")
            return
        }

        setIsLoading(true)
        try {
            const response = await api.put(`/auth/reset-password/${token}`, { password })
            setSuccessMessage(response.data?.message || "Password reset successful! Redirecting to login...")
            setTimeout(() => navigate("/login"), 3000)
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed. The link may have expired. Please request a new one.")
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
                        Reset Password
                    </h1>
                    <p className="text-xs text-slate-500 mb-6">
                        Enter your new password below. This link is valid for 15 minutes.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="reset-password" className="block text-sm font-medium text-slate-950 mb-1.5">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="reset-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="reset-confirm-password" className="block text-sm font-medium text-slate-950 mb-1.5">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="reset-confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
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
                            disabled={isLoading || !!successMessage}
                            className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer disabled:opacity-70"
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>

                    <p className="text-sm text-slate-500 text-center mt-6">
                        Link expired?{" "}
                        <Link to="/forgot-password" className="text-orange-600 hover:text-orange-700 font-medium transition-colors cursor-pointer">
                            Request a new one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
