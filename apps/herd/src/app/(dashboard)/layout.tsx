import { TopBar } from "@/components/herd/TopBar";
import { BottomNav } from "@/components/herd/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <main className="flex-1 px-6 pb-32">
        {children}
      </main>
      <BottomNav />
    </>
  );
}
