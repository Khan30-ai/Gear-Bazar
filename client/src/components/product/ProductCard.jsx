import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  const { name, price, brand, aftermarket, imageSvg, category, partNumber, sellerName } = product;

  return (

    <div className="bg-white border border-slate-200 text-slate-900 rounded-md flex flex-col justify-between hover:border-slate-400 transition-colors duration-200">

      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col items-center justify-center relative h-40 rounded-t-md select-none">
          <div className="text-slate-400 w-16 h-16 flex items-center justify-center">
            {imageSvg}
          </div>
          <span className="absolute top-2.5 left-2.5 bg-slate-950 text-white text-[10px] uppercase font-bold px-2.5 py-0.5 tracking-wider rounded-full border border-slate-800">
            {category}
          </span>
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand and OEM/Aftermarket */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span className="text-[10px] text-slate-600 uppercase px-2 py-0.5 bg-slate-50 border-b-2 border-slate-300 tracking-wide">
              {brand || 'Bosch'}
            </span>
            <span className={`text-[10px] uppercase px-2 py-0.5 tracking-wide ${aftermarket
              ? 'text-amber-700 bg-amber-50/60 border-b-2 border-amber-300'
              : 'text-emerald-700 bg-emerald-50/60 border-b-2 border-emerald-300'
              }`}>
              {aftermarket ? 'Aftermarket' : 'OEM'}
            </span>
          </div>

          {/* Part Number */}
          <Link to={`/product/${product._id}`}>
            <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
              {partNumber}
            </span>

            {/* Part Name - bold */}
            <h4 className="font-bold text-slate-900 text-sm tracking-tight hover:text-orange-600 transition-colors line-clamp-2 min-h-[40px] mb-2.5">
              {name}
            </h4>
          </Link>

          {/* Seller */}
          <div className="flex items-center gap-1.5 mb-4 text-xs text-slate-500 px-2 py-1 rounded-sm w-fit">
            <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{sellerName || 'Kolkata Spares Hub'}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2.5 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-slate-500 block leading-none mb-0.5">Unit Price (GST Excl.)</span>
              <span className="text-base font-bold text-slate-900">₹{price.toLocaleString('en-IN')}</span>
            </div>
            <span className="text-[10px] text-slate-400">MOQ: 5 pcs</span>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="w-full bg-slate-950 hover:bg-orange-600 text-white text-xs font-semibold py-2 px-3 rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
}


