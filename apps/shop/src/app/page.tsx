import { getServerAuth } from "@wafrivet/auth";
import { MarketplaceView } from "@/components/shop/MarketplaceView";
import { ChemistDashboardView } from "@/components/chemist/ChemistDashboardView";
import { Sidebar } from "@/components/chemist/Sidebar";
import { TopBar } from "@/components/chemist/TopBar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShopHome(props: { searchParams: Promise<{ role?: string }> }) {
  const searchParams = await props.searchParams;
  let auth;
  try {
    auth = await getServerAuth();
  } catch (e) {
    auth = { authenticated: false, user: null };
  }

  // Allow role override via search params for demonstration/onboarding testing
  const userRole = searchParams.role || (auth.user as any)?.role || "customer";

  if (userRole === "chemist") {
    return (
      <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
            <ChemistDashboardView />
          </main>
        </div>
      </div>
    );
  }

  return <MarketplaceView />;
}
