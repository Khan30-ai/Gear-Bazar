import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct, updateProductStock } from '../../services/product.service';
import Toast from '../../components/ui/Toast';

export default function MyProducts() {
    const location = useLocation();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    // State for delete modal
    const [deletingId, setDeletingId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // State for inline stock edit
    const [editingStockId, setEditingStockId] = useState(null);
    const [stockValue, setStockValue] = useState('');
    const [isUpdatingStock, setIsUpdatingStock] = useState(false);

    useEffect(() => {
        fetchProducts();

        // Handle redirect messages from Add/Edit Product
        if (location.state?.message) {
            setToastMessage(location.state.message);
            // clear state so it doesn't show again on refresh
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts({ limit: 100 });
            setProducts(data.products || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.response?.data?.message || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        setIsDeleting(true);
        try {
            await deleteProduct(deletingId);
            setProducts(products.filter(p => p._id !== deletingId));
            setToastMessage('Product deleted successfully.');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to delete product.');
        } finally {
            setIsDeleting(false);
            setDeletingId(null);
        }
    };

    const handleSaveStock = async (id) => {
        const val = parseInt(stockValue, 10);
        if (isNaN(val) || val < 0) {
            alert('Please enter a valid non-negative number for stock.');
            return;
        }

        setIsUpdatingStock(true);
        try {
            await updateProductStock(id, val);
            setProducts(products.map(p => p._id === id ? { ...p, stock: val } : p));
            setToastMessage('Stock updated successfully.');
            setEditingStockId(null);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to update stock.');
        } finally {
            setIsUpdatingStock(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-200">Approved</span>;
            case 'rejected':
                return <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-red-200">Rejected</span>;
            case 'pending':
            default:
                return <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-amber-200">Pending</span>;
        }
    };

    return (
        <div className="p-6 relative">
            <Toast message={toastMessage} onClose={() => setToastMessage('')} />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Products</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your catalog and view approval status.</p>
                </div>
                <Link
                    to="/seller/products/add"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-sm text-sm transition-colors flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Product
                </Link>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-sm mb-6 border border-red-100">
                    {error}
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">
                        <svg className="animate-spin h-8 w-8 text-orange-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p>Loading products...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="p-12 text-center">
                        <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">No products found</h3>
                        <p className="text-slate-500 mb-4 text-sm">You haven't listed any products yet.</p>
                        <Link
                            to="/seller/products/add"
                            className="text-orange-600 hover:text-orange-700 font-medium text-sm underline"
                        >
                            Add your first product
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Product</th>
                                    <th className="px-6 py-4 font-bold">Category</th>
                                    <th className="px-6 py-4 font-bold">Price</th>
                                    <th className="px-6 py-4 font-bold">Stock</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 flex-shrink-0 bg-slate-100 rounded overflow-hidden border border-slate-200 flex items-center justify-center">
                                                    {(product.images && product.images.length > 0) ? (
                                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-xs text-slate-400">No Img</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900">{product.name}</div>
                                                    <div className="text-xs text-slate-500">PN: {product.partNumber} | {product.brand}</div>
                                                    <div className="text-[10px] text-slate-400 mt-0.5">Added: {new Date(product.createdAt).toLocaleDateString('en-IN')}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>{product.category}</div>
                                            <div className="text-xs text-slate-500">{product.subcategory}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            ₹{product.price.toLocaleString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingStockId === product._id ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={stockValue}
                                                        onChange={(e) => setStockValue(e.target.value)}
                                                        className="w-16 px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:border-orange-500"
                                                    />
                                                    <button
                                                        disabled={isUpdatingStock}
                                                        onClick={() => handleSaveStock(product._id)}
                                                        className="text-white bg-slate-900 hover:bg-slate-800 text-[10px] px-2 py-1 rounded font-bold uppercase disabled:opacity-50"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingStockId(null)}
                                                        className="text-slate-500 hover:text-slate-800 text-[10px] px-2 py-1 rounded font-bold uppercase"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-medium ${product.stock < 5 ? 'text-red-600' : 'text-slate-900'}`}>
                                                        {product.stock}
                                                    </span>
                                                    <button
                                                        onClick={() => { setEditingStockId(product._id); setStockValue(product.stock); }}
                                                        className="text-slate-400 hover:text-orange-600 p-1"
                                                        title="Update Stock"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-start gap-1">
                                                {getStatusBadge(product.approval?.status)}
                                                {product.approval?.status === 'rejected' && product.approval?.rejectionReason && (
                                                    <span className="text-[10px] text-red-600 mt-1 max-w-[150px] leading-tight">
                                                        Reason: {product.approval.rejectionReason}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link
                                                    to={`/seller/products/edit/${product._id}`}
                                                    className="text-indigo-600 hover:text-indigo-800 text-xs font-bold uppercase tracking-wider"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => setDeletingId(product._id)}
                                                    className="text-red-600 hover:text-red-800 text-xs font-bold uppercase tracking-wider"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deletingId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-md shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Product</h3>
                        <p className="text-sm text-slate-600 mb-6">
                            Are you sure you want to delete this product? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                disabled={isDeleting}
                                onClick={() => setDeletingId(null)}
                                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isDeleting}
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-sm transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}