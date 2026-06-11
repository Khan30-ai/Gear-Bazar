import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import BRANDS_DATA from '../../data/cars.json';
import LoginRequiredModal from '../../components/product/LoginRequiredModal.jsx';
import Toast from '../../components/ui/Toast';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../hooks/useCart';
import { getProducts } from '../../services/product.service';
import ProductCard from '../../components/product/ProductCard.jsx';


const BRANDS = Object.keys(BRANDS_DATA);


const CATEGORIES = [
    'Brakes', 'Clutch', 'Filters', 'Electrical', 'Engine', 'Ignition',
    'Suspension', 'Cooling System', 'Lighting', 'Steering', 'Transmission', 'Battery'
];

const MANUFACTURERS = [
    'Bosch', 'Exide', 'Lucas', 'Valeo', 'Minda', 'SKF', 'NGK', 'Monroe',
    'Castrol', 'Mobil', 'Shell', 'Mahle', 'Uno Minda', 'Amaron', 'Aftermarket Generic'
];

// Helper to return technical SVG illustration based on category
function getProductSVG(category) {
    switch (category) {
        case 'Brakes':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="4" strokeWidth="1" strokeDasharray="2 1" />
                    <path d="M12 2v20M2 12h20" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case 'Clutch':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="6" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="12" cy="12" r="2.5" strokeWidth="2" />
                </svg>
            );
        case 'Filters':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="4" y="4" width="16" height="16" rx="1" strokeWidth="1.5" />
                    <path d="M8 4v16M12 4v16M16 4v16M4 8h16M4 12h16M4 16h16" strokeWidth="1" />
                </svg>
            );
        case 'Electrical':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
                    <rect x="9" y="3" width="6" height="3" rx="0.5" strokeWidth="1.5" />
                    <path d="M12 9v6M9 12h6M16.5 16.5l2 2" strokeWidth="1.5" />
                </svg>
            );
        case 'Engine':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="5" y="5" width="14" height="14" rx="1" strokeWidth="1.5" />
                    <path d="M5 9h14M5 14h14M10 5v14M14 5v14" strokeWidth="1.5" />
                </svg>
            );
        case 'Ignition':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="10" y="4" width="4" height="12" rx="0.5" strokeWidth="1.5" />
                    <path d="M12 16v4m-2 2h4M9 6h6M8 9h8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case 'Suspension':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 4v4m0 8v4M9 8h6M8 10h8v4H8z" strokeWidth="1.5" />
                    <path d="M10 14a2 2 0 004 0v-4" strokeWidth="1.5" />
                </svg>
            );
        case 'Cooling System':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="4" y="7" width="16" height="10" rx="1" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                    <path d="M12 9v6M9 12h6" strokeWidth="1" />
                </svg>
            );
        case 'Lighting':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="10" r="5" strokeWidth="1.5" />
                    <path d="M12 15v3m-3 3h6M7.5 10H5m14 0h-2.5m-11-4l1.5 1.5m10.5-1.5L16 7.5" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case 'Steering':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                    <path d="M12 3v18M3 12h18" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2.5" strokeWidth="2" />
                </svg>
            );
        case 'Transmission':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="8" cy="8" r="4" strokeWidth="1.5" />
                    <circle cx="16" cy="16" r="4" strokeWidth="1.5" />
                    <path d="M11.5 11.5l1 1" strokeWidth="2" />
                </svg>
            );
        case 'Battery':
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="4" y="6" width="16" height="13" rx="1" strokeWidth="1.5" />
                    <path d="M7 6V4h2v2M15 6V4h2v2M8 11h2m4 0h-4M10 11v2m-2-1h4" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        default:
            return (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            );
    }
}


