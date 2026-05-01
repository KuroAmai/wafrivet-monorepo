import { getServerAuth } from "@wafrivet/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/herd/Sidebar";
import { TopBar } from "@/components/herd/TopBar";

export default async function HerdDashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await getServerAuth();
  
  if (!auth.authenticated) {
    redirect(process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/login` : "https://app.wafrivet.com/login");
  }

  // Role protection: Only farmers and vets can access the herd app
  if (auth.role !== "farmer" && auth.role !== "vet") {
    redirect(process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.wafrivet.com");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
