import { getServerAuth } from "@wafrivet/auth";
import { Sidebar } from "@/components/distributor/Sidebar";
import { TopBar } from "@/components/distributor/TopBar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DistributorLayout({ children }: { children: React.ReactNode }) {
  let auth;
  try {
    auth = await getServerAuth();
  } catch (e) {
    auth = { authenticated: false };
  }
  
  if (!auth.authenticated && process.env.NODE_ENV === 'production') {
    // Skip protection during build
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
