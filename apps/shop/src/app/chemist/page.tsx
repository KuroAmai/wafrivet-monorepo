import { ChemistDashboardView } from "@/components/chemist/ChemistDashboardView";
import { Sidebar } from "@/components/chemist/Sidebar";
import { TopBar } from "@/components/chemist/TopBar";

export const dynamic = "force-dynamic";

export default function ChemistRoutePage() {
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
