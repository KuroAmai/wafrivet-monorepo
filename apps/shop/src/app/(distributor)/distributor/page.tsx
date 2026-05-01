export default function DistributorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Network Overview</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors">
          Create Shipment
        </button>
      </div>

      {/* Map Placeholder */}
      <div className="bg-slate-200 rounded-xl h-[300px] flex items-center justify-center border border-slate-300">
        <p className="text-slate-500 font-medium text-sm">Geographic Network Map Placeholder</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Total Chemists</p>
          <p className="text-2xl font-bold text-slate-900">42</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Active Shipments</p>
          <p className="text-2xl font-bold text-indigo-600">8</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Total Demand</p>
          <p className="text-2xl font-bold text-slate-900">1,204 units</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Stockout Risks</p>
          <p className="text-2xl font-bold text-rose-600">5</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-6 min-h-[300px] flex items-center justify-center text-slate-400">
          <p>Chemist Network Table with Stock Status</p>
        </div>
        <div className="col-span-1 bg-white rounded-xl border border-slate-200 p-6 min-h-[300px] flex items-center justify-center text-slate-400">
          <p>Pending Shipments List</p>
        </div>
      </div>
    </div>
  );
}
