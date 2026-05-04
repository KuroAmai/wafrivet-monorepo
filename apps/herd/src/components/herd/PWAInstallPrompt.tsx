import { useState, useEffect } from 'react';
import { DownloadSimple, X, AppWindow } from '@phosphor-icons/react';

export function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setIsVisible(false);
    setInstallPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-28 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-700">
      <div className="bg-white/90 backdrop-blur-xl border border-gray-100 p-4 rounded-[28px] shadow-xl shadow-gray-200/40 flex items-center gap-4">
        {/* Official Brand Logo */}
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 shadow-sm p-2">
           <img src="/logo-mark.svg" alt="Herd Logo" className="w-full h-full object-contain" />
        </div>
        
        {/* Text Area */}
        <div className="flex-1 min-w-0">
           <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1">Install App</h3>
           <p className="text-[11px] font-bold text-gray-400 truncate">For full operational intelligence.</p>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleInstallClick}
          className="px-5 py-2.5 bg-[#2D4D31] text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2"
        >
          <DownloadSimple size={14} weight="bold" />
          Add
        </button>

        {/* Subtle Close */}
        <button 
          onClick={() => setIsVisible(false)}
          className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-900 transition-colors"
        >
          <X size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
