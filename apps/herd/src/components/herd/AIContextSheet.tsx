"use client";

import { Drawer } from "vaul";
import { Robot, X, PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  "Likely diagnosis?",
  "Due for vaccines?",
  "Treatment options?",
  "Summarize health",
  "Safe for slaughter?",
];

const SYMPTOMS = [
  "Fever", "Limping", "Not Eating", "Nasal Discharge", "Swollen Joints", "Coughing"
];

export function AIContextSheet({ children }: { children: ReactNode }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        {children as never}
      </Drawer.Trigger>
      
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[60]" />
        <Drawer.Content className="bg-[#F9FAFB] flex flex-col rounded-t-[40px] h-[95vh] mt-24 fixed bottom-0 left-0 right-0 z-[70] outline-none">
          <div className="p-4 bg-white rounded-t-[40px] flex-1 overflow-y-auto no-scrollbar">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-200 mb-8" />
            
            <div className="max-w-xl mx-auto space-y-8 pb-10">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                    <Robot size={24} weight="bold" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-black text-gray-900 tracking-tight">Herd AI Assistant</h2>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Animal context loaded</p>
                  </div>
                </div>
                <Drawer.Close className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                  <X size={20} weight="bold" />
                </Drawer.Close>
              </div>

              {/* Context Toggle Pills */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Included Context</p>
                <div className="flex flex-wrap gap-2">
                  {["Overview", "Health", "Vaccines", "Repro"].map((pill) => (
                    <button 
                      key={pill}
                      className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-black border border-emerald-100 flex items-center gap-2"
                    >
                      <CheckCircle size={14} weight="fill" />
                      {pill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptom Input Widget */}
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Current Symptoms</p>
                 <div className="grid grid-cols-3 gap-2">
                   {SYMPTOMS.map((symptom) => (
                     <button
                       key={symptom}
                       onClick={() => toggleSymptom(symptom)}
                       className={cn(
                         "p-3 rounded-2xl text-[11px] font-bold border transition-all text-center",
                         selectedSymptoms.includes(symptom) 
                           ? "bg-[#2D4D31] text-white border-[#2D4D31] shadow-lg shadow-[#2D4D31]/10" 
                           : "bg-white text-gray-600 border-gray-100"
                       )}
                     >
                       {symptom}
                     </button>
                   ))}
                 </div>
              </div>

              {/* Chat Placeholder */}
              <div className="space-y-6 pt-4">
                 <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 max-w-[85%]">
                    <p className="text-[14px] text-gray-700 leading-relaxed">
                      Hello! I have loaded **Bella's** full record. She is currently overdue for her FMD vaccine. How can I help you today?
                    </p>
                 </div>

                 {/* Quick Prompt Chips */}
                 <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-2 px-2">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button 
                        key={prompt}
                        className="flex-shrink-0 px-4 py-2 bg-white border border-gray-100 rounded-xl text-[11px] font-bold text-gray-600 hover:border-emerald-200 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-gray-50 pb-12">
            <div className="max-w-xl mx-auto relative">
              <input 
                type="text" 
                placeholder="Ask anything about this animal..."
                className="w-full bg-gray-50 border-none rounded-3xl py-5 px-6 pr-16 text-[15px] font-medium focus:ring-2 focus:ring-[#2D4D31]/10 placeholder:text-gray-400"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#2D4D31] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#2D4D31]/20 active:scale-95 transition-transform">
                <PaperPlaneTilt size={24} weight="bold" />
              </button>
            </div>
            <p className="text-[9px] text-center text-gray-400 mt-4 font-bold uppercase tracking-widest">
              AI suggestions are not a substitute for vet diagnosis
            </p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
