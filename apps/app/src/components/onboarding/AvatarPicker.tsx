"use client";

import { useMemo, useState } from "react";
import { Shuffle } from "@phosphor-icons/react";
import { AVATAR_SEEDS, dicebearAvatarUrl } from "@/lib/dicebear";

type AvatarPickerProps = {
  selectedSeed: string;
  onSelect: (seed: string) => void;
};

export function AvatarPicker({ selectedSeed, onSelect }: AvatarPickerProps) {
  const [offset, setOffset] = useState(0);

  const visibleSeeds = useMemo(() => {
    const rotated = [...AVATAR_SEEDS.slice(offset), ...AVATAR_SEEDS.slice(0, offset)];
    return rotated.slice(0, 12);
  }, [offset]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[14px] text-gray-500">Choose an avatar</p>
        <button
          type="button"
          onClick={() => setOffset((o) => (o + 4) % AVATAR_SEEDS.length)}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2D4D31] hover:underline"
        >
          <Shuffle size={16} />
          Shuffle
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {visibleSeeds.map((seed) => {
          const selected = selectedSeed === seed;
          return (
            <button
              key={seed}
              type="button"
              onClick={() => onSelect(seed)}
              className={`aspect-square rounded-xl border-2 overflow-hidden transition-all ${
                selected
                  ? "border-[#2D4D31] ring-2 ring-[#2D4D31]/20 bg-[#f0f4f0]"
                  : "border-gray-200 hover:border-gray-300 bg-gray-50"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dicebearAvatarUrl(seed)}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
