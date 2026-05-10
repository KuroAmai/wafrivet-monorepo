import { getServerAuth } from "@wafrivet/auth/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function roleSubtitle(role?: string): string {
  switch (role) {
    case "vet":
      return "VET";
    case "chemist":
      return "CHEMIST";
    case "distributor":
      return "DISTRIBUTOR";
    case "admin":
      return "ADMIN";
    case "farmer":
      return "FARMER";
    default:
      return "ACCOUNT";
  }
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let auth;
  try {
    auth = await getServerAuth();
  } catch {
    auth = { authenticated: false };
  }

  const user = auth.authenticated
    ? (auth as { user?: { name?: string; location?: string } }).user
    : undefined;
  const role = auth.authenticated ? (auth as { role?: string }).role : undefined;

  const fullName = user?.name?.trim() || "Your account";
  const location = user?.location?.trim() || "Nigeria";
  const avatarSrc = `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=b6e3f4`;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <TopBar branchLocation={location} displayName={fullName} avatarSrc={avatarSrc} />
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <Sidebar displayName={fullName} roleSubtitle={roleSubtitle(role)} avatarSrc={avatarSrc} />
          </div>
          <div className="lg:col-span-9">{children}</div>
        </div>
      </main>
    </div>
  );
}
