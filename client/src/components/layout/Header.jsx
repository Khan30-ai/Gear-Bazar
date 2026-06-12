import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";
import api from "../../services/api";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth(); // user null hai toh logged out
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  const role = user?.roles?.includes("admin")
    ? "admin"
    : user?.roles?.includes("seller")
      ? "seller"
      : "buyer";

  const displayName =
    role === "admin"
      ? "System Administrator"
      : user?.name || "User";

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Clicked:", event.target);

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        console.log("Outside click detected");
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (!debouncedQuery || debouncedQuery.length < 2) {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }

        const response = await api.get(
          `/products/suggestions?q=${encodeURIComponent(debouncedQuery)}`
        );

        setSuggestions(response.data.suggestions || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Suggestions Error:", err);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
    console.log("API HIT", debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    setShowSuggestions(false);
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };


  return (
    <nav className="bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          <a href="/" className="flex items-center group">
            <img
              src="/logo-navbar.png"
              alt="GearBazar"
              className="w-44 md:w-64 h-auto"
            />
          </a>

          {/* Center: Search Bar */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-md lg:max-w-lg mx-4 relative">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Part or Part No..."
                className="w-full bg-slate-900 text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2 border border-slate-800 rounded-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm transition-all"
              />
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-0.5 bg-white border-x border-b border-slate-200 rounded-b-sm shadow-xl overflow-hidden z-50">

                  {/* Header */}
                  <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Search Suggestions
                    </p>
                  </div>

                  {/* Suggestions */}
                  {suggestions.length > 0 ? (
                    <>
                      {suggestions.map((item) => (
                        <button
                          key={item._id}
                          type="button"
                          onClick={() => {
                            setShowSuggestions(false);
                            setSearchQuery(item.name);
                            navigate(
                              `/products?search=${encodeURIComponent(item.name)}`
                            );
                          }}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-200 transition-colors border-b border-slate-100 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            {/* Search Icon */}
                            <div className="flex-shrink-0">
                              <svg
                                className="w-4 h-4 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>

                            {/* Text */}
                            <div className="text-left">
                              <div className="text-sm font-medium text-slate-900">
                                {item.name}
                              </div>

                              <div className="text-xs text-slate-500">
                                {item.brand} • {item.partNumber}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}

                      {/* View All */}
                      <button
                        type="button"
                        onClick={() => {
                          setShowSuggestions(false);
                          navigate(
                            `/products?search=${encodeURIComponent(searchQuery)}`
                          );
                        }}
                        className="w-full px-4 py-3 text-left bg-slate-50 hover:bg-slate-200 text-orange-600 text-sm font-medium"
                      >
                        View all results for "{searchQuery}" →
                      </button>
                    </>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="text-slate-400 mb-2">
                        <svg
                          className="w-8 h-8 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>

                      <p className="text-sm font-medium text-slate-700">
                        No matching parts found
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        Try part number, brand name, or category
                      </p>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Right Side: Links & CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-5 text-sm font-medium">
              <NavLink to="/" className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold"
                  : "text-slate-300 hover:text-orange-500"
              }>Home</NavLink>
              <NavLink to="/about" className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold"
                  : "text-slate-300 hover:text-orange-500"}>About Us</NavLink>
              <NavLink to="/contact" className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold"
                  : "text-slate-300 hover:text-orange-500"}>Contact Us</NavLink>
            </div>

            <span className="h-5 w-[1px] bg-slate-800" />

            <div className="flex items-center gap-4">

              {/* Become a Seller */}
              {user && !user.roles?.includes('seller') && !user.roles?.includes('admin') && (
                <a
                  href="/become-seller"
                  className="text-sm font-semibold text-orange-500 hover:text-white border border-orange-500/40 hover:bg-orange-600 hover:border-orange-600 px-4.5 py-1.5 rounded-sm transition-all tracking-wide"
                >
                  Become a Seller
                </a>
              )}

              {/* Auth Section */}
              {user ? (
                // Logged IN — profile icon + logout
                <div className="flex items-center gap-3">
                  <a href="/cart" className="p-1.5 text-slate-300 hover:text-white relative transition-colors" aria-label="Cart">
                    <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="absolute -top-0.5 -right-0.5 bg-orange-600 text-white font-semibold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-slate-950">
                      {cartCount}
                    </span>
                  </a>
                  <div className="relative" ref={profileRef}>
                    <button
                      type="button"
                      onClick={() => setShowProfileMenu(prev => !prev)}
                      className="p-2 border border-slate-800 hover:border-slate-700 rounded-sm text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Profile"
                    >
                      <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </button>
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50">
                        <div className="p-4 border-b border-slate-800">
                          <p className="text-white font-semibold">
                            {displayName}
                          </p>
                          <p className="text-xs text-slate-400 capitalize mt-1">
                            {role}
                          </p>
                        </div>

                        <div className="py-2">
                          {role === "buyer" && (
                            <>
                              <button
                                onClick={() => navigate('/profile')}
                                className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800">
                                My Profile
                              </button>

                              <button
                                onClick={() => navigate('/orders')}
                                className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800">
                                My Orders
                              </button>
                            </>
                          )}

                          {role === "seller" && (
                            <>
                              <button
                                onClick={() => navigate('/seller')}
                                className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800">
                                Seller Dashboard
                              </button>

                              <button
                                onClick={() => navigate('/profile')}
                                className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800">
                                My Profile
                              </button>
                            </>
                          )}

                          {role === "admin" && (
                            <>
                              <button
                                onClick={() => navigate('/admin')}
                                className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800">
                                Admin Dashboard
                              </button>

                              <button
                                onClick={() => navigate('/profile')}
                                className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800">
                                My Profile
                              </button>
                            </>
                          )}

                          <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800"
                          >
                            Logout
                          </button>

                        </div>
                      </div>
                    )}
                  </div>

                  {/* <button
                    onClick={logout}
                    className="bg-slate-800 text-white hover:bg-slate-700 text-sm font-semibold px-4 py-1.5 rounded-sm transition-colors cursor-pointer"
                  >
                    Logout
                  </button> */}
                </div>
              ) : (
                // Logged OUT — login + signup
                <div className="flex items-center gap-3">

                  <a
                    href="/login"
                    className="bg-slate-800 text-white hover:bg-slate-700 text-sm font-semibold px-4 py-1.5 rounded-sm transition-colors"
                  >
                    Login
                  </a>

                  <a
                    href="/signup"
                    className="bg-orange-600 text-white hover:bg-orange-500 text-sm font-semibold px-4 py-1.5 rounded-sm transition-colors"
                  >
                    Sign Up
                  </a>

                </div>
              )}
            </div>
          </div>

          {/* Right Side: Controls (Tablet/Mobile) */}
          <div className="flex lg:hidden items-center gap-3">
            <a href="/cart" className="p-1.5 text-slate-300 hover:text-white relative transition-colors" aria-label="Cart">
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 bg-orange-600 text-white font-semibold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-slate-950">
                {cartCount}
              </span>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t border-slate-800/60 px-4 py-3 bg-slate-950/80">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4.5 w-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Parts"
            className="w-full bg-slate-900 text-slate-100 placeholder-slate-400 pl-9 pr-4 py-2 border border-slate-800 rounded-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm transition-all"
          />
        </form>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-3">
          <div className="flex flex-col gap-2">
            <a href="/" className="block px-3 py-2 rounded-sm text-sm font-medium text-orange-500 bg-slate-900/60">Home</a>
            <a href="/about" className="block px-3 py-2 rounded-sm text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900">About Us</a>
            <a href="/contact" className="block px-3 py-2 rounded-sm text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900">Contact Us</a>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2.5">

            {/* Become a Seller — mobile */}
            {(!user || !user.roles?.includes('seller')) && (
              <a
                href="/become-seller"
                className="block w-full text-center text-sm font-semibold text-orange-500 border border-orange-500/40 hover:bg-orange-600 hover:border-orange-600 hover:text-white py-2 rounded-sm transition-all"
              >
                Become a Seller
              </a>
            )}

            {user ? (
              // Logged IN mobile
              <div className="bg-slate-900 border border-slate-800 rounded-sm p-3">

                <div className="mb-3">
                  <p className="text-white font-semibold">
                    {displayName}
                  </p>

                  <p className="text-xs text-slate-400 capitalize">
                    {role}
                  </p>
                </div>

                <div className="flex flex-col gap-1">

                  {role === "buyer" && (
                    <>
                      <button
                        onClick={() => navigate("/profile")}
                        className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-sm"
                      >
                        My Profile
                      </button>

                      <button
                        onClick={() => navigate("/orders")}
                        className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-sm"
                      >
                        My Orders
                      </button>
                    </>
                  )}

                  {role === "seller" && (
                    <>
                      <button
                        onClick={() => navigate("/seller")}
                        className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-sm"
                      >
                        Seller Dashboard
                      </button>

                      <button
                        onClick={() => navigate("/profile")}
                        className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-sm"
                      >
                        My Profile
                      </button>
                    </>
                  )}

                  {role === "admin" && (
                    <>
                      <button
                        onClick={() => navigate("/admin")}
                        className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-sm"
                      >
                        Admin Dashboard
                      </button>

                      <button
                        onClick={() => navigate("/profile")}
                        className="text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-sm"
                      >
                        My Profile
                      </button>
                    </>
                  )}

                  <button
                    onClick={logout}
                    className="text-left px-3 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-sm"
                  >
                    Logout
                  </button>

                </div>
              </div>
            ) : (
              // Logged OUT mobile
              <div className="flex items-center gap-3">

                <a
                  href="/login"
                  className="flex-1 text-center bg-slate-800 text-white hover:bg-slate-700 text-sm font-semibold py-2 rounded-sm transition-colors"
                >
                  Login
                </a>

                <a
                  href="/signup"
                  className="flex-1 text-center bg-orange-600 text-white hover:bg-orange-500 text-sm font-semibold py-2 rounded-sm transition-colors"
                >
                  Sign Up
                </a>

              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}