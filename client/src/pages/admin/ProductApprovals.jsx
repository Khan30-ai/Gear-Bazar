export default function ProductApprovals() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Product Approvals</h1>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                <div className="p-8 text-center text-slate-500">
                    <p>Pending products for approval will appear here.</p>
                </div>
            </div>
        </div>
    );
}
