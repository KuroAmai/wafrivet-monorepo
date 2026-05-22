import { CaretLeft, MapPin, DeviceMobile, Info, CheckCircle, ShareNetwork, DownloadSimple } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";

export default function HistoryDetail() {
  const { id } = useParams();

  // Mock data fetching based on ID
  const event = {
    id,
    type: "Animal Scan",
    target: "Bella (WAF-882)",
    time: "Today, 10:42 AM",
    location: "Lekki Dairy Central • Section B",
    device: "iPhone 15 Pro (Admin Console)",
    status: "Verified & Synced",
    coordinates: "6.4654° N, 3.4064° E",
    details: [
      { label: "Scan Method", value: "NFC Passive Tag" },
      { label: "Signal Strength", value: "-42 dBm (Excellent)" },
      { label: "Data Size", value: "128 KB" },
      { label: "Sync Latency", value: "450ms" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link to="/history" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Event Detail</h1>
        <button className="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-900">
           <ShareNetwork size={20} weight="bold" />
        </button>
      </div>

      <div className="px-6 py-10 space-y-8">
        {/* Event Status Card */}
        <div className="bg-[#2D4D31] p-8 rounded-[40px] text-white space-y-6 shadow-xl shadow-emerald-900/10">
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-[24px] flex items-center justify-center">
                 <CheckCircle size={32} weight="fill" className="text-emerald-400" />
              </div>
              <div>
                 <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">{event.type}</p>
                 <h2 className="text-[20px] font-black leading-tight">{event.target}</h2>
              </div>
           </div>
           
           <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Status</p>
                 <p className="text-[14px] font-bold">{event.status}</p>
              </div>
              <div className="space-y-1 text-right">
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Timestamp</p>
                 <p className="text-[14px] font-bold">{event.time}</p>
              </div>
           </div>
        </div>

        {/* Telemetry Details */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Telemetry Data</h3>
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden p-8 space-y-6">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                    <MapPin size={20} weight="bold" />
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Origin Location</p>
                    <p className="text-[14px] font-bold text-gray-900">{event.location}</p>
                    <p className="text-[11px] font-medium text-gray-400 mt-0.5">{event.coordinates}</p>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                    <DeviceMobile size={20} weight="bold" />
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Access Device</p>
                    <p className="text-[14px] font-bold text-gray-900">{event.device}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Technical Specs */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Technical Specs</h3>
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              {event.details.map((detail, i) => (
                <div key={i} className="flex items-center justify-between p-6">
                   <p className="text-[13px] font-black text-gray-400 uppercase tracking-widest">{detail.label}</p>
                   <p className="text-[14px] font-bold text-gray-900">{detail.value}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3">
           <button className="flex items-center justify-center gap-2 p-5 bg-gray-900 text-white rounded-[24px] text-[13px] font-black uppercase tracking-widest active:scale-95 transition-all">
              <DownloadSimple size={20} weight="bold" />
              Download Audit PDF
           </button>
           <button className="flex items-center justify-center gap-2 p-5 bg-white border border-gray-100 text-gray-400 rounded-[24px] text-[13px] font-black uppercase tracking-widest active:scale-95 transition-all">
              <Info size={20} weight="bold" />
              Flag Discrepancy
           </button>
        </div>
      </div>
    </div>
  );
}
