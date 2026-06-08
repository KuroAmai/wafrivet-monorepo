import { 
  User, 
  MapPin, 
  Bell, 
  ShieldCheck, 
  SignOut, 
  CaretRight, 
  IdentificationBadge, 
  CloudArrowUp, 
  Info,
  SealCheck,
  Notebook,
  ArrowsClockwise,
  DownloadSimple
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { triggerInstall } from "@/lib/pwaInstall";
import { logoutClient } from "@wafrivet/auth";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Settings() {
  useDocumentTitle("Settings");
  const [isSyncing, setIsSyncing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      {/* Profile Summary Card */}
      <section className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-emerald-50/50 to-transparent" />
        
        <div className="relative mb-6">
           <div className="w-32 h-32 rounded-[40px] border-4 border-white shadow-2xl shadow-gray-200 overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ademola" 
                alt="Dr. Ademola" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
           </div>
           <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#2D4D31] rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg">
              <SealCheck size={20} weight="fill" />
           </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-[24px] font-black text-gray-900 tracking-tight mb-1">Dr. Ademola Adebayo</h1>
          <p className="text-[12px] text-gray-400 font-bold uppercase tracking-[0.2em]">Chief Veterinary Officer</p>
          
          <div className="grid grid-cols-3 gap-8 w-full mt-8 pt-8 border-t border-gray-50">
             <div>
                <p className="text-[18px] font-black text-gray-900">450</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Animals</p>
             </div>
             <div className="border-x border-gray-50">
                <p className="text-[18px] font-black text-gray-900">12</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Farms</p>
             </div>
             <div>
                <p className="text-[18px] font-black text-gray-900">98%</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Uptime</p>
             </div>
          </div>
        </div>
      </section>

      {/* Sync Status / Quick Action */}
      <div className={cn(
        "p-6 rounded-[32px] border transition-all flex items-center justify-between gap-4",
        isSyncing ? "bg-emerald-50 border-emerald-100" : "bg-white border-gray-100 shadow-sm"
      )}>
         <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
              isSyncing ? "bg-emerald-500 text-white animate-spin" : "bg-gray-50 text-gray-400"
            )}>
               <ArrowsClockwise size={24} weight="bold" />
            </div>
            <div>
               <p className="text-[14px] font-black text-gray-900">Local Data Sync</p>
               <p className="text-[11px] font-medium text-gray-400">Last synced 12 mins ago</p>
            </div>
         </div>
         <button 
           onClick={handleSync}
           disabled={isSyncing}
           className="px-6 py-3 bg-gray-900 text-white rounded-xl text-[12px] font-black uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50"
         >
            {isSyncing ? "Syncing..." : "Sync Now"}
         </button>
      </div>

      {/* Menu Groups */}
      <div className="space-y-8">
        {/* Personal Group */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Personal</h3>
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              <Link to="/settings/profile" className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group active:scale-[0.99]">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-blue-50 text-blue-500">
                       <User size={20} weight="bold" />
                    </div>
                    <p className="text-[15px] font-black text-gray-900 leading-none">Profile Information</p>
                 </div>
                 <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link to="/settings/credentials" className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group active:scale-[0.99]">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-emerald-50 text-emerald-500">
                       <IdentificationBadge size={20} weight="bold" />
                    </div>
                    <p className="text-[15px] font-black text-gray-900 leading-none">Medical Credentials</p>
                 </div>
                 <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link to="/settings/farms" className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group active:scale-[0.99]">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-orange-50 text-orange-500">
                       <MapPin size={20} weight="bold" />
                    </div>
                    <p className="text-[15px] font-black text-gray-900 leading-none">Managed Farms</p>
                 </div>
                 <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </Link>
           </div>
        </div>

        {/* System Group */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">System</h3>
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              <Link to="/settings/notifications" className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group active:scale-[0.99]">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-amber-50 text-amber-500">
                       <Bell size={20} weight="bold" />
                    </div>
                    <p className="text-[15px] font-black text-gray-900 leading-none">Notifications</p>
                 </div>
                 <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link to="/settings/security" className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group active:scale-[0.99]">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-purple-50 text-purple-500">
                       <ShieldCheck size={20} weight="bold" />
                    </div>
                    <p className="text-[15px] font-black text-gray-900 leading-none">Security & Biometrics</p>
                 </div>
                 <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link to="/settings/sync" className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group active:scale-[0.99]">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-gray-50 text-gray-500">
                       <CloudArrowUp size={20} weight="bold" />
                    </div>
                    <div className="text-left">
                       <p className="text-[15px] font-black text-gray-900 leading-none">Cloud Synchronization</p>
                       <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Active</p>
                    </div>
                 </div>
                 <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </Link>
           </div>
        </div>

        {/* PWA Group */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">PWA Console</h3>
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              <button 
                onClick={async () => {
                  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
                  if (isIOS) {
                    alert("To install Herd on your iPhone:\n\n1. Tap the 'Share' icon in Safari\n2. Scroll down and tap 'Add to Home Screen'\n3. Tap 'Add' in the top right");
                    return;
                  }

                  const outcome = await triggerInstall();
                  if (outcome === "unavailable") {
                    alert("Install is not available yet. Try again after interacting with the app, or use your browser menu to install.");
                  }
                }}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group active:scale-[0.99]"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-[#2D4D31]/5 text-[#2D4D31]">
                       <DownloadSimple size={20} weight="bold" />
                    </div>
                    <div className="text-left">
                       <p className="text-[15px] font-black text-gray-900 leading-none">Install Application</p>
                       <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Enable Home Screen Access</p>
                    </div>
                 </div>
                 <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </button>
              <Link to="/settings/cache" className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group active:scale-[0.99]">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-gray-50 text-gray-400">
                       <Notebook size={20} weight="bold" />
                    </div>
                    <div className="text-left">
                       <p className="text-[15px] font-black text-gray-900 leading-none">Offline Cache</p>
                       <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">45MB Used</p>
                    </div>
                 </div>
                 <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link to="/settings/about" className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group active:scale-[0.99]">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-gray-50 text-gray-400">
                       <Info size={20} weight="bold" />
                    </div>
                    <div className="text-left">
                       <p className="text-[15px] font-black text-gray-900 leading-none">About Herd Console</p>
                       <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">v1.2.4</p>
                    </div>
                 </div>
                 <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </Link>
           </div>
        </div>
      </div>

      {/* Sign Out */}
      <button
        type="button"
        onClick={() => logoutClient()}
        className="w-full flex items-center justify-center gap-3 p-6 bg-red-50 text-red-500 rounded-[32px] font-black text-[15px] hover:bg-red-100 transition-all active:scale-[0.98] group"
      >
         <SignOut size={20} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
         Sign Out Session
      </button>

      <div className="text-center pb-8 opacity-20 grayscale">
         <img src="/logo-mark.svg" alt="Wafrivet" className="w-8 h-8 mx-auto mb-2" />
         <p className="text-[10px] font-black uppercase tracking-[0.5em]">Herd Console</p>
      </div>
    </div>
  );
}
