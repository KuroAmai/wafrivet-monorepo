export default function ChemistDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Chemist Dashboard</h1>
        <button className="bg-purple-800 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-purple-900 transition-colors">
          Add Product
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Orders Today</p>
          <p className="text-2xl font-bold text-gray-900">14</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Revenue Today</p>
          <p className="text-2xl font-bold text-green-600">₦84,500</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Low Stock Alerts</p>
          <p className="text-2xl font-bold text-red-600">3</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Pending Payouts</p>
          <p className="text-2xl font-bold text-gray-900">₦12,000</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[300px] flex items-center justify-center text-gray-400">
          <p>Incoming Orders List</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[300px] flex items-center justify-center text-gray-400">
          <p>Low Stock Alerts & Reorder Suggestions</p>
        </div>
      </div>
    </div>
  );
}
