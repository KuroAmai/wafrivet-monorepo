"use client";

import type { PlatformSelectableRole, RoleOptionDto } from "@wafrivet/types";
import {
  Plant,
  Stethoscope,
  Pill,
  Truck,
  User,
} from "@phosphor-icons/react";
import { FALLBACK_ROLE_OPTIONS } from "@/lib/roleOptionsFallback";

type IconComponent = React.ComponentType<{
  size?: number | string;
  className?: string;
}>;

const ICONS: Record<PlatformSelectableRole, { Icon: IconComponent; IconActive: IconComponent }> = {
  FARMER: { Icon: Plant, IconActive: Plant },
  REGULAR_CUSTOMER: { Icon: User, IconActive: User },
  VET: { Icon: Stethoscope, IconActive: Stethoscope },
  SUPPLIER: { Icon: Pill, IconActive: Pill },
  MANUFACTURER: { Icon: Truck, IconActive: Truck },
};

interface RoleSelectorProps {
  options?: RoleOptionDto[];
  selectedRole?: PlatformSelectableRole;
  onSelect: (role: PlatformSelectableRole) => void;
}

export function RoleSelector({
  options = FALLBACK_ROLE_OPTIONS,
  selectedRole,
  onSelect,
}: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((role) => {
        const selected = selectedRole === role.id;
        const icons = ICONS[role.id] ?? ICONS.REGULAR_CUSTOMER;
        const Icon = selected ? icons.IconActive : icons.Icon;
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
            <h4
              className={`text-[14px] font-semibold mt-2.5 transition-colors duration-200 ${selected ? "text-[#2D4D31]" : "text-gray-900"}`}
            >
              {role.label}
            </h4>
            <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">{role.description}</p>
          </button>
        );
      })}
    </div>
  );
}
