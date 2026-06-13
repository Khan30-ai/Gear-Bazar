import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateMyProfile, getMyProfile } from "../../services/buyer.service"
import { Pencil, KeyRound, LogOut, Check, X, Shield } from "lucide-react";

import ChangePasswordModal from "./ChangePasswordModal";

// Fields that are part of the editable information grid
const FIELD_CONFIG = [
    { key: "name", label: "Full Name" },
    { key: "email", label: "Email", type: "email" },
    { key: "role", label: "Role", mono: true },
];

function getInitials(name = "S") {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
}

function formatJoinDate(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function Field({ label, value, mono = false, className = "" }) {
    return (
        <div className={className}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                {label}
            </p>
            <p
                className={`mt-1.5 text-sm text-slate-900 ${mono ? "font-mono tracking-wide" : "font-medium"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}

function EditableField({ label, name, value, onChange, mono = false, type = "text", className = "" }) {
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={`mt-1.5 w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-orange-600 focus:shadow-sm ${mono ? "font-mono tracking-wide" : "font-medium"
                    }`}
            />
        </div>
    );
}

export default function AdminProfile() {
    const [user, setUser] = useState(null);
    const [draft, setDraft] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const { logout } = useAuth();

    const navigate = useNavigate();

    const initials = getInitials(
        user?.name || "U"
    )
    const joined = user

        ? formatJoinDate(user.createdAt)

        : "";

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const data = await getMyProfile();
                console.log(data);
                setUser(data);
                setDraft(data);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchUser();
    }, []);
    const handleEditClick = () => {
        setDraft(user);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setDraft(user);
        setIsEditing(false);
    };

    const handleSave = async () => {

        try {
            const response = await updateMyProfile(draft);

            setUser(response);
            setDraft(response);
            setIsEditing(false);
            toast.success(
                "Profile updated successfully"
            );
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDraft((prev) => ({ ...prev, [name]: value }));
    };
    if (!user || !draft) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <p className="text-slate-500 font-medium">

                    Loading Profile...

                </p>

            </div>

        );

    }

    return (

        <div className="min-h-screen w-full bg-slate-50 px-4 py-8 sm:py-16">
            <div className="mx-auto w-full max-w-[900px]">
                <button
                    onClick={() => navigate(-1)}
                    className="
                        mb-6
                        flex items-center gap-2
                        text-sm font-semibold
                        text-slate-500
                        hover:text-orange-600
                        transition-colors">

                    <ArrowLeft className="h-4 w-4" />Back</button>
                <div className="mb-4 flex items-center justify-between px-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">
                        GearBazar / Administrator
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">
                        ID&nbsp; #{user?._id?.slice(-6)}
                    </p>
                </div>

                <div className="rounded-sm border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                    {/* Top accent rail */}
                    <div className="h-1 w-full rounded-t-sm bg-slate-950" />

                    {/* HERO */}
                    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-10">
                        <div className="flex items-center gap-4 sm:gap-8">
                            {/* Avatar */}
                            <div className="h-24 w-24 bg-slate-50 text-green-500 rounded-sm flex items-center justify-center">
                                <Shield
                                    className="h-10 w-10"
                                />

                            </div>

                            {/* Identity */}
                            <div className="min-w-0 flex-1">
                                <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-3xl">
                                    {user.name}
                                </h1>
                                <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">
                                    System Administrator
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:mt-0 sm:flex-1 sm:justify-end sm:gap-3">
                            <span className="text-[10px] uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">
                                Joined {joined}
                            </span>
                        </div>
                    </div>

                    {/* INFORMATION */}
                    <div className="border-b border-slate-200 p-6 sm:p-10">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Account Details
                            </p>
                            {isEditing && (
                                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-600">
                                    Editing
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                            {FIELD_CONFIG.map((field) => {
                                const className = field.span ? "sm:col-span-2" : "";
                                const fieldValue = field.key === "roles"
                                    ? user?.roles?.join(", ")
                                    : user?.[field.key];
                                return isEditing && field.key === "name" ? (
                                    <EditableField
                                        key={field.key}
                                        label={field.label}
                                        name={field.key}
                                        value={draft?.[field.key] || ""}
                                        onChange={handleChange}
                                        mono={field.mono}
                                        type={field.type || "text"}
                                        className={className}
                                    />
                                ) : (
                                    <Field
                                        key={field.key}
                                        label={field.label}
                                        value={fieldValue || ""}
                                        mono={field.mono}
                                        className={className}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-end sm:p-10">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500 transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 hover:scale-[1.01] sm:order-1"
                                >
                                    <X className="h-4 w-4" />
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-md hover:scale-[1.01] sm:order-2"
                                >
                                    <Check className="h-4 w-4" />
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={logout}
                                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:scale-[1.01] sm:order-1"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsPasswordModalOpen(true)}
                                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-950 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-slate-950 hover:text-white hover:shadow-md hover:scale-[1.01] sm:order-2"
                                >
                                    <KeyRound className="h-4 w-4" />
                                    Change Password
                                </button>
                                <button
                                    type="button"
                                    onClick={handleEditClick}
                                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-md hover:scale-[1.01] sm:order-3"
                                >
                                    <Pencil className="h-4 w-4" />
                                    Edit Profile
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {isPasswordModalOpen && (
                <ChangePasswordModal onClose={() => setIsPasswordModalOpen(false)} />
            )}
        </div>
    );
}