export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const { user } = useAuth();
    const { addToCart, cartItems } = useCart();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const search = searchParams.get("search");
    const category = searchParams.get("category");

    // Track per-product "just added" flash state (productId → true for 1.5s)
    const [addedSet, setAddedSet] = useState(new Set());

    // Active filter states (what actually filters the products)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedManufacturers, setSelectedManufacturers] = useState([]);
    const [priceRange, setPriceRange] = useState(20000);
    const [availability, setAvailability] = useState({
        inStock: false,
        oemOnly: false,
        aftermarketOnly: false,
        featuredOnly: false
    });
    const [ratingThreshold, setRatingThreshold] = useState(0);

    // Pending filter states for desktop sidebar (only applied on "Apply" click)
    const [pendingBrand, setPendingBrand] = useState('');
    const [pendingModel, setPendingModel] = useState('');
    const [pendingYear, setPendingYear] = useState('');
    const [pendingCategories, setPendingCategories] = useState([]);
    const [pendingManufacturers, setPendingManufacturers] = useState([]);
    const [pendingPriceRange, setPendingPriceRange] = useState(20000);
    const [pendingAvailability, setPendingAvailability] = useState({
        inStock: false,
        oemOnly: false,
        aftermarketOnly: false,
        featuredOnly: false
    });
    const [pendingRatingThreshold, setPendingRatingThreshold] = useState(0);

    // Sorting and Pagination
    const [sortOption, setSortOption] = useState('Featured');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Mobile Filter Drawer Toggle
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Fetch products from API on mount
    // view=public ensures sellers browsing the storefront see all approved products,
    // not just their own listings (which is what the seller dashboard uses).
    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                setLoading(true);
                const data = await getProducts({ limit: 100, view: 'public', search, category });
                const standardizedData = (data.products || []).map(p => ({
                    ...p,
                    _id: String(p._id || p.id)
                }));
                setProducts(standardizedData);
                setError(null);
            } catch (err) {
                console.error("PRODUCT API ERROR:", err);
                setError(err.response?.data?.message || err.message);  //temporary error handling
            } finally {
                setLoading(false);
            }
        };

        fetchProductsData();
    }, [search, category]);

    // add to cart
    const handleAddToCart = (product) => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        addToCart(product, 1);
        setToastMessage('Added to cart!');
    };

    // Reset pagination on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchQuery, selectedBrand, selectedModel, selectedYear,
        selectedCategories, selectedManufacturers, priceRange,
        availability, ratingThreshold, sortOption
    ]);

    // Pending filter handlers for desktop sidebar
    const handlePendingCategoryChange = (category) => {
        setPendingCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handlePendingManufacturerChange = (manufacturer) => {
        setPendingManufacturers((prev) =>
            prev.includes(manufacturer)
                ? prev.filter((m) => m !== manufacturer)
                : [...prev, manufacturer]
        );
    };

    const handlePendingAvailabilityChange = (key) => {
        setPendingAvailability((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Apply pending filters to active filters
    const handleApplyFilters = () => {
        console.log('APPLY CLICKED');
        console.log('pendingBrand:', pendingBrand);
        console.log('pendingCategories:', pendingCategories);
        setSelectedBrand(pendingBrand);
        setSelectedModel(pendingModel);
        setSelectedYear(pendingYear);
        setSelectedCategories([...pendingCategories]);
        setSelectedManufacturers([...pendingManufacturers]);
        setPriceRange(pendingPriceRange);
        setAvailability({ ...pendingAvailability });
        setRatingThreshold(pendingRatingThreshold);
    };

    // Mobile filter handlers (direct, no pending)
    const handleCategoryChange = (category) => {
        setPendingCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handleManufacturerChange = (manufacturer) => {
        setPendingManufacturers((prev) =>
            prev.includes(manufacturer)
                ? prev.filter((m) => m !== manufacturer)
                : [...prev, manufacturer]
        );
    };

    const handleAvailabilityChange = (key) => {
        setPendingAvailability((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Clear all filters (both active and pending)
    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedBrand('');
        setSelectedModel('');
        setSelectedYear('');
        setSelectedCategories([]);
        setSelectedManufacturers([]);
        setPriceRange(20000);
        setAvailability({
            inStock: false,
            oemOnly: false,
            aftermarketOnly: false,
            featuredOnly: false
        });
        setRatingThreshold(0);
        // Reset pending too
        setPendingBrand('');
        setPendingModel('');
        setPendingYear('');
        setPendingCategories([]);
        setPendingManufacturers([]);
        setPendingPriceRange(20000);
        setPendingAvailability({
            inStock: false,
            oemOnly: false,
            aftermarketOnly: false,
            featuredOnly: false
        });
        setPendingRatingThreshold(0);
    };

    // Check if any filters are active (excluding query for chip display)
    const isFilterActive =
        selectedBrand !== '' ||
        selectedModel !== '' ||
        selectedYear !== '' ||
        selectedCategories.length > 0 ||
        selectedManufacturers.length > 0 ||
        priceRange < 20000 ||
        availability.inStock ||
        availability.oemOnly ||
        availability.aftermarketOnly ||
        availability.featuredOnly ||
        ratingThreshold > 0;

    // Filter & Search Logic
    const filteredProducts = products.filter((product) => {
        // 1. Search Query filter (matches Name, Category, Brand, Part Number)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const matchName = product.name?.toLowerCase().includes(query);
            const matchBrand = product.brand?.toLowerCase().includes(query);
            const matchCat = product.category?.toLowerCase().includes(query);
            const matchPN = product.partNumber?.toLowerCase().includes(query);
            if (!matchName && !matchBrand && !matchCat && !matchPN) {
                return false;
            }
        }

        // 2. Vehicle Brand Filter
        if (selectedBrand) {
            const brandModels = Object.keys(BRANDS_DATA[selectedBrand] || []);
            // If a model is also selected, check that specific model compatibility
            if (selectedModel) {
                if (!product.compatibleVehicles.includes(selectedModel)) {
                    return false;
                }
            } else {
                // Check if product is compatible with ANY model of that brand
                const intersects = product.compatibleVehicles.some((model) =>
                    brandModels.includes(model)
                );
                if (!intersects) {
                    return false;
                }
            }
        }

        // 3. Vehicle Year Filter
        if (selectedYear) {
            const hasMatchingYear = product.compatibleYears?.includes(Number(selectedYear));

            if (!hasMatchingYear) {
                return false;
            }
        }

        // 4. Product Category Filters
        if (selectedCategories.length > 0) {
            if (!selectedCategories.includes(product.category)) {
                return false;
            }
        }

        // 5. Manufacturer Brand Filters
        if (selectedManufacturers.length > 0) {
            if (!selectedManufacturers.includes(product.brand)) {
                return false;
            }
        }

        // 6. Price Range Filter
        if (product.price > priceRange) {
            return false;
        }

        // 7. Availability Toggles
        if (availability.inStock && product.stock <= 0) {
            return false;
        }
        if (availability.oemOnly && product.aftermarket) {
            return false;
        }
        if (availability.aftermarketOnly && !product.aftermarket) {
            return false;
        }
        if (availability.featuredOnly && !product.featured) {
            return false;
        }

        // 8. Rating Filter
        if (ratingThreshold > 0 && product.rating < ratingThreshold) {
            return false;
        }

        return true;
    });

    // Sorting Logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'Price Low to High':
                return a.price - b.price;
            case 'Price High to Low':
                return b.price - a.price;
            case 'Best Rated':
                return b.rating - a.rating;
            case 'New Arrivals':
                // sort by high ID first as mock representation of newer entries
                return b._id.localeCompare(a._id);
            case 'Featured':
            default:
                // sort featured first
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return b.rating - a.rating;
        }
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Brand selection helper resets model (for pending/desktop sidebar)
    const handlePendingBrandChange = (e) => {
        setPendingBrand(e.target.value);
        setPendingModel('');
    };

    // Brand selection helper for mobile
    const handleBrandDropdownChange = (e) => {
        setSelectedBrand(e.target.value);
        setSelectedModel('');
    };

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col font-sans antialiased text-slate-800">
            <Header />

            {/* Main Container */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* Breadcrumb Navigation */}
                <nav className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
                    <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-orange-600 transition-colors">Products</Link>
                </nav>

                {/* Page Title & Top Section */}
                <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                            Auto Parts Marketplace
                        </h1>
                        <p className="text-xs text-slate-500 mt-1 font-medium">
                            Browse OEM and aftermarket components for Indian vehicles
                        </p>
                    </div>
                    <div className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-sm">
                        Total Results: <span className="text-slate-950 font-bold">{filteredProducts.length}</span> Parts found
                    </div>
                </div>

                {/* Toolbar: Search & Sorting */}
                <div className="bg-white border border-slate-200 p-4 rounded-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">

                    {/* Search bar */}
                    <div className="w-full md:max-w-md relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4.5 w-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by part name, brand, or number..."
                            className="w-full bg-slate-50 text-slate-950 placeholder-slate-400 pl-9 pr-4 py-2 border border-slate-200 rounded-sm focus:outline-none focus:border-orange-500 focus:bg-white text-xs transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 text-xs"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Controls Right */}
                    <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4">

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="sort-select" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                                Sort By
                            </label>
                            <select
                                id="sort-select"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="bg-slate-50 text-slate-900 border border-slate-200 rounded-sm text-xs px-3 py-2 focus:outline-none focus:border-orange-500 focus:bg-white font-semibold cursor-pointer"
                            >
                                <option value="Featured">Featured</option>
                                <option value="Price Low to High">Price: Low to High</option>
                                <option value="Price High to Low">Price: High to Low</option>
                                <option value="Best Rated">Best Rated</option>
                                <option value="New Arrivals">New Arrivals</option>
                            </select>
                        </div>

                        {/* Mobile Filter Toggle Button */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="lg:hidden bg-slate-950 text-white text-xs font-semibold px-4 py-2 rounded-sm border border-slate-900 hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                        >
                            <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filters
                        </button>
                    </div>
                </div>

                {/* Active Filter Chips */}
                {isFilterActive && (
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mr-1">Active Filters:</span>

                        {/* Brand/Model Chip */}
                        {selectedBrand && (
                            <span className="bg-orange-50 text-orange-800 text-[11px] font-semibold px-2.5 py-1 border border-orange-200 rounded-sm flex items-center gap-1">
                                Fitment: {selectedBrand} {selectedModel ? `> ${selectedModel}` : ''}
                                <button
                                    onClick={() => {
                                        setSelectedBrand('');
                                        setSelectedModel('');
                                        setSelectedYear('');
                                    }}
                                    className="hover:text-orange-900 font-bold ml-1 text-xs"
                                >
                                    &times;
                                </button>
                            </span>
                        )}

                        {/* Year Chip */}
                        {selectedYear && (
                            <span className="bg-orange-50 text-orange-800 text-[11px] font-semibold px-2.5 py-1 border border-orange-200 rounded-sm flex items-center gap-1">
                                Year: {selectedYear}
                                <button onClick={() => setSelectedYear('')} className="hover:text-orange-900 font-bold ml-1 text-xs">
                                    &times;
                                </button>
                            </span>
                        )}

                        {/* Category Chips */}
                        {selectedCategories.map((cat) => (
                            <span key={cat} className="bg-slate-900 text-slate-100 text-[11px] font-semibold px-2.5 py-1 border border-slate-800 rounded-sm flex items-center gap-1">
                                {cat}
                                <button onClick={() => handleCategoryChange(cat)} className="text-orange-500 hover:text-orange-400 font-bold ml-1 text-xs">
                                    &times;
                                </button>
                            </span>
                        ))}

                        {/* Manufacturer Chips */}
                        {selectedManufacturers.map((mfg) => (
                            <span key={mfg} className="bg-slate-900 text-slate-100 text-[11px] font-semibold px-2.5 py-1 border border-slate-800 rounded-sm flex items-center gap-1">
                                Brand: {mfg}
                                <button onClick={() => handleManufacturerChange(mfg)} className="text-orange-500 hover:text-orange-400 font-bold ml-1 text-xs">
                                    &times;
                                </button>
                            </span>
                        ))}

                        {/* Price Chip */}
                        {priceRange < 20000 && (
                            <span className="bg-orange-50 text-orange-800 text-[11px] font-semibold px-2.5 py-1 border border-orange-200 rounded-sm flex items-center gap-1">
                                Max Price: ₹{priceRange.toLocaleString('en-IN')}
                                <button onClick={() => setPriceRange(20000)} className="hover:text-orange-900 font-bold ml-1 text-xs">
                                    &times;
                                </button>
                            </span>
                        )}

                        {/* Availability Chips */}
                        {availability.inStock && (
                            <span className="bg-slate-900 text-slate-100 text-[11px] font-semibold px-2.5 py-1 border border-slate-800 rounded-sm flex items-center gap-1">
                                In Stock
                                <button onClick={() => handleAvailabilityChange('inStock')} className="text-orange-500 hover:text-orange-400 font-bold ml-1 text-xs">
                                    &times;
                                </button>
                            </span>
                        )}
                        {availability.oemOnly && (
                            <span className="bg-slate-900 text-slate-100 text-[11px] font-semibold px-2.5 py-1 border border-slate-800 rounded-sm flex items-center gap-1">
                                OEM Spares
                                <button onClick={() => handleAvailabilityChange('oemOnly')} className="text-orange-500 hover:text-orange-400 font-bold ml-1 text-xs">
                                    &times;
                                </button>
                            </span>
                        )}
                        {availability.aftermarketOnly && (
                            <span className="bg-slate-900 text-slate-100 text-[11px] font-semibold px-2.5 py-1 border border-slate-800 rounded-sm flex items-center gap-1">
                                Aftermarket Spares
                                <button onClick={() => handleAvailabilityChange('aftermarketOnly')} className="text-orange-500 hover:text-orange-400 font-bold ml-1 text-xs">
                                    &times;
                                </button>
                            </span>
                        )}
                        {availability.featuredOnly && (
                            <span className="bg-slate-900 text-slate-100 text-[11px] font-semibold px-2.5 py-1 border border-slate-800 rounded-sm flex items-center gap-1">
                                Featured Only
                                <button onClick={() => handleAvailabilityChange('featuredOnly')} className="text-orange-500 hover:text-orange-400 font-bold ml-1 text-xs">
                                    &times;
                                </button>
                            </span>
                        )}

                        {/* Rating Chip */}
                        {ratingThreshold > 0 && (
                            <span className="bg-orange-50 text-orange-800 text-[11px] font-semibold px-2.5 py-1 border border-orange-200 rounded-sm flex items-center gap-1">
                                Rating: {ratingThreshold}★ & above
                                <button onClick={() => setRatingThreshold(0)} className="hover:text-orange-900 font-bold ml-1 text-xs">
                                    &times;
                                </button>
                            </span>
                        )}

                        {/* Clear All Link */}
                        <button
                            onClick={handleClearFilters}
                            className="text-[11px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider underline cursor-pointer ml-2"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Layout Grid: Left Sidebar + Right Products Grid */}
                <div className="flex gap-8 items-start">

                    {/* ================================================= */}
                    {/* DESKTOP FILTER SIDEBAR */}
                    {/* ================================================= */}
                    <aside className="hidden lg:block w-72 bg-white border border-slate-200 p-5 rounded-sm sticky top-6 max-h-[88vh] overflow-y-auto shrink-0 shadow-2xs">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 mb-5">
                            <span className="text-xs font-black uppercase text-slate-900 tracking-wider">
                                Filter Catalog
                            </span>
                            <button
                                onClick={handleClearFilters}
                                className="text-[10px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider"
                            >
                                Reset
                            </button>
                        </div>

                        {/* 1. Vehicle Selection Dropdowns */}
                        <div className="mb-5">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                                1. Vehicle Compatibility
                            </h4>
                            <div className="space-y-3">
                                <div>
                                    <select
                                        value={pendingBrand}
                                        onChange={handlePendingBrandChange}
                                        className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-sm text-xs px-3 py-2 focus:outline-none focus:border-orange-500 focus:bg-white"
                                    >
                                        <option value="">-- Brand --</option>
                                        {BRANDS.map((brand) => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select
                                        value={pendingModel}
                                        onChange={(e) => setPendingModel(e.target.value)}
                                        disabled={!pendingBrand}
                                        className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-sm text-xs px-3 py-2 focus:outline-none focus:border-orange-500 focus:bg-white disabled:bg-slate-100 disabled:text-slate-400"
                                    >
                                        <option value="">-- Model --</option>
                                        {pendingBrand &&
                                            Object.keys(BRANDS_DATA[pendingBrand] || {}).map((model) => (
                                                <option key={model} value={model}>
                                                    {model}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <select
                                        value={pendingYear}
                                        onChange={(e) => setPendingYear(e.target.value)}
                                        className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-sm text-xs px-3 py-2 focus:outline-none focus:border-orange-500 focus:bg-white"
                                    >
                                        <option value="">-- Year --</option>
                                        {pendingBrand &&
                                            pendingModel &&
                                            [...(BRANDS_DATA?.[pendingBrand]?.[pendingModel] || [])]
                                                .map(Number)
                                                .sort((a, b) => b - a)
                                                .map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-4" />

                        {/* 2. Product Category Checkboxes */}
                        <div className="mb-5">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                                2. Product Category
                            </h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                {CATEGORIES.map((cat) => (
                                    <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-950">
                                        <input
                                            type="checkbox"
                                            checked={pendingCategories.includes(cat)}
                                            onChange={() => handlePendingCategoryChange(cat)}
                                            className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5 accent-orange-600"
                                        />
                                        <span>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <hr className="border-slate-100 my-4" />

                        {/* 3. Brand Filter Checkboxes */}
                        <div className="mb-5">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                                3. Spare Brand (OEM/OES)
                            </h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                {MANUFACTURERS.map((mfg) => (
                                    <label key={mfg} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-950">
                                        <input
                                            type="checkbox"
                                            checked={pendingManufacturers.includes(mfg)}
                                            onChange={() => handlePendingManufacturerChange(mfg)}
                                            className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5 accent-orange-600"
                                        />
                                        <span>{mfg}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <hr className="border-slate-100 my-4" />

                        {/* 4. Price Range Slider */}
                        <div className="mb-5">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                    4. Max Unit Price
                                </h4>
                                <span className="text-xs font-bold text-orange-600">₹{pendingPriceRange.toLocaleString('en-IN')}</span>
                            </div>
                            <input
                                type="range"
                                min="300"
                                max="20000"
                                step="200"
                                value={pendingPriceRange}
                                onChange={(e) => setPendingPriceRange(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                            />
                            <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-1">
                                <span>₹300</span>
                                <span>₹20,000+</span>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-4" />

                        {/* 5. Availability & Spares Specification */}
                        <div className="mb-5">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                                5. Product Specifications
                            </h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-950">
                                    <input
                                        type="checkbox"
                                        checked={pendingAvailability.inStock}
                                        onChange={() => handlePendingAvailabilityChange('inStock')}
                                        className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5 accent-orange-600"
                                    />
                                    <span>Exclude Out of Stock</span>
                                </label>
                                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-950">
                                    <input
                                        type="checkbox"
                                        checked={pendingAvailability.oemOnly}
                                        onChange={() => handlePendingAvailabilityChange('oemOnly')}
                                        className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5 accent-orange-600"
                                    />
                                    <span>OEM Parts Only</span>
                                </label>
                                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-950">
                                    <input
                                        type="checkbox"
                                        checked={pendingAvailability.aftermarketOnly}
                                        onChange={() => handlePendingAvailabilityChange('aftermarketOnly')}
                                        className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5 accent-orange-600"
                                    />
                                    <span>Aftermarket Only</span>
                                </label>
                                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-950">
                                    <input
                                        type="checkbox"
                                        checked={pendingAvailability.featuredOnly}
                                        onChange={() => handlePendingAvailabilityChange('featuredOnly')}
                                        className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5 accent-orange-600"
                                    />
                                    <span>Featured Parts Only</span>
                                </label>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-4" />

                        {/* 6. Ratings Filter */}
                        <div className="mb-5">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                                6. Spare Rating
                            </h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-950">
                                    <input
                                        type="radio"
                                        name="rating-select"
                                        checked={pendingRatingThreshold === 0}
                                        onChange={() => setPendingRatingThreshold(0)}
                                        className="border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5 accent-orange-600"
                                    />
                                    <span>All Ratings</span>
                                </label>
                                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-950">
                                    <input
                                        type="radio"
                                        name="rating-select"
                                        checked={pendingRatingThreshold === 4}
                                        onChange={() => setPendingRatingThreshold(4)}
                                        className="border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5 accent-orange-600"
                                    />
                                    <span className="flex items-center gap-1">4.0★ & above</span>
                                </label>
                                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-950">
                                    <input
                                        type="radio"
                                        name="rating-select"
                                        checked={pendingRatingThreshold === 3}
                                        onChange={() => setPendingRatingThreshold(3)}
                                        className="border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5 accent-orange-600"
                                    />
                                    <span className="flex items-center gap-1">3.0★ & above</span>
                                </label>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <button
                            type="button"
                            onClick={handleApplyFilters}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold py-2.5 rounded-sm transition-colors cursor-pointer mt-2"
                        >
                            Apply Filters
                        </button>
                    </aside>

                    {/* ================================================= */}
                    {/* RIGHT PRODUCTS GRID SECTION */}
                    {/* ================================================= */}
                    <section className="flex-grow">

                        {/* Loading skeletons */}
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                                {Array.from({ length: 8 }).map((_, idx) => (
                                    <div key={idx} className="bg-white border border-slate-200 p-4 rounded-sm animate-pulse flex flex-col justify-between h-80">
                                        <div className="bg-slate-200 h-36 w-full rounded-sm mb-4" />
                                        <div>
                                            <div className="bg-slate-200 h-3.5 w-3/4 rounded-sm mb-2" />
                                            <div className="bg-slate-200 h-3 w-1/2 rounded-sm mb-4" />
                                        </div>
                                        <div>
                                            <div className="bg-slate-200 h-5 w-2/3 rounded-sm mb-2" />
                                            <div className="bg-slate-200 h-7 w-full rounded-sm" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            /* Error UI */
                            <div className="bg-white border border-red-200 text-red-800 p-6 rounded-sm text-center">
                                <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="font-bold text-sm uppercase mb-1">Catalog Load Failed</h3>
                                <p className="text-xs text-slate-500 mb-4">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-sm hover:bg-slate-800 transition-colors"
                                >
                                    Reload Page
                                </button>
                            </div>
                        ) : currentItems.length === 0 ? (
                            /* Empty state UI */
                            <div className="bg-white border border-slate-200 p-12 rounded-sm text-center">
                                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h3 className="font-black text-slate-950 text-sm uppercase mb-1.5">No Parts Found</h3>
                                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5 leading-relaxed">
                                    We couldn't find any auto parts matching your current filters, vehicle compatibility settings, or search query.
                                </p>
                                <button
                                    onClick={handleClearFilters}
                                    className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-5 py-2.5 rounded-sm transition-colors cursor-pointer"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                                    {currentItems.map((product) => {
                                        const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
                                        return (
                                            <ProductCard
                                                key={product._id}
                                                product={product}
                                                onAddToCart={handleAddToCart}
                                                cartItems={cartItems}
                                                addedSet={addedSet}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 mt-10 pt-6 gap-4">
                                        <span className="text-xs text-slate-500 font-medium">
                                            Showing <span className="text-slate-900 font-bold">{indexOfFirstItem + 1}</span>–
                                            <span className="text-slate-900 font-bold">{Math.min(indexOfLastItem, sortedProducts.length)}</span> of{' '}
                                            <span className="text-slate-900 font-bold">{sortedProducts.length}</span> components
                                        </span>

                                        <div className="inline-flex items-center gap-1">

                                            {/* Prev Button */}
                                            <button
                                                onClick={() => paginate(Math.max(1, currentPage - 1))}
                                                disabled={currentPage === 1}
                                                className="px-3 py-1.5 border border-slate-200 rounded-sm text-xs font-bold text-slate-600 bg-white hover:border-slate-400 disabled:opacity-50 disabled:hover:border-slate-200 transition-colors cursor-pointer"
                                            >
                                                Previous
                                            </button>

                                            {/* Page Numbers */}
                                            {Array.from({ length: totalPages }).map((_, pageIdx) => {
                                                const pageNum = pageIdx + 1;
                                                const isActive = pageNum === currentPage;
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => paginate(pageNum)}
                                                        className={`px-3.5 py-1.5 border rounded-sm text-xs font-black transition-colors cursor-pointer ${isActive
                                                            ? 'bg-orange-600 border-orange-600 text-white'
                                                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}

                                            {/* Next Button */}
                                            <button
                                                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                                disabled={currentPage === totalPages}
                                                className="px-3 py-1.5 border border-slate-200 rounded-sm text-xs font-bold text-slate-600 bg-white hover:border-slate-400 disabled:opacity-50 disabled:hover:border-slate-200 transition-colors cursor-pointer"
                                            >
                                                Next
                                            </button>

                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            {/* ================================================= */}
            {/* MOBILE SLIDE-OVER FILTER DRAWER */}
            {/* ================================================= */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" role="dialog" aria-modal="true">

                    {/* Backdrop */}
                    <div
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="absolute inset-0 bg-slate-950/70 transition-opacity"
                    />

                    {/* Slider Panel */}
                    <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                        <div className="w-screen max-w-xs bg-white flex flex-col h-full shadow-xl">

                            {/* Header */}
                            <div className="px-4 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-900 shrink-0">
                                <span className="text-xs font-black uppercase tracking-wider">
                                    Filter Catalog
                                </span>
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="text-slate-400 hover:text-white p-1"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-5">

                                {/* 1. Vehicle Selection */}
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                                        1. Vehicle Compatibility
                                    </h4>
                                    <div className="space-y-3">
                                        <select
                                            value={pendingBrand}
                                            onChange={handlePendingBrandChange}
                                            className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-sm text-xs px-3 py-2"
                                        >
                                            <option value="">-- Brand --</option>
                                            {BRANDS.map((brand) => (
                                                <option key={brand} value={brand}>{brand}</option>
                                            ))}
                                        </select>

                                        <select
                                            value={pendingModel}
                                            onChange={(e) => setPendingModel(e.target.value)}
                                            disabled={!pendingBrand}
                                            className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-sm text-xs px-3 py-2 disabled:bg-slate-100 disabled:text-slate-400"
                                        >
                                            <option value="">-- Model --</option>
                                            {pendingBrand &&
                                                Object.keys(BRANDS_DATA[pendingBrand] || {}).map((model) => (
                                                    <option key={model} value={model}>{model}</option>
                                                ))}
                                        </select>

                                        <select
                                            value={pendingYear}
                                            onChange={(e) => setPendingYear(e.target.value)}
                                            className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-sm text-xs px-3 py-2"
                                        >
                                            <option value="">-- Year --</option>
                                            {pendingBrand &&
                                                pendingModel &&
                                                [...(BRANDS_DATA?.[pendingBrand]?.[pendingModel] || [])]
                                                    .map(Number)
                                                    .sort((a, b) => b - a)
                                                    .map((year) => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                        </select>
                                    </div>
                                </div>

                                <hr className="border-slate-100" />

                                {/* 2. Product Categories */}
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                                        2. Product Category
                                    </h4>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {CATEGORIES.map((cat) => (
                                            <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-700">
                                                <input
                                                    type="checkbox"
                                                    checked={pendingCategories.includes(cat)}
                                                    onChange={() => handleCategoryChange(cat)}
                                                    className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
                                                />
                                                <span>{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <hr className="border-slate-100" />

                                {/* 3. Manufacturer Brands */}
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                                        3. Spare Brand (OEM/OES)
                                    </h4>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {MANUFACTURERS.map((mfg) => (
                                            <label key={mfg} className="flex items-center gap-2.5 text-xs text-slate-700">
                                                <input
                                                    type="checkbox"
                                                    checked={pendingManufacturers.includes(mfg)}
                                                    onChange={() => handleManufacturerChange(mfg)}
                                                    className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
                                                />
                                                <span>{mfg}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <hr className="border-slate-100" />

                                {/* 4. Price range slider */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                            4. Max Unit Price
                                        </h4>
                                        <span className="text-xs font-bold text-orange-600">₹{pendingPriceRange.toLocaleString('en-IN')}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="300"
                                        max="20000"
                                        step="200"
                                        value={pendingPriceRange}
                                        onChange={(e) => setPendingPriceRange(Number(e.target.value))}
                                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                    />
                                    <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-1">
                                        <span>₹300</span>
                                        <span>₹20,000+</span>
                                    </div>
                                </div>

                                <hr className="border-slate-100" />

                                {/* 5. Availability specifications */}
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                                        5. Product Specifications
                                    </h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2.5 text-xs text-slate-700">
                                            <input
                                                type="checkbox"
                                                checked={pendingAvailability.inStock}
                                                onChange={() => handleAvailabilityChange('inStock')}
                                                className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
                                            />
                                            <span>Exclude Out of Stock</span>
                                        </label>
                                        <label className="flex items-center gap-2.5 text-xs text-slate-700">
                                            <input
                                                type="checkbox"
                                                checked={pendingAvailability.oemOnly}
                                                onChange={() => handleAvailabilityChange('oemOnly')}
                                                className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
                                            />
                                            <span>OEM Parts Only</span>
                                        </label>
                                        <label className="flex items-center gap-2.5 text-xs text-slate-700">
                                            <input
                                                type="checkbox"
                                                checked={pendingAvailability.aftermarketOnly}
                                                onChange={() => handleAvailabilityChange('aftermarketOnly')}
                                                className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
                                            />
                                            <span>Aftermarket Only</span>
                                        </label>
                                        <label className="flex items-center gap-2.5 text-xs text-slate-700">
                                            <input
                                                type="checkbox"
                                                checked={pendingAvailability.featuredOnly}
                                                onChange={() => handleAvailabilityChange('featuredOnly')}
                                                className="rounded-xs border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
                                            />
                                            <span>Featured Parts Only</span>
                                        </label>
                                    </div>
                                </div>

                                <hr className="border-slate-100" />

                                {/* 6. Ratings */}
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                                        6. Spare Rating
                                    </h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2.5 text-xs text-slate-700">
                                            <input
                                                type="radio"
                                                name="rating-select-mobile"
                                                checked={ratingThreshold === 0}
                                                onChange={() => setRatingThreshold(0)}
                                                className="border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
                                            />
                                            <span>All Ratings</span>
                                        </label>
                                        <label className="flex items-center gap-2.5 text-xs text-slate-700">
                                            <input
                                                type="radio"
                                                name="rating-select-mobile"
                                                checked={ratingThreshold === 4}
                                                onChange={() => setRatingThreshold(4)}
                                                className="border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
                                            />
                                            <span>4.0★ & above</span>
                                        </label>
                                        <label className="flex items-center gap-2.5 text-xs text-slate-700">
                                            <input
                                                type="radio"
                                                name="rating-select-mobile"
                                                checked={ratingThreshold === 3}
                                                onChange={() => setRatingThreshold(3)}
                                                className="border-slate-300 text-orange-600 focus:ring-orange-500 h-3.5 w-3.5"
                                            />
                                            <span>3.0★ & above</span>
                                        </label>
                                    </div>
                                </div>
                                {/* Apply Button */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleApplyFilters();
                                        setIsMobileFilterOpen(false);
                                    }}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold py-2.5 rounded-sm transition-colors cursor-pointer mt-2"
                                >
                                    Apply Filters
                                </button>

                            </div>

                            {/* Drawer Footer */}
                            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3 shrink-0">
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="flex-1 bg-white text-slate-800 border border-slate-300 text-xs font-bold py-2.5 rounded-sm hover:bg-slate-100 transition-colors"
                                >
                                    Clear All
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="flex-1 bg-orange-600 text-white text-xs font-bold py-2.5 rounded-sm hover:bg-orange-700 transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            <LoginRequiredModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onContinue={() => navigate('/login')}
            />
            <Toast message={toastMessage} onClose={() => setToastMessage("")} />
            <Footer />
        </div>

    );
}
