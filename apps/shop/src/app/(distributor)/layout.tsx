import { getServerAuth } from "@wafrivet/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/distributor/Sidebar";
import { TopBar } from "@/components/distributor/TopBar";

export default async function DistributorLayout({ children }: { children: React.ReactNode }) {
  const auth = await getServerAuth();
  
  if (!auth.authenticated) {
    redirect(process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/login` : "https://app.wafrivet.com/login");
  }

  // Role protection: Only distributors can access this section
  if (auth.role !== "distributor") {
    if (auth.role === "chemist") {
      redirect("/dashboard");
    } else {
      redirect(process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com");
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
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
