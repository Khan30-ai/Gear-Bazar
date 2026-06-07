import { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';

const STATUS_TABS = ['All', 'Pending', 'Approved', 'Rejected'];

const statusBadge = (status) => {
    const styles = {
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        pending:  'bg-yellow-100 text-yellow-800',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
            {status}
        </span>
    );
};

export default function SellerApprovals() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // sellerId being acted on

    // Search + tab
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Pending');

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/sellers');
            setSellers(res.data.sellers || []);
        } catch (error) {
            console.error('Error fetching sellers:', error);
        } finally {
            setLoading(false);
        }
    };

    // In-place status update — no full refetch needed
    const handleApprove = async (id, status) => {
        setActionLoading(id);
        try {
            await api.put(`/sellers/${id}/approve`, { status });
            setSellers(prev =>
                prev.map(s => s._id === id ? { ...s, status } : s)
            );
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update seller status. Please try again.');
        } finally {
            setActionLoading(null);
        }
    };

    // Tab counts
    const counts = useMemo(() => {
        const c = { All: sellers.length, Pending: 0, Approved: 0, Rejected: 0 };
        sellers.forEach(s => {
            if (s.status === 'pending') c.Pending++;
            else if (s.status === 'approved') c.Approved++;
            else if (s.status === 'rejected') c.Rejected++;
        });
        return c;
    }, [sellers]);

    // Filtered + searched sellers
    const filteredSellers = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return sellers.filter(s => {
            const tabMatch =
                activeTab === 'All' ||
                s.status === activeTab.toLowerCase();

            const searchMatch =
                !q ||
                s.shopName?.toLowerCase().includes(q) ||
                s.ownerName?.toLowerCase().includes(q) ||
                s.phone?.toLowerCase().includes(q) ||
                s.email?.toLowerCase().includes(q);

            return tabMatch && searchMatch;
        });
    }, [sellers, activeTab, searchQuery]);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Seller Approvals</h1>
                    <p className="text-sm text-slate-500 mt-1">Review and manage seller registration requests.</p>
                </div>
                <button
                    onClick={fetchSellers}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 px-3 py-1.5 rounded-sm hover:bg-slate-50 transition-colors self-start sm:self-auto"
                >
                    ↻ Refresh
                </button>
            </div>

            {/* Search */}
            <div className="mb-4">
                <div className="relative max-w-sm">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by shop name, owner, phone…"
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-sm text-sm bg-white focus:outline-none focus:border-orange-500 text-slate-800 placeholder-slate-400"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-1 mb-4 border-b border-slate-200">
                {STATUS_TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                            activeTab === tab
                                ? 'border-orange-600 text-orange-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {tab}
                        <span className={`ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                            activeTab === tab ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                            {counts[tab]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">
                        <svg className="animate-spin h-8 w-8 text-orange-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p>Loading sellers…</p>
                    </div>
                ) : (
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
                                {filteredSellers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-slate-500">
                                            No sellers match your search or filter.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSellers.map((seller) => {
                                        const isActing = actionLoading === seller._id;
                                        return (
                                            <tr key={seller._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium">{seller.shopName}</td>
                                                <td className="px-6 py-4">{seller.ownerName}</td>
                                                <td className="px-6 py-4">{seller.phone}</td>
                                                <td className="px-6 py-4">{statusBadge(seller.status)}</td>
                                                <td className="px-6 py-4 text-right">
                                                    {seller.status === 'pending' ? (
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleApprove(seller._id, 'approved')}
                                                                disabled={isActing}
                                                                className="text-green-600 hover:text-green-700 font-medium text-xs px-3 py-1 border border-green-200 hover:border-green-300 rounded-sm bg-green-50 hover:bg-green-100 transition-colors cursor-pointer disabled:opacity-50"
                                                            >
                                                                {isActing ? 'Approving…' : 'Approve'}
                                                            </button>
                                                            <button
                                                                onClick={() => handleApprove(seller._id, 'rejected')}
                                                                disabled={isActing}
                                                                className="text-red-600 hover:text-red-700 font-medium text-xs px-3 py-1 border border-red-200 hover:border-red-300 rounded-sm bg-red-50 hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-50"
                                                            >
                                                                {isActing ? 'Rejecting…' : 'Reject'}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-slate-400 italic">No action needed</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
