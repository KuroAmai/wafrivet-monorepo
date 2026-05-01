import { getServerAuth } from "@wafrivet/auth";
import { Sidebar } from "@/components/chemist/Sidebar";
import { ShopNavbar } from "@/components/layout/ShopNavbar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ChemistLayout({ children }: { children: React.ReactNode }) {
  let auth;
  try {
    auth = await getServerAuth();
  } catch (e) {
    auth = { authenticated: false };
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <ShopNavbar />
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
