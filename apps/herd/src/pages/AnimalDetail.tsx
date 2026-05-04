import { CaretLeft, Heartbeat, Thermometer, Scales, Calendar, Syringe, ClipboardText, WarningCircle, ShareNetwork } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function AnimalDetail() {
  const { id } = useParams();

  // Mock data for the animal
  const animal = {
    id: id || "WAF-882",
    name: "Bella",
    breed: "Holstein Friesian",
    age: "4.2 Years",
    gender: "Female",
    status: "Healthy",
    weight: "580kg",
    temp: "38.5°C",
    lastCheck: "Yesterday",
    image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=300&auto=format&fit=crop",
    vitals: [
      { label: "Heart Rate", value: "72 bpm", status: "normal", icon: Heartbeat },
      { label: "Temp", value: "38.5°C", status: "normal", icon: Thermometer },
      { label: "Weight", value: "580 kg", status: "stable", icon: Scales },
    ],
    history: [
      { date: "May 12, 2026", event: "Routine Vaccination", provider: "Dr. Ademola", type: "medical" },
      { date: "Apr 28, 2026", event: "Weight Check", provider: "Automated System", type: "check" },
      { date: "Apr 15, 2026", event: "Mild Fever Alert", provider: "AI Monitor", type: "warning" },
    ]
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link to="/" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Animal Profile</h1>
        <button className="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-900">
           <ShareNetwork size={20} weight="bold" />
        </button>
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Profile Card */}
        <div className="flex flex-col items-center">
           <div className="relative group">
              <div className="w-40 h-40 rounded-[48px] border-4 border-white shadow-2xl overflow-hidden">
                 <img src={animal.image} alt={animal.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-4 border-white shadow-lg">
                 {animal.status}
              </div>
           </div>
           <div className="mt-6 text-center">
              <h2 className="text-[28px] font-black text-gray-900 leading-tight">{animal.name}</h2>
              <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">{animal.id} • {animal.breed}</p>
           </div>
        </div>

        {/* Live Vitals Grid */}
        <div className="grid grid-cols-3 gap-3">
           {animal.vitals.map((vital, i) => (
             <div key={i} className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                   <vital.icon size={20} weight="bold" />
                </div>
                <div>
                   <p className="text-[14px] font-black text-gray-900">{vital.value}</p>
                   <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{vital.label}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Quick Specs */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden p-8 grid grid-cols-2 gap-8">
           <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                 <Calendar size={14} /> Age
              </p>
              <p className="text-[15px] font-bold text-gray-900">{animal.age}</p>
           </div>
           <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                 <ClipboardText size={14} /> Gender
              </p>
              <p className="text-[15px] font-bold text-gray-900">{animal.gender}</p>
           </div>
        </div>

        {/* Health Timeline */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Health History</h3>
           <div className="space-y-3">
              {animal.history.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-[#2D4D31]/10 transition-all">
                   <div className={cn(
                     "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                     item.type === "medical" ? "bg-blue-50 text-blue-500" : 
                     item.type === "warning" ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400"
                   )}>
                      {item.type === "medical" ? <Syringe size={24} weight="bold" /> : 
                       item.type === "warning" ? <WarningCircle size={24} weight="bold" /> : <ClipboardText size={24} weight="bold" />}
                   </div>
                   <div className="flex-1">
                      <h4 className="text-[15px] font-black text-gray-900">{item.event}</h4>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{item.provider} • {item.date}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <Link 
             to={`/animal/${id}/add-record`}
             className="flex items-center justify-center p-5 bg-gray-900 text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all"
           >
              Add Record
           </Link>
           <button className="p-5 bg-emerald-50 text-[#2D4D31] rounded-[24px] text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all">
              Assign Tag
           </button>
        </div>
      </div>
    </div>
  );
}
