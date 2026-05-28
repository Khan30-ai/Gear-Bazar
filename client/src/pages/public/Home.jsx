import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ProductCard from '../../components/product/ProductCard';
import { Link, useNavigate } from "react-router-dom";
import BRANDS_DATA from '../../data/cars.json';
import LoginRequiredModal from '../../components/product/LoginRequiredModal';
import Toast from '../../components/ui/Toast';
import { useAuth } from '../../context/AuthContext';

// Custom scrollable dropdown component to handle long option lists
function ScrollableSelect({ id, label, value, onChange, options, placeholder, disabled }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = value || placeholder;

    return (
        <div className="flex flex-col" ref={ref}>
            <label htmlFor={id} className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                {label}
            </label>
            <div className="relative">
                <button
                    type="button"
                    id={id}
                    disabled={disabled}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`w-full text-left bg-slate-50 border border-slate-200 rounded-sm text-sm px-3.5 py-2.5 focus:outline-none focus:border-orange-500 focus:bg-white flex items-center justify-between gap-2 cursor-pointer
                        ${disabled ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : 'text-slate-900'}
                        ${isOpen ? 'border-orange-500 bg-white' : ''}`}
                >
                    <span className={value ? 'text-slate-900' : 'text-slate-400'}>{selectedLabel}</span>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && !disabled && (
                    <ul className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-sm shadow-lg max-h-52 overflow-y-auto">
                        <li>
                            <button
                                type="button"
                                onClick={() => { onChange(''); setIsOpen(false); }}
                                className={`w-full text-left px-3.5 py-2 text-sm hover:bg-orange-50 hover:text-orange-700 transition-colors cursor-pointer
                                    ${!value ? 'bg-orange-50 text-orange-700 font-medium' : 'text-slate-500'}`}
                            >
                                {placeholder}
                            </button>
                        </li>
                        {options.map((opt) => (
                            <li key={opt}>
                                <button
                                    type="button"
                                    onClick={() => { onChange(opt); setIsOpen(false); }}
                                    className={`w-full text-left px-3.5 py-2 text-sm hover:bg-orange-50 hover:text-orange-700 transition-colors cursor-pointer
                                        ${value === opt ? 'bg-orange-50 text-orange-700 font-medium' : 'text-slate-900'}`}
                                >
                                    {opt}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

const CATEGORIES = [
    {
        name: 'Brakes',
        count: '240+ Parts',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="12" cy="12" r="5" strokeWidth="2" />
                <path d="M12 2v3m0 14v3M2 12h3m14 0h3" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    },
    {
        name: 'Clutch',
        count: '180+ Parts',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="8" strokeWidth="2" />
                <path d="M12 6a6 6 0 016 6m-12 0a6 6 0 016-6" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2" strokeWidth="2" />
            </svg>
        )
    },
    {
        name: 'Filters',
        count: '310+ Parts',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="1" strokeWidth="2" />
                <path d="M7 3v18M12 3v18M17 3v18M3 8h18M3 13h18M3 18h18" strokeWidth="1.5" />
            </svg>
        )
    },
    {
        name: 'Electrical',
        count: '420+ Parts',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        name: 'Engine',
        count: '650+ Parts',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="4" y="6" width="16" height="12" rx="1" strokeWidth="2" />
                <path d="M8 6V4h8v2M6 18v2M18 18v2M3 10h1M20 10h1M8 10h8v4H8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        name: 'Ignition',
        count: '150+ Parts',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 2v6M12 22v-6M5 12h6M19 12h-6M6.34 6.34l4.24 4.24M17.66 17.66l-4.24-4.24" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" strokeWidth="2" />
            </svg>
        )
    },
    {
        name: 'Suspension',
        count: '290+ Parts',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 3v18M7 8h10M5 13h14M8 18h8" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 3v5a3 3 0 003 3h0a3 3 0 003-3V3" strokeWidth="1.5" />
            </svg>
        )
    }
];

const PRODUCTS_DATA = [
    {
        _id: '1',
        name: 'Front Brake Pad Set (Premium Ceramic)',
        price: 1850,
        brand: 'Bosch',
        aftermarket: true,
        sellerName: 'Kolkata Spares Hub',
        vehicle: 'Swift (2020-2024)',
        category: 'Brakes',
        partNumber: 'BP-MS-5021',
        stockStatus: 'In Stock',
        imageSvg: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 10c0-3.3 4.03-6 9-6s9 2.7 9 6v4c0 3.3-4.03 6-9 6s-9-2.7-9-6v-4z" strokeWidth="1.5" />
                <path d="M6 10h12v4H6z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            </svg>
        )
    },
    {
        _id: '2',
        name: 'Heavy Duty Clutch Plate & Cover Assembly',
        price: 6400,
        brand: 'Valeo',
        aftermarket: false,
        sellerName: 'Raju Auto Agency',
        vehicle: 'Scorpio (2018-2023)',
        category: 'Clutch',
        partNumber: 'CL-MH-8812',
        stockStatus: 'In Stock',
        imageSvg: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="5" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="12" cy="12" r="2.5" strokeWidth="2" />
            </svg>
        )
    },
    {
        _id: '3',
        name: 'Premium Cabin & Air Filter Combo Kit',
        price: 850,
        brand: 'Mahle',
        aftermarket: true,
        sellerName: 'City Motors & Spares',
        vehicle: 'Creta (2020-2025)',
        category: 'Filters',
        partNumber: 'FL-HY-2340',
        stockStatus: 'In Stock',
        imageSvg: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="4" y="4" width="16" height="16" rx="1" strokeWidth="1.5" />
                <path d="M8 4v16M12 4v16M16 4v16M4 8h16M4 12h16M4 16h16" strokeWidth="1" />
            </svg>
        )
    },
    {
        _id: '4',
        name: '12V B2B Alternator Assembly (90A)',
        price: 8900,
        brand: 'Lucas',
        aftermarket: false,
        sellerName: 'Bengal Automotive',
        vehicle: 'Nexon (2019-2024)',
        category: 'Electrical',
        partNumber: 'EL-TT-3990',
        stockStatus: 'Low Stock',
        imageSvg: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
                <rect x="9" y="3" width="6" height="3" rx="0.5" strokeWidth="1.5" />
                <path d="M12 9v6M9 12h6M16.5 16.5l2 2" strokeWidth="1.5" />
            </svg>
        )
    },
    {
        _id: '5',
        name: 'Engine Cylinder Piston Ring Set',
        price: 3200,
        brand: 'Mahle',
        aftermarket: false,
        sellerName: 'Giri Auto Parts',
        vehicle: 'City (2017-2023)',
        category: 'Engine',
        partNumber: 'EN-HD-9021',
        stockStatus: 'In Stock',
        imageSvg: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="6" y="4" width="12" height="16" rx="1" strokeWidth="1.5" />
                <path d="M6 8h12M6 11h12M6 14h12" strokeWidth="2" />
            </svg>
        )
    },
    {
        _id: '6',
        name: 'Double Platinum Spark Plug Kit (Pack of 4)',
        price: 1150,
        brand: 'NGK',
        aftermarket: true,
        sellerName: 'Howrah Motor House',
        vehicle: 'Swift (2018-2024)',
        category: 'Ignition',
        partNumber: 'IG-MS-0042',
        stockStatus: 'In Stock',
        imageSvg: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="10" y="4" width="4" height="12" rx="0.5" strokeWidth="1.5" />
                <path d="M12 16v4m-2 2h4M9 6h6M8 9h8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        _id: '7',
        name: 'Front Gas Shock Absorber Assembly',
        price: 2800,
        brand: 'Monroe',
        aftermarket: true,
        sellerName: 'Supreme Car Spares',
        vehicle: 'Creta (2020-2024)',
        category: 'Suspension',
        partNumber: 'SP-HY-5520',
        stockStatus: 'In Stock',
        imageSvg: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 4v4m0 8v4M9 8h6M8 10h8v4H8z" strokeWidth="1.5" />
                <path d="M10 14a2 2 0 004 0v-4" strokeWidth="1.5" />
            </svg>
        )
    },
    {
        _id: '8',
        name: 'Waterproof 12V 4-Pin Headlight Relay',
        price: 350,
        brand: 'Minda',
        aftermarket: false,
        sellerName: 'Auto Junction V',
        vehicle: 'Nexon (2020-2025)',
        category: 'Electrical',
        partNumber: 'EL-TT-0199',
        stockStatus: 'In Stock',
        imageSvg: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="5" y="5" width="14" height="14" rx="1" strokeWidth="1.5" />
                <path d="M9 5v14M15 5v14M5 12h14" strokeWidth="1" />
            </svg>
        )
    }
];

