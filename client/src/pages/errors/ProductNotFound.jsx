import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import {
  Package,
  Search,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  Clock,
  Tag,
} from 'lucide-react';

const SUGGESTED_CATEGORIES = [
  { name: 'Brakes', count: '240+' },
  { name: 'Clutch', count: '180+' },
  { name: 'Filters', count: '310+' },
  { name: 'Engine', count: '650+' },
  { name: 'Electrical', count: '420+' },
  { name: 'Suspension', count: '290+' },
];

export default function ProductNotFound() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans antialiased text-slate-800">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <nav className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <Link to="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-orange-600 transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-slate-400">Product Not Found</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

          {/* Top Section: Illustration + Info */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-5">

              {/* Left: Blueprint Illustration */}
              <div className="lg:col-span-2 bg-slate-950 p-8 md:p-10 flex items-center justify-center relative overflow-hidden">
                {/* Blueprint grid background */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="blueprintGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blueprintGrid)" />
                  </svg>
                </div>

                <svg
                  viewBox="0 0 280 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-[240px] h-auto relative z-10"
                >
                  {/* Technical drawing - Exploded parts diagram */}
                  {/* Center part outline (the missing part) */}
                  <rect x="94" y="90" width="100" height="70" rx="3" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="6 4" />

                  {/* Crosshairs at center */}
                  <line x1="140" y1="80" x2="140" y2="170" stroke="#475569" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="80" y1="125" x2="200" y2="125" stroke="#475569" strokeWidth="0.5" strokeDasharray="2 2" />

                  {/* Dimension lines - top */}
                  <line x1="90" y1="75" x2="190" y2="75" stroke="#64748b" strokeWidth="0.8" />
                  <line x1="90" y1="72" x2="90" y2="78" stroke="#64748b" strokeWidth="0.8" />
                  <line x1="190" y1="72" x2="190" y2="78" stroke="#64748b" strokeWidth="0.8" />
                  <text x="140" y="72" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
                    100mm
                  </text>

                  {/* Dimension lines - side */}
                  <line x1="205" y1="90" x2="205" y2="160" stroke="#64748b" strokeWidth="0.8" />
                  <line x1="202" y1="90" x2="208" y2="90" stroke="#64748b" strokeWidth="0.8" />
                  <line x1="202" y1="160" x2="208" y2="160" stroke="#64748b" strokeWidth="0.8" />
                  <text x="220" y="128" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace" transform="rotate(90, 220, 128)">
                    70mm
                  </text>

                  {/* Mounting holes */}
                  <circle cx="105" cy="105" r="5" fill="none" stroke="#475569" strokeWidth="1" />
                  <line x1="105" y1="98" x2="105" y2="112" stroke="#475569" strokeWidth="0.5" />
                  <line x1="98" y1="105" x2="112" y2="105" stroke="#475569" strokeWidth="0.5" />

                  <circle cx="175" cy="105" r="5" fill="none" stroke="#475569" strokeWidth="1" />
                  <line x1="175" y1="98" x2="175" y2="112" stroke="#475569" strokeWidth="0.5" />
                  <line x1="168" y1="105" x2="182" y2="105" stroke="#475569" strokeWidth="0.5" />

                  <circle cx="105" cy="145" r="5" fill="none" stroke="#475569" strokeWidth="1" />
                  <line x1="105" y1="138" x2="105" y2="152" stroke="#475569" strokeWidth="0.5" />
                  <line x1="98" y1="145" x2="112" y2="145" stroke="#475569" strokeWidth="0.5" />

                  <circle cx="175" cy="145" r="5" fill="none" stroke="#475569" strokeWidth="1" />
                  <line x1="175" y1="138" x2="175" y2="152" stroke="#475569" strokeWidth="0.5" />
                  <line x1="168" y1="145" x2="182" y2="145" stroke="#475569" strokeWidth="0.5" />

                  {/* Exploded view - top component */}
                  <rect x="100" y="20" width="80" height="30" rx="2" fill="none" stroke="#475569" strokeWidth="1" />
                  <line x1="100" y1="35" x2="180" y2="35" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 2" />
                  <rect x="108" y="25" width="30" height="4" rx="1" fill="#334155" opacity="0.3" />
                  {/* Connection line */}
                  <line x1="140" y1="50" x2="140" y2="80" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 3" />
                  <polygon points="136,78 140,86 144,78" fill="#475569" opacity="0.6" />

                  {/* Exploded view - bottom component */}
                  <rect x="100" y="200" width="80" height="30" rx="2" fill="none" stroke="#475569" strokeWidth="1" />
                  <line x1="100" y1="215" x2="180" y2="215" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 2" />
                  <rect x="108" y="205" width="30" height="4" rx="1" fill="#334155" opacity="0.3" />
                  {/* Connection line */}
                  <line x1="140" y1="170" x2="140" y2="195" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 3" />
                  <polygon points="136,197 140,203 144,197" fill="#475569" opacity="0.6" />

                  {/* Exploded view - left component */}
                  <rect x="10" y="105" width="40" height="40" rx="2" fill="none" stroke="#475569" strokeWidth="1" />
                  <circle cx="30" cy="125" r="10" fill="none" stroke="#334155" strokeWidth="0.8" />
                  <circle cx="30" cy="125" r="4" fill="none" stroke="#334155" strokeWidth="0.5" />
                  {/* Connection line */}
                  <line x1="52" y1="125" x2="82" y2="125" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 3" />
                  <polygon points="84,121 92,125 84,129" fill="#475569" opacity="0.6" />

                  {/* Exploded view - right component */}
                  <rect x="230" y="105" width="40" height="40" rx="2" fill="none" stroke="#475569" strokeWidth="1" />
                  <rect x="240" y="115" width="20" height="20" rx="1" fill="none" stroke="#334155" strokeWidth="0.8" />
                  <line x1="240" y1="125" x2="260" y2="125" stroke="#334155" strokeWidth="0.5" />
                  <line x1="250" y1="115" x2="250" y2="135" stroke="#334155" strokeWidth="0.5" />
                  {/* Connection line */}
                  <line x1="198" y1="125" x2="225" y2="125" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 3" />
                  <polygon points="196,121 188,125 196,129" fill="#475569" opacity="0.6" />

                  {/* "UNAVAILABLE" stamp */}
                  <rect x="99" y="112" width="90" height="24" rx="2" fill="none" stroke="#ea580c" strokeWidth="2" transform="rotate(-8, 140, 124)" />
                  <text x="145" y="128" textAnchor="middle" fill="#ea580c" fontSize="11" fontWeight="800" fontFamily="monospace" letterSpacing="2" transform="rotate(-8, 140, 124)">
                    UNAVAILABLE
                  </text>

                  {/* Part number reference */}
                  <text x="140" y="265" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">
                    REF: PART-NOT-FOUND
                  </text>
                  <text x="140" y="278" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
                    DWG NO. GB-ERR-002
                  </text>

                  {/* Drawing border */}
                  <rect x="2" y="2" width="276" height="296" rx="0" fill="none" stroke="#475569" strokeWidth="0.5" />

                  {/* Title block */}
                  <rect x="2" y="250" width="276" height="48" fill="none" stroke="#475569" strokeWidth="0.5" />
                  <line x1="140" y1="250" x2="140" y2="298" stroke="#475569" strokeWidth="0.5" />
                </svg>

                {/* Label */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Technical Reference Drawing
                  </span>
                </div>
              </div>

              {/* Right: Product Status */}
              <div className="lg:col-span-3 p-8 md:p-10">
                {/* Status badge */}
                <div className="flex items-center gap-2 mb-5">
                  <ShieldAlert className="w-4 h-4 text-orange-600" />
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">
                    Product Unavailable
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                  This Part Could Not Be Located
                </h1>

                <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-lg">
                  The product you are looking for may have been discontinued, delisted by the seller,
                  or the product ID is invalid. This can occur when a part is removed from a seller's
                  active inventory.
                </p>

                {/* Possible Reasons */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-sm mb-6">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">
                    Possible Reasons
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      { icon: <Package className="w-3.5 h-3.5" />, text: 'Product has been delisted or discontinued' },
                      { icon: <Clock className="w-3.5 h-3.5" />, text: 'Listing expired and was removed by the seller' },
                      { icon: <Tag className="w-3.5 h-3.5" />, text: 'Product ID or SKU is invalid or malformed' },
                      { icon: <ShieldAlert className="w-3.5 h-3.5" />, text: 'Listing was removed during quality review' },
                    ].map((reason, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-slate-600">
                        <span className="text-slate-400">{reason.icon}</span>
                        {reason.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Link
                    to="/products"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm py-2.5 px-6 rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Browse Similar Parts
                  </Link>
                  <Link
                    to="/products"
                    className="bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm py-2.5 px-6 rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    View All Products
                  </Link>
                </div>

                {/* Contact support */}
                <p className="text-xs text-slate-400">
                  Need help locating a specific part?{' '}
                  <Link to="/contact" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                    Contact our support team
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Browse Categories Section */}
          <div className="border-l-4 border-orange-600 pl-3 mb-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase">
              Browse by Category Instead
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SUGGESTED_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="bg-white border border-slate-200 p-5 rounded-sm flex flex-col items-center justify-center text-center hover:border-slate-400 transition-colors duration-200 group"
              >
                <div className="text-slate-400 group-hover:text-orange-600 transition-colors duration-200 mb-3">
                  {/* Category icon */}
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-900 tracking-tight block">
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block mt-1">
                  {cat.count} Parts
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-600 mt-2 transition-colors" />
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
