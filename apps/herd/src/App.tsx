import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/herd/TopBar";
import { BottomNav } from "@/components/herd/BottomNav";
import { PWAInstallPrompt } from "@/components/herd/PWAInstallPrompt";

// Pages
import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";
import AIList from "./pages/AIList";
import Scan from "./pages/Scan";
import Settings from "./pages/Settings";
import ChatDetail from "./pages/ChatDetail";
import Profile from "./pages/Profile";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";
import AnimalDetail from "./pages/AnimalDetail";
import AddRecord from "./pages/AddRecord";
import HealthAlerts from "./pages/HealthAlerts";
import AnimalList from "./pages/AnimalList";
import AddAnimal from "./pages/AddAnimal";
import FarmPortal from "./pages/FarmPortal";
import Login from "./pages/Login";
import { RequireAuth } from "@/components/RequireAuth";

function AppContent() {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLogin = location.pathname === "/login";

  if (isLogin) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <RequireAuth>
      <TopBar />
      <main className="flex-1 px-6 pb-32">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/ai" element={<AIList />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai/:id" element={<ChatDetail />} />
          <Route path="/settings/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<HistoryDetail />} />
          <Route path="/animal/:id" element={<AnimalDetail />} />
          <Route path="/animal/:id/add-record" element={<AddRecord />} />
          <Route path="/alerts" element={<HealthAlerts />} />
          <Route path="/animals" element={<AnimalList />} />
          <Route path="/animals/add" element={<AddAnimal />} />
          <Route path="/farms/:id/portal" element={<FarmPortal />} />
          {/* Fallback for other routes */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
      <BottomNav />
      <PWAInstallPrompt />
    </RequireAuth>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
