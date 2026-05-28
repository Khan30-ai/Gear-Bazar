import { useState } from "react"

export default function Login({ onSwitchToSignup }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Login submitted:", { email, password, rememberMe })
    }

    return (
        <div>
            <h1 className="text-xl font-semibold text-slate-950 mb-6">
                Sign in to your account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                    <label
                        htmlFor="login-email"
                        className="block text-sm font-medium text-slate-950 mb-1.5"
                    >
                        Email
                    </label>
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

                {/* Password Field */}
                <div>
                    <label
                        htmlFor="login-password"
                        className="block text-sm font-medium text-slate-950 mb-1.5"
                    >
                        Password
                    </label>
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

                {/* Remember Me & Forgot Password */}
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
                    <a
                        href="#"
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                        Forgot password?
                    </a>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
                >
                    Sign In
                </button>
            </form>

            {/* Switch to Signup */}
            <p className="text-sm text-slate-500 text-center mt-6">
                New to GearBazar?{" "}
                <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="text-orange-600 hover:text-orange-700 font-medium transition-colors cursor-pointer"
                >
                    Create Account
                </button>
            </p>
        </div>
    )
}
