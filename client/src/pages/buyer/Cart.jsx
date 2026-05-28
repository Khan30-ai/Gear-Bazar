import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, AlertCircle } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <>
                <Header />
                <div className="bg-slate-50 min-h-[70vh] flex flex-col items-center justify-center p-4">
                    <ShoppingBag className="h-16 w-16 text-slate-300 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Please log in to view your cart</h2>
                    <p className="text-slate-500 mb-6">You must be logged in to manage your shopping cart.</p>
                    <button onClick={() => navigate('/login')} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 px-6 rounded-sm transition-colors">
                        Login Now
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    if (cartItems.length === 0) {
        return (
            <>
                <Header />
                <div className="bg-slate-50 min-h-[70vh] flex flex-col items-center justify-center p-4">
                    <ShoppingBag className="h-16 w-16 text-slate-300 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                    <p className="text-slate-500 mb-6">Browse parts and add them to your cart</p>
                    <button onClick={() => navigate('/products')} className="bg-slate-950 hover:bg-slate-800 text-white font-semibold py-2.5 px-6 rounded-sm transition-colors cursor-pointer">
                        Browse Parts
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="bg-slate-50 min-h-screen py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Shopping Cart</h1>
                        <p className="text-sm text-slate-500 mt-1">Review your items before proceeding to checkout</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-sm mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-blue-900">Important Order Information</h3>
                            <p className="text-xs text-blue-800 mt-1">
                                * Each product will be ordered separately based on seller availability. Please checkout items individually using the buttons below.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="bg-white border border-slate-200 rounded-sm p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center shadow-sm">
                                {/* Product Image */}
                                <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-sm shrink-0 flex items-center justify-center">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <ShoppingBag className="w-8 h-8 text-slate-300" />
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.brand}</span>
                                        <span className="text-slate-300">|</span>
                                        <span className="text-[10px] text-slate-500 font-mono">Part #{item.partNumber}</span>
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 truncate mb-1" title={item.name}>{item.name}</h3>

                                    <div className="text-xs text-slate-500 mb-2">
                                        Sold by: <span className="font-semibold text-slate-700">{item.seller || 'GearBazar Verified Vendor'}</span>
                                    </div>

                                    {item.stock > 0 ? (
                                        <div className="text-xs font-semibold text-green-600">In Stock ({item.stock} left)</div>
                                    ) : (
                                        <div className="text-xs font-semibold text-red-600">Out of Stock</div>
                                    )}
                                </div>

                                {/* Quantity & Price */}
                                <div className="flex flex-col items-end gap-3 shrink-0 sm:w-40">
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                                        <div className="text-[10px] text-slate-500">₹{item.price.toLocaleString('en-IN')} / unit</div>
                                    </div>

                                    <div className="flex items-center border border-slate-200 rounded-sm bg-white">
                                        <button
                                            onClick={() => updateQuantity(item._id, -1)}
                                            className="p-1.5 hover:bg-slate-50 transition-colors text-slate-500"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="w-8 text-center text-xs font-semibold text-slate-800">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, 1)}
                                            className="p-1.5 hover:bg-slate-50 transition-colors text-slate-500"
                                            disabled={item.quantity >= item.stock}
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                                    <button
                                        onClick={() => navigate(`/checkout/${item._id}`)}
                                        disabled={item.stock <= 0}
                                        className="w-full sm:w-32 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold py-2.5 px-4 rounded-sm flex items-center justify-center gap-1.5 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                                    >
                                        Checkout <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="w-full sm:w-32 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-600 text-xs font-semibold py-2 px-4 rounded-sm flex items-center justify-center gap-1.5 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}