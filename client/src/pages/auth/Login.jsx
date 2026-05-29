import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate, useLocation, Link } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)
        try {
            await login(email, password)
            // Redirect back to previous page or home
            const from = location.state?.from?.pathname || "/"
            navigate(from, { replace: true })
        } catch (err) {
            setError(err.response?.data?.message || "Failed to login. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
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
                    <h1 className="text-xl font-semibold text-slate-950 mb-6">
                        Sign in to your account
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="login-email" className="block text-sm font-medium text-slate-950 mb-1.5">Email</label>
                            <input
                                type="email"
                                id="login-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="login-password" className="block text-sm font-medium text-slate-950 mb-1.5">Password</label>
                            <input
                                type="password"
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded-sm border-slate-300 text-orange-600 focus:ring-orange-500 focus:ring-offset-0"
                                />
                                <span className="text-sm text-slate-500">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-sm text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer disabled:opacity-70"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <p className="text-sm text-slate-500 text-center mt-6">
                        New to GearBazar?{" "}
                        <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-medium transition-colors cursor-pointer">
                            Create Account
                        </Link>
                    </p>
                </div>
                
                <p className="text-center text-slate-500 text-xs mt-6">
                    Trusted by automotive businesses worldwide
                </p>
            </div>
        </div>
    )
}
