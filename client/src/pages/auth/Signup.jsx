import { useState } from "react"

export default function Signup({ onSwitchToLogin }) {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }
        console.log("Signup submitted:", { fullName, email, password })
    }

    return (
        <div>
            <h1 className="text-xl font-semibold text-slate-950 mb-6">
                Create your account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name Field */}
                <div>
                    <label
                        htmlFor="signup-name"
                        className="block text-sm font-medium text-slate-950 mb-1.5"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="signup-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                        required
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="signup-email"
                        className="block text-sm font-medium text-slate-950 mb-1.5"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="signup-email"
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
                        htmlFor="signup-password"
                        className="block text-sm font-medium text-slate-950 mb-1.5"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="signup-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                        required
                    />
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label
                        htmlFor="signup-confirm-password"
                        className="block text-sm font-medium text-slate-950 mb-1.5"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="signup-confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
                >
                    Create Account
                </button>
            </form>

            {/* Switch to Login */}
            <p className="text-sm text-slate-500 text-center mt-6">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-orange-600 hover:text-orange-700 font-medium transition-colors cursor-pointer"
                >
                    Sign In
                </button>
            </p>
        </div>
    )
}
