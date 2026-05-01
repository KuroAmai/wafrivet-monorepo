import { getServerAuth } from "@wafrivet/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HerdDashboardPage() {
  let auth;
  try {
    auth = await getServerAuth();
  } catch (e) {
    auth = { authenticated: false };
  }
  
  const role = (auth as any).role || "farmer";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {role === "vet" ? "Veterinary Dashboard" : "My Herd"}
        </h1>
        {role === "farmer" && (
          <button className="bg-[#2D4D31] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#243f28] transition-colors">
            Generate Report
          </button>
        )}
      </div>

      {/* Stats row */}
      {role === "farmer" ? (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Animals</p>
            <p className="text-2xl font-bold text-gray-900">124</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Healthy</p>
            <p className="text-2xl font-bold text-green-600">118</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">At Risk</p>
            <p className="text-2xl font-bold text-orange-500">4</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Flagged</p>
            <p className="text-2xl font-bold text-red-600">2</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Flagged Patients</p>
            <p className="text-2xl font-bold text-red-600">8</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Pending Diagnoses</p>
            <p className="text-2xl font-bold text-orange-500">3</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Recent Visits</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[400px] flex items-center justify-center text-gray-400">
        <p>
          {role === "vet" 
            ? "Flagged patients list will appear here." 
            : "Animal grid will appear here."}
        </p>
      </div>
    </div>
  );
}
