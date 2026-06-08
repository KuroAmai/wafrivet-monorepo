import { useState, useEffect } from 'react';
import { DownloadSimple, X, Export, PlusSquare } from '@phosphor-icons/react';
import {
  clearDeferredInstallPrompt,
  setDeferredInstallPrompt,
  triggerInstall,
} from '@/lib/pwaInstall';

export function PWAInstallPrompt() {
  const [canInstall, setCanInstall] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredInstallPrompt(event);
      setCanInstall(true);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      clearDeferredInstallPrompt();
      setCanInstall(false);
      setIsVisible(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (isIOSDevice && !window.matchMedia('(display-mode: standalone)').matches) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const outcome = await triggerInstall();
    if (outcome === 'accepted') {
      setIsVisible(false);
      setCanInstall(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-28 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-700">
      <div className="bg-white/90 backdrop-blur-xl border border-gray-100 p-4 rounded-[28px] shadow-xl shadow-gray-200/40 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 shadow-sm p-2">
           <img src="/logo-mark.svg" alt="Herd Logo" className="w-full h-full object-contain" />
        </div>
        
        <div className="flex-1 min-w-0">
           <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1">
             {isIOS ? 'Install Herd' : 'Install App'}
           </h3>
           <p className="text-[11px] font-bold text-gray-400 truncate">
             {isIOS ? 'Tap Share > Add to Home Screen' : 'For full operational intelligence.'}
           </p>
        </div>

        <div className="flex items-center gap-2">
          {isIOS ? (
            <div className="flex items-center gap-2 pr-2">
               <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                  <Export size={16} weight="bold" />
               </div>
               <div className="w-8 h-8 bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center">
                  <PlusSquare size={16} weight="bold" />
               </div>
            </div>
          ) : (
            <button 
              onClick={handleInstallClick}
              disabled={!canInstall}
              className="px-5 py-2.5 bg-[#2D4D31] text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <DownloadSimple size={14} weight="bold" />
              Add
            </button>
          )}

          <button 
            onClick={() => setIsVisible(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-900 transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
