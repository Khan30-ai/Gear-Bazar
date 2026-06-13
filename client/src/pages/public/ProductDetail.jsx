import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

import {
    Star,
    ShoppingCart,
    Zap,
    ChevronRight,
    Check,
    AlertTriangle,
    Minus,
    Plus,
    Truck,
    Shield,
    RotateCcw,
    Package,
    MapPin,
    Phone,
} from "lucide-react"
import ProductCard from "../../components/product/ProductCard";
import LoginRequiredModal from "../../components/product/LoginRequiredModal";
import Toast from '../../components/ui/Toast';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../hooks/useCart';
import { useParams } from 'react-router-dom'
import { getProductById } from "../../services/product.service";
import { ProductNotFound } from "../errors"

export default function ProductDetails() {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [addedToCart, setAddedToCart] = useState(false)   // flash state for Add to Cart
    const { user } = useAuth();
    const { addToCart } = useCart();

    const { id } = useParams();
    // Find product by ID
    // const product = PRODUCTS.find((p) => String(p._id) === id)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                console.log("PRODUCT DATA:", data);
                setProduct(data.product);
            } catch (err) {
                console.error("PRODUCT ERROR:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);
    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                    <div className="text-slate-500">
                        Loading product...
                    </div>
                </div>
                <Footer />
            </>
        );
    }
    if (!product) {
        return <ProductNotFound />
    }

    const {
        name,
        brand,
        category,
        price,
        mrp,
        rating,
        reviewCount,
        partNumber,
        partType,
        stock,
        fitments,
        sellerId,
        warrantyMonths,
        images,
        description
    } = product;

    const discount = mrp
        ? Math.round(((mrp - price) / mrp) * 100)
        : 0;
    const isLowStock = stock > 0 && stock < 5
    const isOutOfStock = stock === 0

    // Related products (same category, excluding current)
    // const relatedProducts = PRODUCTS
    //     .filter((p) => String(p._id) !== id && p.category === category)
    //     .slice(0, 4)
    const relatedProducts = [];

    // Thumbnail images (mock)
    const thumbnails = [1, 2, 3, 4]

    const handleAddToCart = () => {
        if (!user) {
            setShowLoginModal(true)
            return
        }
        addToCart(product, quantity)
        setToastMessage("Added to cart successfully!")
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    const handleBuyNow = () => {
        if (!user) {
            setShowLoginModal(true)
            return
        }
        addToCart(product, quantity)
        navigate(`/checkout/${product._id}`)
    }

    const handleAddToCartRelated = (relatedProduct) => {
        if (!user) {
            setShowLoginModal(true)
            return
        }
        addToCart(relatedProduct, 1)
        setToastMessage("Added to cart successfully!")
    }

    // Category icons mapping
    const categoryIcons = {
        Ignition: (
            <svg
                className="w-full h-full text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
            >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        Brakes: (
            <svg
                className="w-full h-full text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
            >
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
            </svg>
        ),
        Battery: (
            <svg
                className="w-full h-full text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
            >
                <rect x="3" y="6" width="18" height="14" rx="2" />
                <path d="M7 6V4h4v2M13 6V4h4v2M7 11h3M14 11h3M14 14h3" />
            </svg>
        ),
        Transmission: (
            <svg
                className="w-full h-full text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
            >
                <circle cx="6" cy="6" r="3" />
                <circle cx="18" cy="18" r="3" />
                <path d="M6 9v9h9" />
            </svg>
        ),
        default: (
            <svg
                className="w-full h-full text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
            >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    }

    const CategoryIcon = categoryIcons[category] || categoryIcons.default
    console.log("PRODUCT DATA:", product);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-slate-50">
                {/* Breadcrumb */}
                <div className="bg-white border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 py-3">
                        <nav className="flex items-center gap-2 text-xs text-slate-500">
                            <Link to="/" className="hover:text-orange-600 transition-colors">
                                Home
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link to="/" className="hover:text-orange-600 transition-colors">
                                {category}
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-slate-700 font-medium truncate max-w-[200px]">
                                {name}
                            </span>
                        </nav>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-6">
                    {/* Main Product Section */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column - Images */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative bg-white border border-slate-200 rounded-sm p-8">
                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                                    <span
                                        className={`px-2 py-1 text-[10px] font-semibold uppercase rounded-sm ${partType === "OEM"
                                            ? "bg-blue-100 text-blue-600"
                                            : partType === "AFTERMARKET"
                                                ? "bg-orange-100 text-orange-600"
                                                : "bg-slate-100 text-slate-600"
                                            }`}
                                    >
                                        {partType}
                                    </span>
                                    {isOutOfStock && (
                                        <span className="px-2 py-1 bg-red-100 text-red-600 text-[10px] font-semibold uppercase rounded-sm">
                                            Out of Stock
                                        </span>
                                    )}
                                    {isLowStock && (
                                        <span className="px-2 py-1 bg-amber-100 text-amber-600 text-[10px] font-semibold uppercase rounded-sm">
                                            Low Stock
                                        </span>
                                    )}
                                </div>

                                {/* Image */}
                                <div className="h-64 md:h-80 flex items-center justify-center">
                                    {product.images?.[0] ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-48 h-48">
                                            {CategoryIcon}
                                        </div>
                                    )}
                                </div>

                                <p className="text-center text-[11px] text-slate-400 mt-4">
                                    Hover over image to zoom
                                </p>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-2">
                                {thumbnails.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-16 h-16 bg-white border rounded-sm flex items-center justify-center transition-colors ${selectedImage === index
                                            ? "border-orange-500"
                                            : "border-slate-200 hover:border-slate-300"
                                            }`}
                                    >
                                        <div className="w-10 h-10 text-slate-300">{CategoryIcon}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Product Info */}
                        <div className="space-y-5">
                            {/* Title Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-slate-500">{brand}</span>
                                    <span className="text-slate-300">|</span>
                                    <span className="text-xs text-slate-500">{category}</span>
                                </div>
                                <h1 className="text-xl font-bold text-slate-900 mb-2">{name}</h1>
                                <Link
                                    to="#"
                                    className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                                >
                                    Shop All {brand}
                                </Link>
                            </div>

                            {/* Part Number & Rating */}
                            <div className="flex flex-wrap items-center gap-4">
                                <p className="text-xs text-slate-500 font-mono">
                                    Part #<span className="text-slate-700">{partNumber}</span>
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < Math.floor(rating)
                                                    ? "fill-orange-400 text-orange-400"
                                                    : "fill-slate-200 text-slate-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-medium text-slate-700">
                                        {rating}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        ({reviewCount} reviews)
                                    </span>
                                </div>
                            </div>

                            {/* Warranty */}
                            {warrantyMonths > 0 && (
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <Shield className="w-4 h-4 text-green-600" />
                                    <span>{warrantyMonths} Months Warranty</span>
                                </div>
                            )}

                            {/* Specifications Grid */}
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                                    Specifications
                                </h3>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                                        <p className="text-[10px] text-slate-500 uppercase mb-0.5">
                                            Warranty
                                        </p>
                                        <p className="text-xs font-medium text-slate-700">
                                            {warrantyMonths} Months
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                                        <p className="text-[10px] text-slate-500 uppercase mb-0.5">
                                            Part Number
                                        </p>
                                        <p className="text-xs font-medium text-slate-700 font-mono">
                                            {partNumber}
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                                        <p className="text-[10px] text-slate-500 uppercase mb-0.5">
                                            Brand
                                        </p>
                                        <p className="text-xs font-medium text-slate-700">
                                            {brand}
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                                        <p className="text-[10px] text-slate-500 uppercase mb-0.5">
                                            Stock
                                        </p>
                                        <p className="text-xs font-medium text-slate-700">
                                            {stock}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Product Description */}
                            <div className="bg-white border border-slate-200 rounded-sm p-4">
                                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                                    Product Description
                                </h3>

                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                    {description}
                                </p>
                            </div>
                            {/* Price Section */}
                            <div className="bg-white border border-slate-200 rounded-sm p-4">
                                <div className="flex items-baseline gap-3 mb-1">
                                    <span className="text-2xl font-bold text-slate-900">
                                        ₹{(price || 0).toLocaleString("en-IN")}
                                    </span>
                                    <span className="text-sm text-slate-400 line-through">
                                        ₹{(mrp || price || 0).toLocaleString("en-IN")}
                                    </span>
                                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-sm">
                                        {discount}% OFF
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mb-3">
                                    Unit Rate (GST Excl.)
                                </p>

                                {/* Stock & Delivery */}
                                <div className="flex items-center gap-4 mb-4">
                                    {stock > 0 ? (
                                        <div className="flex items-center gap-1.5">
                                            <Check className="w-4 h-4 text-green-600" />
                                            <span className="text-xs font-medium text-green-600">
                                                In Stock
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                | Est. delivery in 3-5 days
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-xs font-medium text-red-600">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                {/* Quantity Selector */}
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-xs text-slate-500">Qty:</span>
                                    <div className="flex items-center border border-slate-200 rounded-sm">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={isOutOfStock}
                                            className="p-2 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                                        >
                                            <Minus className="w-4 h-4 text-slate-500" />
                                        </button>
                                        <span className="w-10 text-center text-sm font-medium text-slate-700">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                                            disabled={isOutOfStock}
                                            className="p-2 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                                        >
                                            <Plus className="w-4 h-4 text-slate-500" />
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isOutOfStock || addedToCart}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-white text-sm font-medium rounded-sm transition-all duration-200 ${addedToCart
                                            ? 'bg-emerald-600 cursor-default'
                                            : 'bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed'
                                            }`}
                                    >
                                        {addedToCart ? (
                                            <>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Added to Cart!
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-4 h-4" />
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        disabled={isOutOfStock}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-sm transition-colors"
                                    >
                                        <Zap className="w-4 h-4" />
                                        Buy Now
                                    </button>
                                </div>
                            </div>

                            {/* Seller Info */}
                            <div className="bg-slate-50 border border-slate-200 rounded-sm p-4">
                                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                                    Sold By
                                </h3>
                                <p className="text-sm font-medium text-slate-700">{sellerId?.shopName}</p>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {sellerId?.city}, {sellerId?.state}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                    <Phone className="w-3.5 h-3.5" />
                                    {sellerId?.phone}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Sections */}
                    <div className="mt-8 grid md:grid-cols-3 gap-4">
                        {/* Compatible Vehicles */}
                        <div className="bg-white border border-slate-200 rounded-sm p-4">
                            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                <Truck className="w-4 h-4 text-slate-500" />
                                Vehicle Fitments
                            </h3>

                            <div className="space-y-2">
                                {fitments?.map((fitment, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-50 border border-slate-200 p-2 rounded-sm"
                                    >
                                        <p className="text-xs font-medium text-slate-700">
                                            {fitment.brand} {fitment.model}
                                            {fitment.variant && ` ${fitment.variant}`}
                                        </p>

                                        <p className="text-[11px] text-slate-500">
                                            {fitment.yearFrom} - {fitment.yearTo}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Return Policy */}
                        <div className="bg-white border border-slate-200 rounded-sm p-4">
                            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                <RotateCcw className="w-4 h-4 text-slate-500" />
                                Return Policy
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                7-day return policy for unopened products. Defective items can be
                                returned within 30 days. Professional installation recommended.
                            </p>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-10">
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                                    Related Products
                                </h2>
                                <div className="h-1 w-12 bg-orange-600 rounded-full" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {relatedProducts.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onAddToCart={handleAddToCartRelated}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Sticky Add to Cart */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex gap-3 z-40">
                    <div className="flex-1">
                        <p className="text-lg font-bold text-slate-900">
                            ₹{price.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-slate-500">Unit Rate (GST Excl.)</p>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock || addedToCart}
                        className={`px-6 py-2.5 text-white text-sm font-medium rounded-sm transition-all duration-200 ${addedToCart
                            ? 'bg-emerald-600 cursor-default'
                            : 'bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 disabled:cursor-not-allowed'
                            }`}
                    >
                        {addedToCart ? 'Added ✓' : 'Add to Cart'}
                    </button>
                </div>

                {/* Login Required Modal */}
                <LoginRequiredModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                    onContinue={() => navigate("/login")}
                />
                <Toast message={toastMessage} onClose={() => setToastMessage("")} />
            </div>
            <Footer />
        </>
    )
}
