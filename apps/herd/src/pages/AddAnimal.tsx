import { CaretLeft, Camera, IdentificationBadge, Tag, Tree, Check } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { AnimalSex, AnimalSpecies } from "@wafrivet/types";
import { useCreateAnimal, useFarms } from "@/hooks/useHerdApi";

const SPECIES_MAP: Record<string, AnimalSpecies> = {
  Bovine: "cattle",
  Equine: "horse",
  Ovine: "sheep",
  Caprine: "goat",
};

export default function AddAnimal() {
  const navigate = useNavigate();
  const createAnimal = useCreateAnimal();
  const { data: farms, isLoading: farmsLoading } = useFarms();
  const [selectedType, setSelectedType] = useState("Bovine");
  const [name, setName] = useState("");
  const [tagEarNumber, setTagEarNumber] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState<AnimalSex>("unknown");
  const [farmId, setFarmId] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedFarmId = farmId || farms?.[0]?.farmId;
    if (!resolvedFarmId) {
      toast.error("Create or select a farm before registering animals");
      return;
    }

    try {
      await createAnimal.mutateAsync({
        farmId: resolvedFarmId,
        species: SPECIES_MAP[selectedType] ?? "other",
        sex,
        name: name.trim() || undefined,
        breed: breed.trim() || undefined,
        tagEarNumber: tagEarNumber.trim() || undefined,
      });
      toast.success("Animal registered successfully");
      navigate("/animals");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link to="/animals" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Register Animal</h1>
        <div className="w-10" />
      </div>

      <form onSubmit={(e) => void handleRegister(e)} className="px-6 py-10 space-y-10">
        <div className="flex flex-col items-center">
           <div className="w-32 h-32 bg-white border-4 border-white shadow-2xl rounded-[40px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center text-gray-200">
                 <Camera size={40} weight="bold" />
              </div>
           </div>
           <p className="mt-4 text-[11px] font-black text-gray-300 uppercase tracking-widest">Profile Photo</p>
        </div>

        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Farm</label>
              <select
                value={farmId || farms?.[0]?.farmId || ""}
                onChange={(e) => setFarmId(e.target.value)}
                disabled={farmsLoading}
                className="w-full bg-white border border-gray-100 p-5 rounded-[24px] text-[15px] font-bold text-gray-900"
              >
                {(farms ?? []).length === 0 ? (
                  <option value="">No farms available</option>
                ) : (
                  farms!.map((f) => (
                    <option key={f.farmId} value={f.farmId}>
                      {f.name}
                    </option>
                  ))
                )}
              </select>
           </div>

           <div className="space-y-4">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Classification</label>
              <div className="flex gap-2 flex-wrap">
                 {Object.keys(SPECIES_MAP).map((type) => (
                   <button
                     key={type}
                     type="button"
                     onClick={() => setSelectedType(type)}
                     className={cn(
                       "flex-1 min-w-[70px] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                       selectedType === type ? "bg-[#2D4D31] text-white shadow-lg" : "bg-white border border-gray-100 text-gray-400"
                     )}
                   >
                     {type}
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Sex</label>
              <div className="flex gap-2">
                {(["male", "female", "unknown"] as AnimalSex[]).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSex(value)}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest",
                      sex === value ? "bg-[#2D4D31] text-white" : "bg-white border border-gray-100 text-gray-400"
                    )}
                  >
                    {value}
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
                   value={name}
                   onChange={(e) => setName(e.target.value)}
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
                   value={tagEarNumber}
                   onChange={(e) => setTagEarNumber(e.target.value)}
                   placeholder="WAF-XXXXX"
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Primary Breed</label>
              <div className="relative">
                 <Tree className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <input
                   type="text"
                   value={breed}
                   onChange={(e) => setBreed(e.target.value)}
                   placeholder="e.g. Holstein, Dorper"
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
                 />
              </div>
           </div>
        </div>

        <button
          type="submit"
          disabled={createAnimal.isPending || (farms ?? []).length === 0}
          className="w-full py-5 bg-[#2D4D31] text-white rounded-[28px] font-black text-[15px] uppercase tracking-widest shadow-xl shadow-[#2D4D31]/20 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {createAnimal.isPending ? "Registering…" : "Register Animal"}
          <Check size={20} weight="bold" />
        </button>
      </form>
    </div>
  );
}
