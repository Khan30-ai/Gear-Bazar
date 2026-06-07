import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Toast from '../../components/ui/Toast';

const FAQS = [
  {
    question: "How do I become a seller?",
    answer: "To sell auto-electrical spares on GearBazar, click 'Become a Seller' in the navbar or bottom CTA, register your business profile, and upload your GSTIN and business registration documents. Our admin team will verify and approve your profile within 2-3 business days."
  },
  {
    question: "How are sellers verified?",
    answer: "We run rigorous onboarding audits on all distributors. This includes verifying business registrations, GST compliance, distributor licenses, and warehousing capabilities to ensure only authentic OES/OEM parts are listed on our marketplace."
  },
  {
    question: "How do I place an order?",
    answer: "Browse products, verify compatibility against your vehicles using model and year filters, add the spares to your cart, and proceed to checkout. You can securely pay via NEFT, UPI, net banking, or apply for credit terms if eligible."
  },
  {
    question: "Can I search by part number?",
    answer: "Yes. Our search catalog supports looking up spares by exact OEM, OES, or manufacturer part numbers to guarantee precise compatibility with the vehicle you are repairing."
  },
  {
    question: "How long does seller approval take?",
    answer: "Our admin verification team typically audits and approves new seller registrations within 48 to 72 business hours after all required documents are successfully submitted."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our dedicated B2B support desk via email at support@gearbazar.in or by calling +91 33 4012 3456 between 9:00 AM and 7:00 PM, Monday through Saturday."
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    queryType: 'General Query',
    message: ''
  });

  const [toastMessage, setToastMessage] = useState('');
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setToastMessage('Message sent successfully! Our support team will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      queryType: 'General Query',
      message: ''
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans antialiased text-slate-800">

      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Hero Section */}
      <section className="bg-slate-950 text-white py-16 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase">
              Get In Touch
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
              We are here to support workshops, garages, buyers and sellers across India.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Contact Information Section */}
      <section className="relative -mt-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Email Support */}
          <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-xs flex items-start gap-4 hover:border-orange-500/50 transition-colors duration-200">
            <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Email Support
              </h4>
              <p className="text-xs text-slate-500 mt-1">support@gearbazar.in</p>
            </div>
          </div>

          {/* Card 2: Phone Support */}
          <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-xs flex items-start gap-4 hover:border-orange-500/50 transition-colors duration-200">
            <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Phone Support
              </h4>
              <p className="text-xs text-slate-500 mt-1">+91 33 4012 3456</p>
            </div>
          </div>

          {/* Card 3: Support Hours */}
          <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-xs flex items-start gap-4 hover:border-orange-500/50 transition-colors duration-200">
            <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-orange-600 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Support Hours
              </h4>
              <p className="text-xs text-slate-500 mt-1">Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Contact Form and Office Locations Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-sm shadow-xs">
            <div className="border-l-4 border-orange-600 pl-3 mb-6">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase">
                Send a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 px-3.5 py-2.5 border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 px-3.5 py-2.5 border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phoneNumber" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit phone number"
                    className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 px-3.5 py-2.5 border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="queryType" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                    Query Type
                  </label>
                  <select
                    id="queryType"
                    value={formData.queryType}
                    onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-sm text-sm px-3.5 py-2.5 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="General Query">General Query</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="Seller Support">Seller Support</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 px-3.5 py-2.5 border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs py-3 px-6 rounded-sm transition-colors uppercase tracking-wider cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Office Locations Column */}
          {/* <div className="lg:col-span-5 space-y-6">
            <div className="border-l-4 border-orange-600 pl-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase">
                Office Locations
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 p-5 rounded-sm hover:border-slate-400 transition-colors duration-200">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Kolkata Office
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  Sector V, Salt Lake City, Kolkata, West Bengal 700091
                </p>
                <p className="text-[11px] text-slate-400 font-semibold mt-1">
                  Phone: +91 33 4012 3456
                </p>
              </div>

            </div>
          </div> */}

        </div>
      </section>

      {/* 5. FAQ Accordion Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center uppercase mb-8">
            Frequently Asked Questions
          </h2>

          <div className="border-t border-slate-200">
            {FAQS.map((faq, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <div key={index} className="border-b border-slate-200 py-4">
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between text-left font-bold text-slate-900 text-sm py-2 hover:text-orange-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="mt-2 text-xs text-slate-505 text-slate-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Final Support CTA Section */}
      <section className="py-16 bg-slate-950 text-white text-center border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-white mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-xs text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
            If you have urgent order cancellations, delivery queries, or high-priority catalog issues, contact us directly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 text-sm">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Support Email
              </span>
              <span className="text-orange-500 font-semibold">
                support@gearbazar.in
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Support Phone
              </span>
              <span className="text-orange-500 font-semibold">
                +91 33 4012 3456
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Business Hours
              </span>
              <span className="text-orange-500 font-semibold">
                Mon - Sat: 9:00 AM - 7:00 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer Navigation */}
      <Footer />

      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />

    </div>
  );
}
