import { useState, useEffect } from 'react';
import { DownloadSimple, X, DeviceMobile, AppWindow } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(e);
      // Show the install banner
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    // Show the install prompt
    installPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
      setIsVisible(false);
    } else {
      console.log('User dismissed the PWA install prompt');
    }

    setInstallPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-32 left-6 right-6 z-50 animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-gray-900 text-white p-6 rounded-[32px] shadow-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} weight="bold" />
        </button>

        <div className="flex items-start gap-5">
          <div className="w-14 h-14 bg-emerald-500/20 rounded-[24px] flex items-center justify-center shrink-0 border border-emerald-500/30">
            <AppWindow size={32} weight="fill" className="text-emerald-400" />
          </div>
          <div className="flex-1 pr-6">
            <h3 className="text-[16px] font-black leading-tight mb-1">Install Herd Console</h3>
            <p className="text-[12px] font-medium text-white/60">Get the full operational experience with offline access and instant updates.</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button 
            onClick={handleInstallClick}
            className="flex-1 py-4 bg-white text-gray-900 rounded-2xl text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <DownloadSimple size={18} weight="bold" />
            Install App
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="px-6 py-4 bg-white/10 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
