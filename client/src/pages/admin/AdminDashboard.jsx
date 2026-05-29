export default function AdminDashboard() {
    const stats = [
        { name: 'Total Orders', value: '1,240', change: '+12%', changeType: 'positive' },
        { name: 'Total Revenue', value: '$45,000', change: '+18%', changeType: 'positive' },
        { name: 'Active Sellers', value: '84', change: '+4', changeType: 'positive' },
        { name: 'Pending Approvals', value: '12', change: '-2', changeType: 'negative' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
                        <p className="text-sm font-medium text-slate-500 mb-1">{stat.name}</p>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-3xl font-bold text-slate-900">{stat.value}</h2>
                            <span className={`text-xs font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-sm p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Inventory Alerts</h3>
                    <div className="text-sm text-slate-500">Low stock monitoring will appear here.</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-sm p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                    <div className="text-sm text-slate-500">System logs and recent orders will appear here.</div>
                </div>
            </div>
        </div>
    );
}
