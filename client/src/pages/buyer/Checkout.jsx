import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Checkout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cartItems, clearItem } = useCart();
    const { user } = useAuth();

    const [checkoutItem, setCheckoutItem] = useState(null);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        phone: '',
        addressLine: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: 'upi'
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const item = cartItems.find(i => i._id === id);
        if (item) {
            setCheckoutItem(item);
        } else {
            // Item not found in cart, redirect back to cart
            navigate('/cart');
        }
    }, [id, cartItems, user, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.fullName || !formData.phone || !formData.addressLine || !formData.city || !formData.pincode) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsPlacingOrder(true);

        // Simulate API call
        setTimeout(() => {
            clearItem(checkoutItem._id);
            setIsPlacingOrder(false);
            setOrderSuccess(true);
        }, 1500);
    };

    if (orderSuccess) {
        return (
            <>
                <Header />
                <div className="bg-slate-50 min-h-[70vh] flex flex-col items-center justify-center p-4">
                    <CheckCircle2 className="h-20 w-20 text-green-500 mb-6" />
                    <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Order Placed Successfully!</h2>
                    <p className="text-slate-500 mb-8 text-center max-w-md">
                        Your order for <span className="font-semibold text-slate-700">{checkoutItem?.name}</span> has been confirmed. You will receive an SMS and email with tracking details shortly.
                    </p>
                    <div className="flex gap-4">
                        <button onClick={() => navigate('/products')} className="bg-slate-950 hover:bg-slate-800 text-white font-semibold py-2.5 px-6 rounded-sm transition-colors">
                            Continue Shopping
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!checkoutItem) return null; // Will redirect or show loading

    const subtotal = checkoutItem.price * checkoutItem.quantity;
    const shipping = 150; // Flat shipping rate
    const total = subtotal + shipping;

    return (
        <>
            <Header />
            <div className="bg-slate-50 min-h-screen py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <button onClick={() => navigate('/cart')} className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" /> Back to Cart
                    </button>

                    <div className="mb-6">
                        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Secure Checkout</h1>
                        <p className="text-sm text-slate-500 mt-1">Complete your order for this item</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Left Column: Form */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Shipping Address */}
                            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                                <div className="bg-slate-950 px-6 py-4 border-b border-slate-800">
                                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Shipping Address</h2>
                                </div>
                                <div className="p-6">
                                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                                            <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number *</label>
                                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Address Line *</label>
                                            <input required type="text" name="addressLine" value={formData.addressLine} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" placeholder="House/Flat No., Building Name, Street" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Landmark (Optional)</label>
                                            <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">City *</label>
                                            <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">State *</label>
                                            <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Pincode *</label>
                                            <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                                <div className="bg-slate-950 px-6 py-4 border-b border-slate-800">
                                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Payment Method</h2>
                                </div>
                                <div className="p-6 space-y-3">
                                    <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${formData.paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-slate-300 accent-orange-600" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">UPI (GPay, PhonePe, Paytm)</div>
                                            <div className="text-xs text-slate-500">Instant payment via UPI apps</div>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-slate-300 accent-orange-600" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Credit / Debit Card</div>
                                            <div className="text-xs text-slate-500">Visa, MasterCard, RuPay</div>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${formData.paymentMethod === 'netbanking' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="paymentMethod" value="netbanking" checked={formData.paymentMethod === 'netbanking'} onChange={handleInputChange} className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-slate-300 accent-orange-600" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Net Banking</div>
                                            <div className="text-xs text-slate-500">All major Indian banks supported</div>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-slate-300 accent-orange-600" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Cash on Delivery</div>
                                            <div className="text-xs text-slate-500">Pay when your order arrives</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-slate-200 rounded-sm shadow-sm sticky top-6">
                                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Order Summary</h2>
                                </div>
                                <div className="p-6">

                                    {/* Product Snapshot */}
                                    <div className="flex gap-4 pb-4 border-b border-slate-100 mb-4">
                                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-sm flex items-center justify-center shrink-0">
                                            {checkoutItem.image ? (
                                                <img src={checkoutItem.image} alt={checkoutItem.name} className="w-full h-full object-contain p-1" />
                                            ) : (
                                                <ShieldCheck className="w-6 h-6 text-slate-300" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{checkoutItem.name}</h4>
                                            <div className="text-[10px] text-slate-500 mt-1">Part #{checkoutItem.partNumber}</div>
                                            <div className="text-[10px] text-slate-500">Sold by: {checkoutItem.seller || 'Verified Vendor'}</div>
                                            <div className="text-xs font-semibold text-slate-700 mt-1">Qty: {checkoutItem.quantity}</div>
                                        </div>
                                    </div>

                                    {/* Financials */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm text-slate-600">
                                            <span>Subtotal</span>
                                            <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-slate-600">
                                            <span>Shipping Fee</span>
                                            <span className="font-semibold text-slate-900">₹{shipping.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-[11px] text-slate-400">
                                            <span>Taxes (GST 18% included)</span>
                                            <span>-</span>
                                        </div>

                                        <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                                            <span className="text-base font-black text-slate-900 uppercase">Total</span>
                                            <span className="text-xl font-black text-orange-600">₹{total.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        form="checkout-form"
                                        disabled={isPlacingOrder}
                                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-4 rounded-sm transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
                                    >
                                        {isPlacingOrder ? (
                                            <>Processing...</>
                                        ) : (
                                            <>Place Order <ShieldCheck className="w-4 h-4" /></>
                                        )}
                                    </button>

                                    <div className="mt-4 flex items-start gap-2 text-[10px] text-slate-500 bg-slate-50 p-2.5 rounded-sm">
                                        <Truck className="w-4 h-4 shrink-0 text-slate-400" />
                                        <p>Standard delivery within 3-5 business days. Ships directly from the seller's warehouse.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
