import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans antialiased text-slate-800">

      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Hero Section */}
      <section className="bg-slate-950 text-white py-20 md:py-28 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight uppercase">
              Building Trust in Auto Parts Procurement
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Helping workshops, garages and mechanics source the right auto-electrical spare parts from verified sellers across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="/products"
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs py-3 px-6 rounded-sm transition-colors uppercase tracking-wider cursor-pointer"
              >
                Browse Products
              </a>
              <a
                href="/become-seller"
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-800 font-semibold text-xs py-3 px-6 rounded-sm transition-colors uppercase tracking-wider cursor-pointer"
              >
                Become a Seller
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Story Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

            {/* Left Column: Heading and Accent */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-2">
                Our Story
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                Bridging the Gap in India's Auto Parts Market
              </h2>
              <div className="w-12 h-1 bg-orange-600 mt-4 rounded-full"></div>
            </div>

            {/* Right Column: Narrative content */}
            <div className="lg:col-span-7 space-y-6 text-sm text-slate-600 leading-relaxed">
              <p>
                As an Electrical Engineering student with a strong interest in software development, I spent time observing the auto-electrical spare parts market around me. One thing that stood out was how workshops, mechanics, and spare parts dealers still relied heavily on offline networks. Every day, people would travel from shop to shop, take orders manually, and spend hours searching for the right electrical spare parts.

                <p>That raised a simple question: if almost every industry is moving online, why is sourcing auto-electrical spare parts still so fragmented?</p>
              </p>
              <p>
                GearBazar was born from that question. Starting from Kolkata and with a vision to serve customers across India, our goal is to simplify how vehicle owners, workshops, garages, and verified sellers connect with each other. We want buyers to find the right parts quickly, sellers to reach more customers, and workshops to source components with greater confidence.
                <p>Today, GearBazar is being built with a simple mission: to make auto-electrical spare parts procurement more transparent, accessible, and efficient for everyone involved in the automotive ecosystem.</p>
              </p>
              <p>
                Instead of relying on endless phone calls and physical visits, GearBazar aims to bring part discovery, seller verification, and product approvals into a single trusted platform. Every seller and product goes through an approval process to help maintain quality and reliability within the marketplace.
              </p>
              <p>Founded by Md Arshi Khan, GearBazar represents the intersection of engineering, technology, and entrepreneurship—built with the belief that even traditional industries deserve modern digital solutions.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Mission & Vision Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Mission Card */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-sm hover:border-orange-500/50 transition-colors duration-300 flex flex-col">
              <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center rounded-sm text-orange-600 mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Mission
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                To empower workshops, garages, and mechanics with reliable, direct access to verified auto-electrical spares across India, reducing logistics delays and eliminating fitment errors.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-sm hover:border-orange-500/50 transition-colors duration-300 flex flex-col">
              <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center rounded-sm text-orange-600 mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Vision
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                To build India's most trusted B2B auto-electrical parts supply ecosystem, standardizing parts compatibility and pricing for every workshop from metro hubs to remote towns.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Why GearBazar Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-2">
              Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Why GearBazar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Feature 1 */}
            <div className="bg-white border border-slate-200 p-6 rounded-sm hover:border-slate-400 transition-colors duration-200 flex flex-col">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Verified Sellers
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Every vendor undergoes rigorous background checks and onboarding procedures to ensure high quality and genuine parts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-slate-200 p-6 rounded-sm hover:border-slate-400 transition-colors duration-200 flex flex-col">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Part Number Search
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Instantly lookup parts using exact OEM, OES, or manufacturer part numbers to eliminate compatibility guesswork.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-slate-200 p-6 rounded-sm hover:border-slate-400 transition-colors duration-200 flex flex-col">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Vehicle Fitment Support
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Verify compatibility using our extensive database of Indian cars, models, and production years before placing orders.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-slate-200 p-6 rounded-sm hover:border-slate-400 transition-colors duration-200 flex flex-col">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-5 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Admin Approved Listings
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                All product listings are manually audited and approved by our catalog specialists to confirm technical details and specifications.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Marketplace Statistics Section */}
      <section className="py-16 bg-slate-950 text-white border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

            {/* Stat 1 */}
            <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">
                5,000+
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">
                Parts Listed
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">
                500+
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">
                Workshops Served
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">
                100+
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">
                Verified Sellers
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">
                99%
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">
                Order Accuracy
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Future Roadmap Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-2">
              Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Future Roadmap
            </h2>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-10 py-2 max-w-3xl mx-auto">

            {/* Milestone 1 */}
            <div className="relative pl-6 sm:pl-8">
              <div className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full bg-orange-600 border-2 border-slate-50"></div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                More Sellers
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Onboarding additional OES and OEM distributors across auto-electrical manufacturing clusters in India to broaden parts diversity and stock options.
              </p>
            </div>

            {/* Milestone 2 */}
            <div className="relative pl-6 sm:pl-8">
              <div className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full bg-orange-600 border-2 border-slate-50"></div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Faster Delivery Network
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Establishing streamlined logistics routing and localized distribution center hubs to guarantee same-day or next-day shipping in major auto markets.
              </p>
            </div>

            {/* Milestone 3 */}
            <div className="relative pl-6 sm:pl-8">
              <div className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full bg-orange-600 border-2 border-slate-50"></div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Better Search
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Upgrading search engines with fuzzy intelligence, vehicle compatibility suggestions, and smart OES cross-referencing capabilities.
              </p>
            </div>

            {/* Milestone 4 */}
            <div className="relative pl-6 sm:pl-8">
              <div className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full bg-orange-600 border-2 border-slate-50"></div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Nationwide Expansion
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Extending support and verification structures to connect over 50,000 workshops, retailers, and distributors in smaller Tier-2 and Tier-3 Indian cities by 2027.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="py-16 bg-white border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">
            Join India's Growing Auto Parts Network
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
            Whether you are a garage owner looking for reliable spares or a distributor looking to expand your digital B2B reach, GearBazar is your platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/products"
              className="bg-slate-950 hover:bg-slate-900 text-white font-semibold text-xs py-3 px-6 rounded-sm transition-colors uppercase tracking-wider cursor-pointer"
            >
              Browse Products
            </a>
            <a
              href="/become-seller"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs py-3 px-6 rounded-sm transition-colors uppercase tracking-wider cursor-pointer"
            >
              Become a Seller
            </a>
          </div>
        </div>
      </section>

      {/* 9. Footer Navigation */}
      <Footer />

    </div>
  );
}
