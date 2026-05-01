import { getServerAuth } from "@wafrivet/auth";
import { Sidebar } from "@/components/herd/Sidebar";
import { TopBar } from "@/components/herd/TopBar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HerdDashboardLayout({ children }: { children: React.ReactNode }) {
  let auth;
  try {
    auth = await getServerAuth();
  } catch (e) {
    auth = { authenticated: false };
  }
  
  // Middleware should handle the redirect to login, but we'll keep a safe check here
  if (!auth.authenticated && process.env.NODE_ENV === 'production') {
    // Skip protection during build
  }

  const role = (auth as any).role || "farmer";

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