export default function Home() {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [searchResultText, setSearchResultText] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        console.log("Added to cart:", product);
        setToastMessage("Added to cart successfully!");
    };

    const handleFitmentSearch = (e) => {
        e.preventDefault();
        if (!selectedBrand || !selectedModel || !selectedYear) {
            setSearchResultText('Please select Brand, Model, and Year.');
            return;
        }
        setSearchResultText(
            `Showing custom fitment catalog for: ${selectedBrand} > ${selectedModel} (${selectedYear})`
        );
    };

    const clearFitmentSearch = () => {
        setSelectedBrand('');
        setSelectedModel('');
        setSelectedYear('');
        setSearchResultText('');
    };

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col font-sans antialiased text-slate-800">

            {/* 1. Header Navigation */}
            <Header />

            {/* 2. Hero Section */}
            <section className="bg-slate-950 text-white py-16 md:py-24 border-b border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                            Find the Right Part for Your Car
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                            Trusted by workshops and garages across Kolkata. Access genuine spares, transparent bulk wholesale rates, and guaranteed fitment.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Vehicle Fitment Search Section */}
            <section className="relative -mt-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="bg-white border border-slate-200 shadow-sm p-5 sm:p-6 rounded-xs">
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-900">
                            Verify Vehicle Compatibility
                        </h2>
                    </div>

                    <form onSubmit={handleFitmentSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* Brand Dropdown */}
                        <ScrollableSelect
                            id="brand-select"
                            label="Select Brand"
                            value={selectedBrand}
                            onChange={(val) => { setSelectedBrand(val); setSelectedModel(''); setSelectedYear(''); }}
                            options={Object.keys(BRANDS_DATA)}
                            placeholder="-- Choose Brand --"
                        />
                        {/* Model Dropdown */}
                        <ScrollableSelect
                            id="model-select"
                            label="Select Model"
                            value={selectedModel}
                            onChange={(val) => { setSelectedModel(val); setSelectedYear(''); }}
                            options={selectedBrand ? Object.keys(BRANDS_DATA?.[selectedBrand] || {}) : []}
                            placeholder="-- Select Model --"
                            disabled={!selectedBrand}
                        />
                        {/* Year Dropdown */}
                        <ScrollableSelect
                            id="year-select"
                            label="Select Year"
                            value={selectedYear}
                            onChange={(val) => setSelectedYear(val)}
                            options={selectedBrand && selectedModel ? [...(BRANDS_DATA?.[selectedBrand]?.[selectedModel] || [])]
                                .map(Number)
                                .sort((a, b) => b - a)
                                : []}
                            placeholder="-- Select Year --"
                            disabled={!selectedBrand || !selectedModel}
                        />
                        {/* Submit Button */}
                        <div className="flex flex-col justify-end">
                            <button
                                type="submit"
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm py-2.5 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search Catalog
                            </button>
                        </div>
                    </form>

                    {/* Fitment Search Results banner */}
                    {searchResultText && (
                        <div className="mt-4 p-3.5 bg-slate-900 border border-slate-800 text-slate-100 text-xs sm:text-sm font-medium flex items-center justify-between gap-4">
                            <span>{searchResultText}</span>
                            <button
                                onClick={clearFitmentSearch}
                                className="text-orange-500 hover:text-orange-400 font-semibold uppercase tracking-wider text-[11px]"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* 4. Trust Strip */}
            <section className="bg-white border-b border-slate-200 py-6 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">

                        {/* Trust item 1 */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Verified Sellers</h4>
                                <p className="text-[10px] text-slate-500">100% Onboarded & Checked</p>
                            </div>
                        </div>

                        {/* Trust item 2 */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Fast Delivery</h4>
                                <p className="text-[10px] text-slate-500">Priority Dispatch Kolkata</p>
                            </div>
                        </div>

                        {/* Trust item 3 */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Secure Payments</h4>
                                <p className="text-[10px] text-slate-500">Safe NEFT / UPI & Credit</p>
                            </div>
                        </div>

                        {/* Trust item 4 */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Genuine Spares</h4>
                                <p className="text-[10px] text-slate-500">100% OEM / OES Brands</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. Browse by Category, whose data is written at the top */}
            <section className="py-16 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-l-4 border-orange-600 pl-3 mb-8">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight uppercase">
                        Browse by Category
                    </h2>

                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {CATEGORIES.map((cat) => (
                        <a
                            key={cat.name}
                            href={`/category/${cat.name.toLowerCase()}`}
                            className="bg-white border border-slate-200 p-5 rounded-sm flex flex-col items-center justify-center text-center hover:border-slate-400 transition-colors duration-200 group"
                        >
                            <div className="text-slate-400 group-hover:text-orange-600 transition-colors duration-200 mb-3.5">
                                {cat.icon}
                            </div>
                            <span className="text-xs font-bold text-slate-900 tracking-tight block">
                                {cat.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium block mt-1">
                                {cat.count}
                            </span>
                        </a>
                    ))}
                </div>
            </section>

            {/* 6. Featured Products */}
            <section className="py-16 bg-white border-y border-slate-200">
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between border-l-4 border-orange-600 pl-3 mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight uppercase">
                                Featured Products
                            </h2>

                        </div>
                        <Link
                            to="/products"
                            className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline tracking-wide uppercase transition-colors"
                        >
                            View All Parts &rarr;
                        </Link>
                    </div>

                    {/* Grid Layout of 8 Products , which is also written above hardcoded */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {PRODUCTS_DATA.map((product) => (
                            <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. How GearBazar Works */}
            <section className="py-16 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">
                        How GearBazar Works
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                    {/* Step 1 */}
                    <div className="bg-white border border-slate-200 p-6 rounded-sm text-center relative">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-950 text-white font-bold text-sm border-4 border-slate-50 flex items-center justify-center rounded-full">
                            1
                        </div>
                        <div className="text-orange-600 flex justify-center mt-3 mb-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wide">1. Search Parts</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Use our smart vehicle fitment engine to locate compatible spares by brand, model, year, or specific part number.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white border border-slate-200 p-6 rounded-sm text-center relative">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-950 text-white font-bold text-sm border-4 border-slate-50 flex items-center justify-center rounded-full">
                            2
                        </div>
                        <div className="text-orange-600 flex justify-center mt-3 mb-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wide">2. Compare Sellers</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Compare transparent B2B price lists, bulk MOQ requirements, and delivery times from multiple verified Indian distributors.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white border border-slate-200 p-6 rounded-sm text-center relative">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-950 text-white font-bold text-sm border-4 border-slate-50 flex items-center justify-center rounded-full">
                            3
                        </div>
                        <div className="text-orange-600 flex justify-center mt-3 mb-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wide">3. Order Easily</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Combine items in your cart, pay securely using UPI, NEFT, or credit terms, and get priority doorstep dispatch.
                        </p>
                    </div>

                </div>
            </section>

            {/* 8. Footer Navigation */}
            <Footer />

            <LoginRequiredModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onContinue={() => navigate("/login")}
            />
            <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        </div>
    );
}
