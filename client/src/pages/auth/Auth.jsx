import { useState } from "react"
import Login from "./Login"
import Signup from "./Signup"

export default function Auth() {
    const [isSignup, setIsSignup] = useState(false)

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
            {/* Logo */}
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-slate-950 rounded-sm flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-orange-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-slate-950 tracking-tight">
                            GearBazar
                        </span>
                    </div>
                </div>

                {/* Auth Card */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-8">
                    <div className="relative overflow-hidden">
                        {/* Login Form */}
                        <div
                            className={`transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${isSignup
                                ? "opacity-0 scale-95 -translate-x-8 absolute inset-0 pointer-events-none"
                                : "opacity-100 scale-100 translate-x-0 p-5"
                                }`}
                        >
                            <Login onSwitchToSignup={() => setIsSignup(true)} />
                        </div>

                        {/* Signup Form */}
                        <div
                            className={`transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${isSignup
                                ? "opacity-100 scale-100 translate-x-0 p-5"
                                : "opacity-0 scale-95 translate-x-8 absolute inset-0 pointer-events-none"
                                }`}
                        >
                            <Signup onSwitchToLogin={() => setIsSignup(false)} />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-500 text-xs mt-6">
                    Trusted by automotive businesses worldwide
                </p>
            </div>
        </div>
    )
}
