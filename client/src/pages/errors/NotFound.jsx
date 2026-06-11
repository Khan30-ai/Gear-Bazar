import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import {
  ArrowLeft,
  Home,
  Package,
  Search,
  ChevronRight,
  MapPin,
} from 'lucide-react';

export default function NotFound() {
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
            <span className="text-slate-400">Page Not Found</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Content */}
            <div className="order-2 lg:order-1">
              {/* Error Code Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                  Error 404
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Route Not Found in
                <br />
                <span className="text-orange-600">Inventory System</span>
              </h1>

              <p className="text-sm text-slate-500 leading-relaxed max-w-lg mb-8">
                The page you are looking for does not exist in our parts catalog system. 
                This may have been moved, removed, or the URL was entered incorrectly. 
                Please verify the address or navigate back to a valid section.
              </p>

              {/* Diagnostic Info Box */}
              <div className="bg-white border border-slate-200 p-4 rounded-sm mb-8">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">
                  Diagnostic Information
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Requested Path</span>
                    <span className="font-mono text-slate-900 bg-slate-50 px-2 py-0.5 border border-slate-100 text-[11px]">
                      {window.location.pathname}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Status</span>
                    <span className="text-red-600 font-semibold">Not Found</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Resolution</span>
                    <span className="text-slate-700 font-medium">Navigate to valid route</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm py-2.5 px-6 rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
                <Link
                  to="/products"
                  className="bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm py-2.5 px-6 rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  Browse Parts
                </Link>
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">
                  Common Destinations
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Products Catalog', to: '/products' },
                    { label: 'About GearBazar', to: '/about' },
                    { label: 'Contact Support', to: '/contact' },
                    { label: 'Become a Seller', to: '/become-seller' },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-xs text-slate-600 hover:text-orange-600 font-medium flex items-center gap-1 py-1 transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Warehouse Illustration */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Warehouse Rack SVG */}
                <svg
                  viewBox="0 0 400 360"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto"
                >
                  {/* Background grid - warehouse floor */}
                  <pattern id="warehouseGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                  </pattern>
                  <rect width="400" height="360" fill="url(#warehouseGrid)" opacity="0.5" />

                  {/* Main rack - vertical posts */}
                  <rect x="60" y="40" width="8" height="280" rx="1" fill="#334155" />
                  <rect x="180" y="40" width="8" height="280" rx="1" fill="#334155" />
                  <rect x="300" y="40" width="8" height="280" rx="1" fill="#334155" />

                  {/* Shelf 1 */}
                  <rect x="56" y="100" width="256" height="6" rx="1" fill="#475569" />
                  {/* Shelf 2 */}
                  <rect x="56" y="180" width="256" height="6" rx="1" fill="#475569" />
                  {/* Shelf 3 */}
                  <rect x="56" y="260" width="256" height="6" rx="1" fill="#475569" />
                  {/* Top bar */}
                  <rect x="56" y="40" width="256" height="6" rx="1" fill="#475569" />

                  {/* Parts on shelves - Top shelf */}
                  {/* Box 1 */}
                  <rect x="78" y="60" width="35" height="36" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1="78" y1="72" x2="113" y2="72" stroke="#e2e8f0" strokeWidth="1" />
                  <rect x="85" y="64" width="20" height="4" rx="1" fill="#e2e8f0" />

                  {/* Empty slot with dashed outline (missing part!) */}
                  <rect x="125" y="60" width="35" height="36" rx="2" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
                  <text x="142.5" y="82" textAnchor="middle" fill="#ea580c" fontSize="10" fontWeight="700">?</text>

                  {/* Box 3 */}
                  <rect x="218" y="60" width="35" height="36" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1="218" y1="72" x2="253" y2="72" stroke="#e2e8f0" strokeWidth="1" />
                  <rect x="225" y="64" width="20" height="4" rx="1" fill="#e2e8f0" />

                  {/* Box 4 */}
                  <rect x="265" y="60" width="35" height="36" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1="265" y1="72" x2="300" y2="72" stroke="#e2e8f0" strokeWidth="1" />
                  <rect x="272" y="64" width="20" height="4" rx="1" fill="#e2e8f0" />

                  {/* Middle shelf */}
                  {/* Box */}
                  <rect x="78" y="115" width="35" height="58" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <rect x="85" y="120" width="20" height="4" rx="1" fill="#e2e8f0" />
                  <rect x="85" y="128" width="15" height="3" rx="1" fill="#f1f5f9" />

                  {/* Cylinder (filter) */}
                  <ellipse cx="150" cy="165" rx="14" ry="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <rect x="136" y="125" width="28" height="40" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <ellipse cx="150" cy="125" rx="14" ry="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1="140" y1="135" x2="160" y2="135" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="140" y1="145" x2="160" y2="145" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Empty slot 2 (missing!) */}
                  <rect x="195" y="120" width="50" height="52" rx="2" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
                  <text x="220" y="150" textAnchor="middle" fill="#ea580c" fontSize="10" fontWeight="700">404</text>

                  {/* Small box */}
                  <rect x="265" y="140" width="35" height="32" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <rect x="272" y="145" width="20" height="4" rx="1" fill="#e2e8f0" />

                  {/* Bottom shelf */}
                  {/* Large box */}
                  <rect x="78" y="198" width="50" height="55" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <rect x="85" y="204" width="35" height="5" rx="1" fill="#e2e8f0" />
                  <rect x="85" y="214" width="25" height="3" rx="1" fill="#f1f5f9" />
                  <rect x="85" y="222" width="30" height="3" rx="1" fill="#f1f5f9" />

                  {/* Gear icon on box */}
                  <circle cx="103" cy="240" r="8" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                  <circle cx="103" cy="240" r="3" fill="none" stroke="#cbd5e1" strokeWidth="1" />

                  {/* Box */}
                  <rect x="148" y="210" width="35" height="42" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <rect x="155" y="216" width="20" height="4" rx="1" fill="#e2e8f0" />

                  {/* Empty slot 3 */}
                  <rect x="200" y="200" width="35" height="52" rx="2" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Box */}
                  <rect x="252" y="200" width="48" height="52" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <rect x="260" y="206" width="32" height="5" rx="1" fill="#e2e8f0" />
                  <rect x="260" y="216" width="22" height="3" rx="1" fill="#f1f5f9" />

                  {/* Rack labels */}
                  <text x="128" y="330" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="600">
                    RACK-A
                  </text>
                  <text x="252" y="330" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="600">
                    RACK-B
                  </text>

                  {/* Floor line */}
                  <line x1="30" y1="320" x2="370" y2="320" stroke="#cbd5e1" strokeWidth="1.5" />

                  {/* Location marker on empty slot */}
                  <g transform="translate(125, 48)">
                    <path d="M17.5 -8 L17.5 -2 L21 -2 L14 8 L7 -2 L10.5 -2 L10.5 -8 Z" fill="#ea580c" opacity="0.9" />
                  </g>
                </svg>

                {/* Status badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white border border-slate-200 px-4 py-3 rounded-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                      Location Not Mapped
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Requested route does not exist in the system directory
                  </p>
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
