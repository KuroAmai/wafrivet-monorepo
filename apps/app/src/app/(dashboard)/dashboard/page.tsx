import { getServerAuth } from "@wafrivet/auth";
import Link from "next/link";
import { ArrowRight, Plant, Pill, Truck } from "@phosphor-icons/react";

export default async function DashboardPage() {
  const auth = await getServerAuth();
  
  // Provide a fallback in case role is somehow missing
  const role = auth.role || "farmer";

  const getRoleBadge = (role: string) => {
    const badges: Record<string, { label: string, bg: string, text: string }> = {
      farmer: { label: "Farmer", bg: "bg-green-100", text: "text-green-800" },
      vet: { label: "Veterinarian", bg: "bg-blue-100", text: "text-blue-800" },
      chemist: { label: "Chemist", bg: "bg-purple-100", text: "text-purple-800" },
      distributor: { label: "Distributor", bg: "bg-orange-100", text: "text-orange-800" },
    };
    const b = badges[role] || badges.farmer;
    return <span className={`px-2.5 py-1 rounded-full text-[12px] font-semibold ${b.bg} ${b.text}`}>{b.label}</span>;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {auth.user?.name || "Emeka"}</h1>
          <div className="mt-2">{getRoleBadge(role)}</div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Wallet Balance</p>
          <p className="text-2xl font-bold text-gray-900">₦24,500.00</p>
        </div>
      </div>

      {/* Quick Links Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {(role === "farmer" || role === "vet") && (
            <Link href={process.env.NEXT_PUBLIC_HERD_URL || "https://herd.wafrivet.com"} className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-[#2D4D31] hover:shadow-sm transition-all group">
              <div className="w-12 h-12 bg-[#f0f4f0] rounded-lg flex items-center justify-center text-[#2D4D31] mb-4">
                <Plant size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Manage Herd</h3>
              <p className="text-sm text-gray-500 mb-4">View your animals, log events, and track health.</p>
              <div className="flex items-center text-[#2D4D31] font-medium text-sm group-hover:translate-x-1 transition-transform">
                Go to Herd App <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          )}

          {(role === "chemist" || role === "distributor" || role === "farmer") && (
            <Link href={process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.wafrivet.com"} className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-[#2D4D31] hover:shadow-sm transition-all group">
              <div className="w-12 h-12 bg-[#f0f4f0] rounded-lg flex items-center justify-center text-[#2D4D31] mb-4">
                {role === "distributor" ? <Truck size={24} /> : <Pill size={24} />}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{role === "distributor" ? "Distributor Network" : "Marketplace"}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {role === "farmer" ? "Buy medicine, vaccines, and equipment." : "Manage inventory, orders, and sales."}
              </p>
              <div className="flex items-center text-[#2D4D31] font-medium text-sm group-hover:translate-x-1 transition-transform">
                Go to Shop App <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}
