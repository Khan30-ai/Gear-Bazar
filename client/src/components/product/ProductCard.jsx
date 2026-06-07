import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

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

  const sellerShopName =
    product.sellerId?.shopName ||
    product.shopName ||
    "Verified Seller";

  const discount =
    mrp && mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : 0;
  const navigate = useNavigate();

  const isInCart = cartItems?.some(
    item =>
      item.productId === product._id ||
      item._id === product._id ||
      item.product?._id === product._id
  );

  return (

    <div className="bg-white border border-slate-200 text-slate-900 rounded-md flex flex-col justify-between hover:border-slate-400 transition-colors duration-200">

      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col items-center justify-center relative h-40 rounded-t-md select-none">
          <div className="text-slate-400 w-16 h-16 flex items-center justify-center">
            <img
              src={
                images?.[0] ||
                "https://via.placeholder.com/300x200?text=GearBazar"
              }
              alt={name}
              className="w-full h-full object-contain"
            />
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
            <span
              className={`text-[10px] uppercase px-2 py-0.5 tracking-wide ${partType === "AFTERMARKET"
                ? "text-amber-700 bg-amber-50 border-b-2 border-amber-300"
                : "text-emerald-700 bg-emerald-50 border-b-2 border-emerald-300"
                }`}
            >
              {partType || "OEM"}
            </span>
          </div>

          {/* Part Number */}
          <Link to={`/product/${product._id}`}>
            <p className="text-[11px] text-slate-500 mb-2">
              PART NUMBER{" "}
              <span className="text-[11px] font-bold font-mono text-slate-900 block mb-1.5 md:text-[14px]">
                {partNumber}
              </span>
            </p>

            {/* Part Name - bold */}
            <h4 className="font-bold text-slate-900 text-sm tracking-tight hover:text-orange-600 transition-colors line-clamp-2 min-h-[40px] mb-2.5">
              {name}
            </h4>
          </Link>

          {/*Fitment*/}
          {fitments?.[0] && (
            <p className="text-[11px] text-slate-500 mb-2">
              FITS:{"    "}
              <span className="font-semibold text-slate-800">
                {fitments[0].brand} {fitments[0].model}
              </span>
              {fitments[0].yearFrom && fitments[0].yearTo && (
                <span className="text-slate-400">
                  {" "}
                  ({fitments[0].yearFrom}-{fitments[0].yearTo})
                </span>
              )}
            </p>
          )}

          {/* Seller */}
          <div className="flex items-center gap-1.5 mb-4 text-xs text-slate-500">
            <svg
              className="w-3 h-3 text-slate-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
              />
            </svg>

            <span>{sellerShopName}</span>

            <span className="text-emerald-600 font-medium">
              ✓ Verified
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2.5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">
                  ₹{price?.toLocaleString("en-IN")}
                </span>

                {mrp > price && (
                  <span className="text-xs line-through text-slate-400">
                    ₹{mrp?.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {discount > 0 && (
                <span className="text-[11px] text-emerald-600 font-semibold">
                  {discount}% OFF
                </span>
              )}
            </div>

            <div className="text-right">
              <div
                className={`text-[11px] font-medium ${stock > 0
                  ? "text-emerald-600"
                  : "text-red-600"
                  }`}
              >
                {stock > 0 ? "In Stock" : "Out of Stock"}
              </div>

              {warrantyMonths > 0 && (
                <div className="text-[10px] text-slate-500">
                  {warrantyMonths}M Warranty
                </div>
              )}
            </div>
          </div>

          {/* Add to Cart */}
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
            className={`w-full text-white text-xs font-semibold py-2 px-3 rounded-sm transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${isInCart
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-slate-950 hover:bg-orange-600"
              }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {isInCart ? "Go to Cart →" : "Add to Cart"}
          </button>
        </div>
      </div>

    </div>
  );
}


