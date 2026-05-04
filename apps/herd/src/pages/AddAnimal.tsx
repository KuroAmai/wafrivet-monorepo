import { CaretLeft, Camera, IdentificationBadge, Tag, MapPin, Check, Tree } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AddAnimal() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedType, setSelectedType] = useState("Bovine");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    setTimeout(() => {
      setIsRegistering(false);
      toast.success("Animal Registered", {
        description: "Livestock has been successfully added to the registry."
      });
      navigate("/animals");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link to="/animals" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Register Animal</h1>
        <div className="w-10" />
      </div>

      <form onSubmit={handleRegister} className="px-6 py-10 space-y-10">
        {/* Photo Upload Placeholder */}
        <div className="flex flex-col items-center">
           <div className="w-32 h-32 bg-white border-4 border-white shadow-2xl rounded-[40px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center text-gray-200 group-hover:bg-gray-100 transition-colors">
                 <Camera size={40} weight="bold" />
              </div>
              <button type="button" className="absolute bottom-0 inset-x-0 py-2 bg-gray-900/80 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 Upload
              </button>
           </div>
           <p className="mt-4 text-[11px] font-black text-gray-300 uppercase tracking-widest">Profile Photo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
           {/* Animal Type Selector */}
           <div className="space-y-4">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Classification</label>
              <div className="flex gap-2">
                 {["Bovine", "Equine", "Ovine", "Caprine"].map((type) => (
                   <button
                     key={type}
                     type="button"
                     onClick={() => setSelectedType(type)}
                     className={cn(
                       "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                       selectedType === type ? "bg-[#2D4D31] text-white shadow-lg" : "bg-white border border-gray-100 text-gray-400"
                     )}
                   >
                     {type}
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Animal Name</label>
              <div className="relative">
                 <IdentificationBadge className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <input 
                   type="text" 
                   placeholder="e.g. Bella, Max, Luna"
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">WAF ID (NFC/Tag)</label>
              <div className="relative">
                 <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <input 
                   type="text" 
                   placeholder="WAF-XXXXX"
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
                 />
                 <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-50 rounded-xl text-[9px] font-black text-[#2D4D31] uppercase tracking-widest hover:bg-gray-100 transition-all">Scan</button>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Primary Breed</label>
              <div className="relative">
                 <Tree className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <input 
                   type="text" 
                   placeholder="e.g. Holstein Friesian"
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Initial Location</label>
              <div className="relative">
                 <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <select 
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm appearance-none"
                 >
                    <option>Lekki Dairy Central</option>
                    <option>Epe Livestock Hub</option>
                    <option>Ogun Green Pastures</option>
                 </select>
              </div>
           </div>
        </div>

        {/* Submit */}
        <button 
          disabled={isRegistering}
          className="w-full p-6 bg-gray-900 text-white rounded-[24px] text-[14px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-gray-900/10 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isRegistering ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Registering...
            </>
          ) : (
            <>
              <Check size={20} weight="bold" />
              Complete Registration
            </>
          )}
        </button>
      </form>
    </div>
  );
}
