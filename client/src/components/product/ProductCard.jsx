import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductCard({
  product,
  onAddToCart,
  cartItems = [],
  addedSet = new Set()
}) {
  const {
    name,
    price,
    mrp,
    brand,
    partType,
    category,
    partNumber,
    stock,
    warrantyMonths,
    fitments,
    images
  } = product;

  const sellerShopName = product.sellerId?.shopName || product.shopName || "Verified Seller";
  const discount = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const navigate = useNavigate();

  const isInCart = cartItems?.some(
    item =>
      item.productId === product._id ||
      item._id === product._id ||
      item.product?._id === product._id
  );

  return (
    <div className="group bg-white border border-slate-200 text-slate-900 rounded-lg flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden">

      {/* Product Image Section */}
      <Link to={`/product/${product._id}`} className="block relative select-none">
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col items-center justify-center h-44 relative overflow-hidden">
          <img
            src={images?.[0] || "https://via.placeholder.com/300x200?text=GearBazar"}
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
          />
          <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] uppercase font-bold px-2 py-0.5 tracking-wider rounded">
            {category}
          </span>
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Badge & Part Type Row */}
          <div className="flex items-center justify-between gap-1.5 mb-2">
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 tracking-wide rounded ${partType === "AFTERMARKET"
                  ? "text-amber-800 bg-amber-50 border border-amber-200"
                  : "text-emerald-800 bg-emerald-50 border border-emerald-200"
                }`}
            >
              {partType || "OEM"}
            </span>
          </div>

          {/* Part Number & Title */}
          <Link to={`/product/${product._id}`} className="block group/title">
            <p className="text-[11px] font-semibold text-slate-400 tracking-tight uppercase mb-0.5">
              Part Number: <span className="font-mono text-slate-700 font-bold">{partNumber}</span>
            </p>
            <h4 className="font-bold text-slate-900 text-sm tracking-tight group-hover/title:text-orange-600 transition-colors line-clamp-2 min-h-[40px] mb-2">
              {name}
            </h4>
          </Link>

          {/* Fitment Specifications */}
          <div className="min-h-[20px] mb-2">
            {fitments?.[0] && (
              <p className="text-[11px] text-slate-500 truncate">
                <span className="font-medium text-slate-400 uppercase mr-1">Fits:</span>
                <span className="font-semibold text-slate-800">
                  {fitments[0].brand} {fitments[0].model}
                </span>
                {fitments[0].yearFrom && fitments[0].yearTo && (
                  <span className="text-slate-400 font-medium">
                    {" "}
                    ({fitments[0].yearFrom}-{fitments[0].yearTo})
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Trust Badge & Seller Info */}
          <div className="flex items-center justify-between border-t border-slate-50 pt-2 mb-3 text-xs">
            <div className="flex items-center gap-1 text-slate-500 truncate max-w-[70%]">
              <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
              <span className="truncate">{sellerShopName}</span>
            </div>
            <div className="flex items-center gap-0.5 text-emerald-600 font-semibold text-[11px] flex-shrink-0">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Verified
            </div>
          </div>
        </div>

        {/* Pricing Layout Block */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-end justify-between mb-3 min-h-[38px]">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  ₹{price?.toLocaleString("en-IN")}
                </span>
                {mrp > price && (
                  <span className="text-xs line-through text-slate-400">
                    ₹{mrp?.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <div className="min-h-[16px]">
                {discount > 0 && (
                  <span className="text-[11px] text-emerald-600 font-bold tracking-wide">
                    {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            <div className="text-right flex flex-col items-end">
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${stock > 0 ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                }`}>
                {stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              <div className="min-h-[14px] mt-0.5">
                {warrantyMonths > 0 && (
                  <span className="text-[10px] font-medium text-slate-500">
                    {warrantyMonths}M Warranty
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isInCart) {
                navigate("/cart");
                return;
              }
              onAddToCart?.(product);
            }}
            className={`w-full text-white text-xs font-bold py-2.5 px-4 rounded-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${isInCart
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-slate-900 hover:bg-orange-600"
              }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {isInCart ? "Go to Cart →" : "Add to Cart"}
          </button>
        </div>
      </div>

    </div>
  );
}