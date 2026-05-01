import { getServerAuth } from "@wafrivet/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/chemist/Sidebar";
import { TopBar } from "@/components/chemist/TopBar";

export default async function ChemistLayout({ children }: { children: React.ReactNode }) {
  const auth = await getServerAuth();
  
  if (!auth.authenticated) {
    redirect(process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/login` : "https://app.wafrivet.com/login");
  }

  // Role protection: Only chemists can access this section
  if (auth.role !== "chemist") {
    // If distributor, go to distributor dashboard. Otherwise, go to app root or farmer marketplace (not built yet)
    if (auth.role === "distributor") {
      redirect("/distributor");
    } else {
      redirect(process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com");
    }
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
