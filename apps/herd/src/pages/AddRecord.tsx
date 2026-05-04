import { CaretLeft, ClipboardText, Syringe, Calendar, User, Note, Check } from "@phosphor-icons/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function AddRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Record Saved Successfully", {
        description: "The new record has been added to the animal's history."
      });
      navigate(`/animal/${id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link to={`/animal/${id}`} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Add Record</h1>
        <div className="w-10" />
      </div>

      <form onSubmit={handleSave} className="px-6 py-10 space-y-8">
        {/* Record Type */}
        <div className="space-y-4">
           <label className="px-1 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Record Type</label>
           <div className="grid grid-cols-2 gap-3">
              {[
                { id: "vaccination", label: "Vaccination", icon: Syringe },
                { id: "checkup", label: "Checkup", icon: ClipboardText },
                { id: "treatment", label: "Treatment", icon: Check },
                { id: "other", label: "Other", icon: Note },
              ].map((type) => (
                <button 
                  key={type.id}
                  type="button"
                  className="flex flex-col items-center gap-3 p-6 bg-white border border-gray-100 rounded-[32px] hover:border-[#2D4D31]/20 transition-all focus:ring-4 focus:ring-[#2D4D31]/5 group"
                >
                   <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] group-hover:bg-[#2D4D31]/5 transition-colors">
                      <type.icon size={20} weight="bold" />
                   </div>
                   <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">{type.label}</span>
                </button>
              ))}
           </div>
        </div>

        {/* Inputs */}
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Date of Action</label>
              <div className="relative">
                 <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <input 
                   type="date" 
                   defaultValue={new Date().toISOString().split('T')[0]}
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Administered By</label>
              <div className="relative">
                 <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <input 
                   type="text" 
                   placeholder="Enter practitioner name"
                   defaultValue="Dr. Ademola Adebayo"
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Clinical Notes</label>
              <textarea 
                placeholder="Describe the action or findings..."
                className="w-full bg-white border border-gray-100 p-6 rounded-[32px] text-[14px] font-bold text-gray-900 h-32 resize-none focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
              />
           </div>
        </div>

        {/* Submit */}
        <button 
          disabled={isSaving}
          className="w-full p-6 bg-gray-900 text-white rounded-[24px] text-[14px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-gray-900/10 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving Record...
            </>
          ) : "Finalize Record"}
        </button>
      </form>
    </div>
  );
}
