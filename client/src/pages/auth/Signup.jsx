import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { toast } from 'react-hot-toast'

export default function Signup() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setIsLoading(true)
        try {
            await register(fullName, email, password)
            toast.dismiss()
            toast.success('Account created successfully.')
            navigate("/")
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Unable to create account. Please try again."
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
                        Create your account
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="signup-name" className="block text-sm font-medium text-slate-950 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                id="signup-name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="signup-email" className="block text-sm font-medium text-slate-950 mb-1.5">Email</label>
                            <input
                                type="email"
                                id="signup-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-950 mb-1.5">Password</label>
                            <input
                                type="password"
                                id="signup-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-slate-950 mb-1.5">Confirm Password</label>
                            <input
                                type="password"
                                id="signup-confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                required
                                disabled={isLoading}
                            />
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
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-sm text-slate-500 text-center mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium transition-colors cursor-pointer">
                            Sign In
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
