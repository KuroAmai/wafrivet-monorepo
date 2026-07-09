import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";
import FarmersPage from "./pages/FarmersPage";
import VetsPage from "./pages/VetsPage";
import SuppliersPage from "./pages/SuppliersPage";
import InvestorsPage from "./pages/InvestorsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiesPage from "./pages/CookiesPage";
import ToolsOverviewPage from "./pages/ToolsOverviewPage";
import TeamPage from "./pages/TeamPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className={`${isLandingPage ? "" : "max-w-[1440px] mx-auto shadow-2xl"} min-h-screen relative w-full bg-background flex flex-col`}>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/farmers" element={<FarmersPage />} />
          <Route path="/vets" element={<VetsPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/tools" element={<ToolsOverviewPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/referral" element={<ComingSoon />} />
          <Route path="/riders" element={<ComingSoon />} />
          <Route path="/careers" element={<ComingSoon />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
