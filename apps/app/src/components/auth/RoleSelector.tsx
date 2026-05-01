"use client";

import { UserRole } from "@wafrivet/auth";
import {
  Plant,
  Stethoscope,
  Pill,
  Truck,
} from "@phosphor-icons/react";

interface RoleSelectorProps {
  selectedRole?: UserRole;
  onSelect: (role: UserRole) => void;
}

const ROLES: {
  id: UserRole;
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  IconActive: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  {
    id: "farmer",
    title: "Farmer",
    description: "Manage your herd, track vitals, and order medicine.",
    Icon: Plant,
    IconActive: Plant,
  },
  {
    id: "vet",
    title: "Veterinarian",
    description: "Diagnose animals and manage patient records.",
    Icon: Stethoscope,
    IconActive: Stethoscope,
  },
  {
    id: "chemist",
    title: "Chemist",
    description: "Sell medicine and manage your inventory.",
    Icon: Pill,
    IconActive: Pill,
  },
  {
    id: "distributor",
    title: "Distributor",
    description: "Manage your chemist network and supply chain.",
    Icon: Truck,
    IconActive: Truck,
  },
];

export function RoleSelector({ selectedRole, onSelect }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ROLES.map((role) => {
        const selected = selectedRole === role.id;
        const Icon = selected ? role.IconActive : role.Icon;
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onSelect(role.id)}
            className={`text-left p-4 rounded-xl border transition-all duration-200 ${
              selected
                ? "border-[#2D4D31] bg-[#f0f4f0]"
                : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
            }`}
          >
            <Icon
              size={26}
              className={`transition-colors duration-200 ${selected ? "text-[#2D4D31]" : "text-gray-400"}`}
            />
            <h4 className={`text-[14px] font-semibold mt-2.5 transition-colors duration-200 ${selected ? "text-[#2D4D31]" : "text-gray-900"}`}>
              {role.title}
            </h4>
            <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">{role.description}</p>
          </button>
        );
      })}
    </div>
  );
}
