"use client";

import { 
  CaretLeft, 
  ShieldCheck, 
  IdentificationCard, 
  FileSearch, 
  Files, 
  CheckCircle, 
  XCircle, 
  User, 
  MapPin, 
  Storefront, 
  Calendar,
  SealCheck,
  Warning,
  Eye,
  DownloadSimple,
  ArrowRight,
  DotsThreeVertical,
  Briefcase,
  Certificate
} from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getChemistData = (id: string) => {
  return {
    id: id || "CHM-881",
    name: "Lekki Pharma",
    proprietor: "Dr. Sarah Ahmed",
    appliedDate: "May 12, 2024",
    location: "Lagos Island, Nigeria",
    status: "Awaiting Verification",
    documents: [
      { name: "NAFDAC License", status: "Verified", date: "May 12", type: "PDF" },
      { name: "Pharmacist Council Registration", status: "Pending", date: "May 12", type: "PDF" },
      { name: "Business Incorporation (CAC)", status: "Verified", date: "May 11", type: "PDF" },
      { name: "Pharmacy Layout Plan", status: "In Review", date: "May 12", type: "DOCX" },
    ],
    stats: {
      profileComplete: "85%",
      verificationStep: "Step 3 of 4",
      trustScore: "B+"
    }
  };
};

export default function ChemistVerificationPage({ params }: { params: { id: string } }) {
  const data = getChemistData(params.id);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Back Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link 
          href="/admin" 
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <div className="w-10 h-10 rounded-2xl border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all bg-white/50">
            <CaretLeft size={20} weight="bold" />
          </div>
          <span className="text-[12px] font-black uppercase tracking-[0.2em]">Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all shadow-sm">
            <XCircle size={18} weight="bold" /> Reject Application
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#2D4D31] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#2D4D31]/10 ml-2">
            <CheckCircle size={18} weight="bold" /> Approve Access
          </button>
        </div>
      </div>

      {/* Verification Pulse Header */}
      <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-32 h-32 rounded-[40px] bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner border border-emerald-100">
            <Storefront size={64} weight="duotone" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-500 border border-blue-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                Compliance Review
              </span>
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <SealCheck size={12} weight="fill" /> {data.stats.verificationStep}
              </span>
            </div>
            <h1 className="text-[42px] font-black text-gray-900 tracking-tight leading-none mb-3">{data.name}</h1>
            <p className="text-[16px] text-gray-500 font-medium">{data.location} · Registered by {data.proprietor}</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Completion</span>
            <div className="text-[32px] font-black text-emerald-500 tracking-tight leading-none">{data.stats.profileComplete}</div>
            <div className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-widest text-right">Data Points Verified</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Document Review Column */}
        <div className="lg:col-span-8 space-y-10">
          {/* Document List */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">Compliance Documentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.documents.map((doc, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-[32px] border border-gray-50 hover:border-[#2D4D31]/20 transition-all group cursor-pointer relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] shadow-sm transition-all">
                      <Certificate size={24} weight="bold" />
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                      doc.status === "Verified" ? "bg-emerald-50 text-emerald-500 border-emerald-100" : 
                      doc.status === "Pending" ? "bg-orange-50 text-orange-500 border-orange-100" : 
                      "bg-blue-50 text-blue-500 border-blue-100"
                    )}>
                      {doc.status}
                    </span>
                  </div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-1">{doc.name}</h4>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{doc.type} • Updated {doc.date}</span>
                    <button className="flex items-center gap-1.5 text-[10px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline">
                      <Eye size={14} /> Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Assessment */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">Operational Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Business Tier</span>
                <p className="text-[18px] font-bold text-gray-900">Retail Chemist</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-1 rounded-full bg-emerald-500" />)}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-x border-gray-50 px-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Zone Risk</span>
                <p className="text-[18px] font-bold text-emerald-500 uppercase">Low Risk</p>
                <span className="text-[11px] font-bold text-gray-400">Lagos North Hub</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Credit Limit</span>
                <p className="text-[18px] font-bold text-gray-900">₦250,000</p>
                <span className="text-[11px] font-bold text-gray-400 italic">Initial Tier</span>
              </div>
            </div>
          </div>

          {/* Verification Log */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">Verification Audit Log</h3>
            <div className="space-y-8">
              {[
                { label: "Application Submitted", time: "May 12, 09:00", actor: "Lekki Pharma", icon: Calendar },
                { label: "CAC Verification Passed", time: "May 12, 11:30", actor: "System Agent", icon: ShieldCheck },
                { label: "NAFDAC Docs Verified", time: "May 12, 14:45", actor: "Admin Sarah", icon: IdentificationCard },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-[#2D4D31] group-hover:text-white transition-all">
                    <log.icon size={20} weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900 leading-none mb-1">{log.label}</h4>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{log.time} · {log.actor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Panel Column */}
        <div className="lg:col-span-4 space-y-10">
          {/* Proprietor Snapshot */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-gray-400">Licensed Professional</h3>
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-[24px] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 overflow-hidden shadow-inner">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4`} alt="Sarah" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-[18px] font-black text-gray-900 tracking-tight leading-none mb-1">{data.proprietor}</h4>
                <p className="text-[10px] text-[#2D4D31] font-black uppercase tracking-widest">Licensed Pharmacist</p>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <IdentificationCard size={18} /> View PCN License
              </button>
              <button className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <Briefcase size={18} /> Professional History
              </button>
            </div>
          </div>

          {/* Marketplace SOPs */}
          <div className="bg-[#2D4D31] p-8 rounded-[40px] text-white shadow-xl shadow-[#2D4D31]/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-white/40">Marketplace SOPs</h3>
            <div className="space-y-2">
              {[
                { icon: FileSearch, text: "Request More Docs" },
                { icon: MapPin, text: "Schedule Site Visit" },
              ].map((btn, i) => (
                <button key={i} className="w-full py-3.5 bg-white/5 hover:bg-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-start px-5 gap-3">
                  <btn.icon size={18} /> {btn.text}
                </button>
              ))}
              <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all mt-4">
                Fast-Track Approval
              </button>
            </div>
          </div>

          {/* Warning Flag */}
          <div className="bg-red-50 p-8 rounded-[40px] border border-red-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm mb-4">
              <Warning size={24} weight="fill" />
            </div>
            <h4 className="text-[15px] font-black text-gray-900 mb-2">Compliance Conflict?</h4>
            <p className="text-[11px] text-gray-500 font-medium mb-6">
              Flag this chemist if regulatory data doesn't match their provided certifications.
            </p>
            <button className="w-full py-3 bg-white text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all border border-red-100">
              Report Discrepancy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
