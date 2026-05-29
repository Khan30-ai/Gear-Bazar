export default function UserManage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="px-3 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 w-64"
                />
            </div>
            
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                <div className="p-8 text-center text-slate-500">
                    <p>Registered users list and role management will appear here.</p>
                </div>
            </div>
        </div>
    );
}
