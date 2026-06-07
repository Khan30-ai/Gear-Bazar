import React, { useState, useEffect, useMemo } from 'react';
import { getProducts, approveProduct, rejectProduct } from '../../services/product.service';

const STATUS_TABS = ['All', 'Pending', 'Approved', 'Rejected'];

const statusBadge = (status) => {
    const styles = {
        pending:  'bg-amber-50 text-amber-700 border border-amber-200',
        approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        rejected: 'bg-red-50 text-red-700 border border-red-200',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
            {status}
        </span>
    );
};

export default function ProductApprovals() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Reject flow
    const [rejectingId, setRejectingId] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [actionLoading, setActionLoading] = useState(null); // productId being acted on

    // Search + tab filter
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Pending');

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            // Fetch all products (admin sees everything — no view=public)
            const data = await getProducts({ limit: 500 });
            setProducts(data.products || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.response?.data?.message || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    // In-place approve: update the product in local state, no refetch needed.
    const handleApprove = async (id) => {
        if (!window.confirm('Approve this product? It will go live immediately.')) return;
        setActionLoading(id);
        try {
            await approveProduct(id);
            setProducts(prev =>
                prev.map(p =>
                    p._id === id
                        ? { ...p, approval: { ...p.approval, status: 'approved' } }
                        : p
                )
            );
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to approve product');
        } finally {
            setActionLoading(null);
        }
    };

    // In-place reject: update status in local state.
    const handleReject = async (id) => {
        if (!rejectReason.trim()) {
            alert('Please provide a reason for rejection.');
            return;
        }
        setActionLoading(id);
        try {
            await rejectProduct(id, rejectReason);
            setProducts(prev =>
                prev.map(p =>
                    p._id === id
                        ? { ...p, approval: { ...p.approval, status: 'rejected', rejectionReason: rejectReason } }
                        : p
                )
            );
            setRejectingId(null);
            setRejectReason('');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to reject product');
        } finally {
            setActionLoading(null);
        }
    };

    // Filter products by tab + search query
    const filteredProducts = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return products.filter(p => {
            const tabMatch =
                activeTab === 'All' ||
                p.approval?.status === activeTab.toLowerCase();

            const searchMatch =
                !q ||
                p.name?.toLowerCase().includes(q) ||
                p.partNumber?.toLowerCase().includes(q) ||
                p.brand?.toLowerCase().includes(q);

            return tabMatch && searchMatch;
        });
    }, [products, activeTab, searchQuery]);

    // Tab counts
    const counts = useMemo(() => {
        const c = { All: products.length, Pending: 0, Approved: 0, Rejected: 0 };
        products.forEach(p => {
            const s = p.approval?.status;
            if (s === 'pending') c.Pending++;
            else if (s === 'approved') c.Approved++;
            else if (s === 'rejected') c.Rejected++;
        });
        return c;
    }, [products]);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Product Approvals</h1>
                    <p className="text-sm text-slate-500 mt-1">Review and manage products listed by sellers.</p>
                </div>
                <button
                    onClick={fetchAllProducts}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 px-3 py-1.5 rounded-sm hover:bg-slate-50 transition-colors self-start sm:self-auto"
                >
                    ↻ Refresh
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-sm mb-6 border border-red-100">
                    {error}
                </div>
            )}

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
                        placeholder="Search by name, part number, brand…"
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
                        <p>Loading products…</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-12 text-center">
                        <svg className="w-14 h-14 text-slate-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-slate-500 text-sm">No products match your search or filter.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Product</th>
                                    <th className="px-6 py-4 font-bold">Seller</th>
                                    <th className="px-6 py-4 font-bold">Price / Stock</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts.map((product) => {
                                    const status = product.approval?.status || 'pending';
                                    const isActing = actionLoading === product._id;

                                    return (
                                        <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">{product.name}</div>
                                                <div className="text-xs text-slate-500">PN: {product.partNumber} | Brand: {product.brand}</div>
                                                <div className="text-[10px] uppercase font-bold text-orange-600 mt-1">{product.category} › {product.subcategory}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800">{product.sellerId?.shopName || 'Unknown'}</div>
                                                <div className="text-xs text-slate-400">ID: {product.sellerId?._id || product.sellerId}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">₹{product.price?.toLocaleString('en-IN')}</div>
                                                <div className="text-xs text-slate-500">{product.stock} units</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {statusBadge(status)}
                                                {status === 'rejected' && product.approval?.rejectionReason && (
                                                    <div className="text-[10px] text-red-500 mt-1 max-w-[160px] truncate" title={product.approval.rejectionReason}>
                                                        Reason: {product.approval.rejectionReason}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {/* Only pending products get action buttons */}
                                                {status === 'pending' && (
                                                    rejectingId === product._id ? (
                                                        <div className="flex flex-col items-end gap-2">
                                                            <textarea
                                                                className="w-full max-w-xs border border-slate-200 rounded-sm text-xs p-2 focus:outline-none focus:border-red-500"
                                                                placeholder="Reason for rejection…"
                                                                value={rejectReason}
                                                                onChange={(e) => setRejectReason(e.target.value)}
                                                                rows="2"
                                                            />
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => { setRejectingId(null); setRejectReason(''); }}
                                                                    className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(product._id)}
                                                                    disabled={isActing}
                                                                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold py-1 px-3 rounded-sm transition-colors"
                                                                >
                                                                    {isActing ? 'Rejecting…' : 'Confirm Reject'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-end gap-3">
                                                            <button
                                                                onClick={() => setRejectingId(product._id)}
                                                                disabled={isActing}
                                                                className="text-red-600 hover:text-red-800 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                                                            >
                                                                Reject
                                                            </button>
                                                            <button
                                                                onClick={() => handleApprove(product._id)}
                                                                disabled={isActing}
                                                                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold py-1.5 px-4 rounded-sm transition-colors uppercase tracking-wider"
                                                            >
                                                                {isActing ? 'Approving…' : 'Approve'}
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                                {/* Non-pending rows: show a neutral indicator */}
                                                {status !== 'pending' && (
                                                    <span className="text-xs text-slate-400 italic">No action needed</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
