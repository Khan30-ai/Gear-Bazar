import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import {
  Search,
  Package,
  ChevronRight,
  ArrowRight,
  Filter,
  Layers,
  Wrench,
} from 'lucide-react';

const SUGGESTED_CATEGORIES = [
  {
    name: 'Brakes',
    count: '240+',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
        <path d="M12 2v3m0 14v3M2 12h3m14 0h3" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Engine',
    count: '650+',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="4" y="6" width="16" height="12" rx="1" strokeWidth="1.5" />
        <path d="M8 6V4h8v2M6 18v2M18 18v2M8 10h8v4H8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Filters',
    count: '310+',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="1" strokeWidth="1.5" />
        <path d="M7 3v18M12 3v18M17 3v18M3 8h18M3 13h18M3 18h18" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: 'Electrical',
    count: '420+',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'Suspension',
    count: '290+',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 3v18M7 8h10M5 13h14M8 18h8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 3v5a3 3 0 003 3h0a3 3 0 003-3V3" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'Clutch',
    count: '180+',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
        <path d="M12 6a6 6 0 016 6m-12 0a6 6 0 016-6" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const SEARCH_TIPS = [
  { text: 'Use OEM part numbers for exact matches (e.g., 04465-12610)' },
  { text: 'Try the brand name followed by part type (e.g., Bosch Brake Pad)' },
  { text: 'Search by vehicle model for compatible parts (e.g., Swift Dzire)' },
  { text: 'Use broader terms if specific search returns no results' },
];

export default function NoSearchResults({ searchTerm = '' }) {
  // Try to get search term from URL if not passed as prop
  const displayTerm = searchTerm || new URLSearchParams(window.location.search).get('search') || 'your search';

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
            <span className="text-slate-400">No Results</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

          {/* Search Status Bar */}
          <div className="bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <div>
                <span className="text-xs text-slate-400">Search query:</span>
                <span className="text-sm font-bold text-white ml-2">"{displayTerm}"</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-xs font-semibold text-slate-400">0 results found</span>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Main content (2 cols wide) */}
            <div className="lg:col-span-2">

              {/* Empty Shelf Illustration */}
              <div className="bg-white border border-slate-200 rounded-sm overflow-hidden mb-8">
                <div className="p-8 md:p-10 flex flex-col items-center text-center">
                  {/* Toolbox / empty shelf SVG */}
                  <svg
                    viewBox="0 0 360 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full max-w-sm h-auto mb-8"
                  >
                    {/* Grid background */}
                    <pattern id="searchGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
                    </pattern>
                    <rect width="360" height="200" fill="url(#searchGrid)" />

                    {/* Parts shelf unit - completely empty */}
                    {/* Left post */}
                    <rect x="40" y="20" width="6" height="160" rx="1" fill="#334155" />
                    {/* Right post */}
                    <rect x="314" y="20" width="6" height="160" rx="1" fill="#334155" />
                    {/* Middle post */}
                    <rect x="177" y="20" width="6" height="160" rx="1" fill="#334155" />

                    {/* Top shelf */}
                    <rect x="36" y="20" width="288" height="5" rx="1" fill="#475569" />
                    {/* Shelf 2 */}
                    <rect x="36" y="70" width="288" height="5" rx="1" fill="#475569" />
                    {/* Shelf 3 */}
                    <rect x="36" y="120" width="288" height="5" rx="1" fill="#475569" />
                    {/* Bottom shelf */}
                    <rect x="36" y="170" width="288" height="5" rx="1" fill="#475569" />

                    {/* Empty slots - top row */}
                    <rect x="58" y="32" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="120" y="32" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="195" y="32" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="257" y="32" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Empty slots - middle row */}
                    <rect x="58" y="82" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="120" y="82" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="195" y="82" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="257" y="82" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Empty slots - bottom row */}
                    <rect x="58" y="132" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="120" y="132" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="195" y="132" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="257" y="132" width="50" height="30" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Search magnifier overlay */}
                    <circle cx="180" cy="100" r="40" fill="none" stroke="#ea580c" strokeWidth="2" opacity="0.4" />
                    <line x1="208" y1="128" x2="230" y2="150" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" opacity="0.4" />

                    {/* "NO MATCH" text in center */}
                    <text x="180" y="96" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">
                      NO MATCH
                    </text>
                    <text x="180" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">
                      IN INVENTORY
                    </text>

                    {/* Floor line */}
                    <line x1="20" y1="185" x2="340" y2="185" stroke="#cbd5e1" strokeWidth="1" />

                    {/* Shelf label */}
                    <text x="180" y="198" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="600">
                      SEARCH RESULTS: EMPTY
                    </text>
                  </svg>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                    No Parts Match Your Search
                  </h1>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-lg mb-6">
                    We could not find any products in our inventory matching
                    <span className="font-bold text-slate-900"> "{displayTerm}"</span>.
                    Try adjusting your search terms or browse our catalog using the categories below.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link
                      to="/products"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm py-2.5 px-6 rounded-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Layers className="w-4 h-4" />
                      Browse Categories
                    </Link>
                    <Link
                      to="/products"
                      className="bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm py-2.5 px-6 rounded-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      View All Products
                    </Link>
                  </div>
                </div>
              </div>

              {/* Suggested Categories */}
              <div className="border-l-4 border-orange-600 pl-3 mb-5">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase">
                  Browse by Category
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {SUGGESTED_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="bg-white border border-slate-200 p-5 rounded-sm flex flex-col items-center justify-center text-center hover:border-slate-400 transition-colors duration-200 group"
                  >
                    <div className="text-slate-400 group-hover:text-orange-600 transition-colors duration-200 mb-3">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-900 tracking-tight block">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-1">
                      {cat.count} Parts
                    </span>
                  </Link>
                ))}
              </div>

            </div>

            {/* Right Sidebar: Search Guidance */}
            <div className="lg:col-span-1">

              {/* Search Tips Panel */}
              <div className="bg-white border border-slate-200 rounded-sm p-5">
                <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-slate-200">
                  <Wrench className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-black uppercase text-slate-900 tracking-wider">
                    Search Guidance
                  </span>
                </div>

                <div className="space-y-4">
                  {SEARCH_TIPS.map((tip, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 bg-slate-950 text-white text-[10px] font-bold flex items-center justify-center rounded-full flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{tip.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">
                    Example Searches
                  </div>
                  <div className="space-y-2">
                    {['Bosch Brake Pad', '04465-12610', 'Swift Dzire Filter', 'Exide Battery'].map(
                      (term) => (
                        <Link
                          key={term}
                          to={`/products?search=${encodeURIComponent(term)}`}
                          className="flex items-center gap-2 text-xs text-slate-600 hover:text-orange-600 transition-colors font-medium py-1"
                        >
                          <Search className="w-3 h-3 text-slate-400" />
                          {term}
                          <ArrowRight className="w-3 h-3 text-slate-300 ml-auto" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
