import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function SellerApprovals() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            const res = await api.get('/sellers');
            setSellers(res.data.sellers || []);
        } catch (error) {
            console.error("Error fetching sellers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id, status) => {
        try {
            await api.put(`/sellers/${id}/approve`, { status });
            fetchSellers();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (loading) return <div>Loading sellers...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Seller Approvals</h1>
            </div>
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Shop Name</th>
                                <th className="px-6 py-4">Owner</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-slate-900">
                            {sellers.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No sellers found.</td></tr>
                            ) : (
                                sellers.map((seller) => (
                                    <tr key={seller._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{seller.shopName}</td>
                                        <td className="px-6 py-4">{seller.ownerName}</td>
                                        <td className="px-6 py-4">{seller.phone}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${seller.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    seller.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {seller.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            {seller.status === 'pending' && (
                                                <>
                                                    <button onClick={() => handleApprove(seller._id, 'approved')} className="text-green-600 hover:text-green-700 font-medium text-xs px-3 py-1 border border-green-200 hover:border-green-300 rounded-sm bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">Approve</button>
                                                    <button onClick={() => handleApprove(seller._id, 'rejected')} className="text-red-600 hover:text-red-700 font-medium text-xs px-3 py-1 border border-red-200 hover:border-red-300 rounded-sm bg-red-50 hover:bg-red-100 transition-colors cursor-pointer">Reject</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
