export default function OrdersManage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
                <div className="flex gap-2">
                    <select className="px-3 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                <div className="p-8 text-center text-slate-500">
                    <p>Orders data table will be populated here when the backend API is ready.</p>
                </div>
            </div>
        </div>
    );
}
