import { CaretLeft, MagnifyingGlass, Cow, Horse, Tag, CaretRight, Plus, Funnel } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useAnimals } from "@/hooks/useHerdApi";

const ALL_ANIMALS = [
  { id: "WAF-882", name: "Bella", breed: "Holstein", type: "Bovine", status: "Healthy", icon: Cow },
  { id: "WAF-901", name: "Luna", breed: "Dorper", type: "Ovine", status: "Healthy", icon: Tag },
  { id: "WAF-773", name: "Max", breed: "Jersey", type: "Bovine", status: "Healthy", icon: Cow },
  { id: "WAF-112", name: "Daisy", breed: "Thoroughbred", type: "Equine", status: "Healthy", icon: Horse },
  { id: "WAF-442", name: "Apollo", breed: "Holstein", type: "Bovine", status: "Warning", icon: Cow },
  { id: "WAF-221", name: "Star", breed: "Arabian", type: "Equine", status: "Healthy", icon: Horse },
];

export default function AnimalList() {
  useDocumentTitle("Animals");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { data: apiAnimals, isLoading, isError, error, refetch } = useAnimals();

  const animals = useMemo(() => {
    const mapped =
      apiAnimals?.map((a) => ({
        id: a.wafId ?? a.animalUid,
        name: a.name ?? "Unknown",
        breed: a.breed ?? "—",
        type: a.species ?? "Livestock",
        status: a.status ?? "Healthy",
        icon: Cow,
      })) ?? [];

    if (mapped.length > 0) return mapped;
    if (isError && isMockDataEnabled()) return ALL_ANIMALS;
    return mapped;
  }, [apiAnimals, isError]);

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(search.toLowerCase()) || 
                         animal.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || animal.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
           <Link to="/" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
              <CaretLeft size={20} weight="bold" />
           </Link>
           <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Animal Registry</h1>
           <Link to="/animals/add" className="w-10 h-10 rounded-xl bg-[#2D4D31] flex items-center justify-center text-white active:scale-90 transition-transform">
              <Plus size={20} weight="bold" />
           </Link>
        </div>

        {/* Search Bar */}
        <div className="relative group">
           <MagnifyingGlass size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D4D31] transition-colors" />
           <input 
             type="text"
             placeholder="Search by ID or Name..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full bg-gray-100 border-none p-4 pl-14 rounded-2xl text-[14px] font-bold text-gray-900 focus:ring-4 focus:ring-[#2D4D31]/5 transition-all outline-none placeholder:text-gray-400"
           />
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        <ApiQueryFeedback
          isLoading={isLoading}
          isError={isError && !isMockDataEnabled()}
          errorMessage={(error as Error)?.message}
          isEmpty={!isLoading && !isError && animals.length === 0}
          onRetry={() => refetch()}
        />
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6">
           {["All", "Bovine", "Equine", "Ovine"].map((cat) => (
             <button
               key={cat}
               onClick={() => setFilter(cat)}
               className={cn(
                 "px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                 filter === cat ? "bg-gray-900 text-white shadow-lg" : "bg-white border border-gray-100 text-gray-400"
               )}
             >
               {cat}
             </button>
           ))}
           <button className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 shrink-0">
              <Funnel size={16} weight="bold" />
           </button>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center px-2">
           <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest">Showing {filteredAnimals.length} Animals</p>
           <p className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest">Sort: Recent</p>
        </div>

        {/* Animals List */}
        <div className="space-y-3">
           {filteredAnimals.map((animal) => (
             <Link 
               key={animal.id}
               to={`/animal/${animal.id}`}
               className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-[#2D4D31]/10 transition-all active:scale-[0.98]"
             >
                <div className="w-14 h-14 bg-gray-50 rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 text-gray-400">
                   <animal.icon size={28} weight="duotone" />
                </div>
                
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-[16px] font-black text-gray-900 truncate">{animal.name}</h4>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        animal.status === "Healthy" ? "bg-emerald-500" : "bg-red-500 animate-pulse"
                      )} />
                   </div>
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{animal.id} • {animal.breed}</p>
                </div>

                <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 transition-all" />
             </Link>
           ))}

           {filteredAnimals.length === 0 && (
             <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                   <MagnifyingGlass size={40} weight="bold" />
                </div>
                <p className="text-[14px] font-bold text-gray-400">No animals found matching your search.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
