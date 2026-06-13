import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMySellerProfile } from '../../services/seller.service';

export default function SellerLayout() {
    const { logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [seller, setSeller] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const data = await getMySellerProfile();
                setSeller(data);
            }
            catch (err) {
                console.error(err);
            }
        };
        if (user?.roles?.includes("seller")) {

            fetchSeller();
        }
    }, [user]);

    const navItems = [
        { name: 'Dashboard', path: '/seller', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { name: 'My Products', path: '/seller/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { name: 'Orders', path: '/seller/orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-950 text-slate-300 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">

                    <h1 className="text-lg font-semibold tracking-wide text-white truncate">

                        {seller?.shopName || ""}

                    </h1>

                </div>
                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors ${location.pathname === item.path ? 'bg-orange-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-sm hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium cursor-pointer">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-slate-950 text-slate-300 z-50 transform transition-transform duration-300 md:hidden flex flex-col
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="h-16 flex items-center px-6 bg-slate-900"></div> {/*Mobile header space*/}
                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors ${location.pathname === item.path ? 'bg-orange-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-sm hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium cursor-pointer">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="relative z-[60] h-16 bg-slate-950 border-b border-slate-800 flex items-center px-6 lg:px-8 shadow-sm justify-between">
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-slate-300 hover:text-white"
                        >
                            {sidebarOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>

                        <div className="h-16 flex items-center px-6 border-b border-slate-800">

                            <h1 className="text-lg font-semibold tracking-wide text-white truncate">

                                {seller?.shopName || ""}

                            </h1>

                        </div>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <Link to="/" className="text-sm font-medium text-slate-400 hover:text-orange-600 transition-colors">Back to Store</Link>
                    </div>
                </header>
                <div className="flex-1 p-6 lg:p-8 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
