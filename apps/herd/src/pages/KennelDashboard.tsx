import { Link } from "react-router-dom";
import { getTerm } from "@wafrivet/utils";
import Dashboard from "./Dashboard";

export default function KennelDashboardPage() {
  const role = "security_company";
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">{getTerm("my_herd", role)}</h1>
        <Link to="/kennel/billing" className="text-sm font-bold text-[#2D4D31]">
          Billing
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center text-sm">
        <div className="bg-white rounded-2xl border p-4">
          <p className="text-gray-400 uppercase text-[10px] tracking-widest">Trial</p>
          <p className="font-black text-lg">Active</p>
        </div>
        <div className="bg-white rounded-2xl border p-4">
          <p className="text-gray-400 uppercase text-[10px] tracking-widest">Dogs</p>
          <p className="font-black text-lg">—</p>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}
