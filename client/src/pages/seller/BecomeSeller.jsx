import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function BecomeSeller() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [status, setStatus] = useState(null); // 'idle', 'pending', 'approved', 'rejected'
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        shopName: "",
        ownerName: "",
        gstNumber: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await api.get('/sellers/profile');
                if (response.data && response.data.status) {
                    setStatus(response.data.status);
                    if (response.data.status === 'approved') {
                        navigate('/seller');
                    }
                }
            } catch (err) {
                if (err.response?.status === 404) {
                    setStatus('idle'); // No profile yet
                }
            } finally {
                setIsLoading(false);
            }
        };
        checkStatus();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            await api.post('/sellers/profile', formData);
            setStatus('pending');
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit application.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (status === 'pending') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white border border-slate-200 p-8 text-center rounded-sm shadow-sm">
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Pending</h2>
                    <p className="text-slate-600 mb-6">Your seller application is currently under review by our admin team. We will notify you once it is approved.</p>
                    <button onClick={() => navigate('/')} className="px-6 py-2 bg-slate-900 text-white font-medium rounded-sm hover:bg-slate-800 transition-colors">
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white border border-slate-200 shadow-sm rounded-sm">
                    <div className="px-6 py-6 sm:px-10 sm:py-8 border-b border-slate-200">
                        <h1 className="text-2xl font-bold text-slate-900">Become a Seller</h1>
                        <p className="text-sm text-slate-500 mt-1">Join our marketplace and start selling your automotive parts.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-10">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div className="sm:col-span-2">
                                <label htmlFor="shopName" className="block text-sm font-medium text-slate-900 mb-1.5">Shop Name *</label>
                                <input type="text" id="shopName" required value={formData.shopName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-900" />
                            </div>

                            <div>
                                <label htmlFor="ownerName" className="block text-sm font-medium text-slate-900 mb-1.5">Owner Name</label>
                                <input type="text" id="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-900" />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-1.5">Phone Number *</label>
                                <input type="tel" id="phone" required value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-900" />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="gstNumber" className="block text-sm font-medium text-slate-900 mb-1.5">GST Number</label>
                                <input type="text" id="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-900 placeholder-slate-400" placeholder="Optional" />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-slate-900 mb-1.5">Business Address</label>
                                <input type="text" id="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-900" />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-slate-900 mb-1.5">City *</label>
                                <input type="text" id="city" required value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-900" />
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-slate-900 mb-1.5">State *</label>
                                <input type="text" id="state" required value={formData.state} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-900" />
                            </div>

                            <div>
                                <label htmlFor="pincode" className="block text-sm font-medium text-slate-900 mb-1.5">Pincode</label>
                                <input type="text" id="pincode" value={formData.pincode} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-900" />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button type="submit" disabled={isLoading} className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70">
                                {isLoading ? "Submitting..." : "Submit Application"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
