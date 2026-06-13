import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { toast } from 'react-hot-toast'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false);

    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)
        try {
            await login(email, password)
            toast.dismiss()
            toast.success('Signed in successfully.')
            const from = location.state?.from?.pathname || "/"
            navigate(from, { replace: true })
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Unable to sign in. Please check your credentials and try again."
            setError(message)
            toast.dismiss()
            toast.error(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="flex justify-center">
                    <Link to="/" className="flex items-center justify-center gap-3 group">
                        <div className="mb-4 flex flex-col items-center">
                            <img
                                src="/Signin-logo.png"
                                alt="GearBazar"
                                className="h-20 w-auto mb-3"
                            />

                            <h1 className="text-4xl font-bold tracking-tight">
                                Gear<span className="text-orange-600">Bazar</span>
                            </h1>
                        </div>
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
                                disabled={isLoading}
                            />
                        </div>

                        <div>

                            <label
                                htmlFor="login-password"
                                className="block text-sm font-medium text-slate-950 mb-1.5"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={visible ? "text" : "password"}
                                    id="login-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-3 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setVisible((v) => !v)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-900"
                                >
                                    {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
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
                            <Link to="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
                                Forgot password?
                            </Link>
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
