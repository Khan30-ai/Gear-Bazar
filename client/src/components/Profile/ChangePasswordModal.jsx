import { Check, ShieldCheck, EyeOff, Eye, X } from "lucide-react";
import { useState } from "react";
import { changePassword } from "../../services/auth.service";
import toast from "react-hot-toast";

function PasswordInput({ id, label, value, onChange, error, autoComplete }) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <label
                htmlFor={id}
                className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
            >
                {label}
            </label>
            <div className="relative mt-1.5">
                <input
                    id={id}
                    name={id}
                    type={visible ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    className={`w-full rounded-sm border bg-white px-3 py-2 pr-10 text-sm font-medium text-slate-900 outline-none transition-all duration-300 focus:shadow-sm ${error
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-orange-600"
                        }`}
                />
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    tabIndex={-1}
                    aria-label={visible ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition-colors duration-300 hover:text-slate-900"
                >
                    {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
            )}
        </div>
    );
}

export default function ChangePasswordModal({ onClose }) {
    const [form, setForm] = useState({ current: "", next: "", confirm: "" });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const next = {};
        if (!form.current) next.current = "Enter your current password.";
        if (!form.next) {
            next.next = "Enter a new password.";
        } else if (form.next.length < 8) {
            next.next = "Use at least 8 characters.";
        }
        if (!form.confirm) {
            next.confirm = "Confirm your new password.";
        } else if (form.next && form.confirm !== form.next) {
            next.confirm = "Passwords do not match.";
        }
        if (form.current && form.next && form.current === form.next) {
            next.next = "New password must differ from current password.";
        }
        return next;
    };

    const handleSubmit =
        async (e) => {
            e.preventDefault();
            const next = validate();
            setErrors(next);
            if (Object.keys(next).length !== 0)
                return;

            try {
                await changePassword({
                    currentPassword: form.current,
                    newPassword: form.next
                });
                toast.success("Password updated successfully");
                setSuccess(true);
            }
            catch (err) {
                console.log(err);
                console.log(err.response);
                console.log(err.response?.data);
                toast.error(
                    err.response?.data?.message || "Failed to update password"
                );
            }
        };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
            <div className="w-full max-w-md rounded-sm border border-slate-200 bg-white shadow-md">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Security
                        </p>
                        <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
                            Change Password
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-sm p-1.5 text-slate-400 transition-all duration-300 hover:bg-slate-50 hover:text-slate-900"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {success ? (
                    <div className="flex flex-col items-center px-6 py-10 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-green-50 text-green-600">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="mt-4 text-base font-bold text-slate-900">
                            Password updated
                        </h3>
                        <p className="mt-1.5 text-sm text-slate-500">
                            Your password has been changed successfully. Use it the next time you sign in.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-6 w-full rounded-sm bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-md hover:scale-[1.01] sm:w-auto sm:px-8"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="px-6 py-6">
                        <div className="flex flex-col gap-5">
                            <PasswordInput
                                id="current"
                                label="Current Password"
                                value={form.current}
                                onChange={handleChange}
                                error={errors.current}
                                autoComplete="current-password"
                            />
                            <PasswordInput
                                id="next"
                                label="New Password"
                                value={form.next}
                                onChange={handleChange}
                                error={errors.next}
                                autoComplete="new-password"
                            />
                            <PasswordInput
                                id="confirm"
                                label="Confirm New Password"
                                value={form.confirm}
                                onChange={handleChange}
                                error={errors.confirm}
                                autoComplete="new-password"
                            />
                        </div>

                        <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-slate-400">
                            Use at least 8 characters. We recommend a mix of letters, numbers and symbols.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500 transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 hover:scale-[1.01] sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-sm bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-md hover:scale-[1.01] sm:order-2"
                            >
                                <Check className="h-4 w-4" />
                                Update Password
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
