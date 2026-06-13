const SPECIES_LABELS: Record<string, string> = {
  CATTLE: "Cattle",
  GOAT: "Goat",
  SHEEP: "Sheep",
  PIG: "Pig",
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Active",
  SOLD: "Sold",
  DECEASED: "Deceased",
  SLAUGHTERED: "Slaughtered",
};

const SPECIES_COLORS: Record<string, string> = {
  CATTLE: "bg-[#2D4D31]",
  GOAT: "bg-emerald-500",
  SHEEP: "bg-blue-500",
  PIG: "bg-amber-500",
};

export function formatSpeciesLabel(species: string): string {
  return SPECIES_LABELS[species.toUpperCase()] ?? species;
}

export function formatStatusLabel(status: string): string {
  return STATUS_LABELS[status.toUpperCase()] ?? status;
}

export function speciesFilterValue(label: string): string | undefined {
  if (label === "All Species") return undefined;
  const entry = Object.entries(SPECIES_LABELS).find(([, v]) => v === label);
  return entry?.[0];
}

export function statusFilterValue(label: string): string | undefined {
  if (label === "All Status") return undefined;
  const entry = Object.entries(STATUS_LABELS).find(([, v]) => v === label);
  return entry?.[0];
}

export function speciesBarColor(species: string): string {
  return SPECIES_COLORS[species.toUpperCase()] ?? "bg-gray-900";
}

export function formatNgn(amount: number | null | undefined): string {
  if (amount == null || amount <= 0) return "—";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRelativeDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = iso.includes("T") ? new Date(iso) : new Date(`${iso}T00:00:00.000Z`);
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
}

export const SPECIES_FILTER_OPTIONS = ["All Species", "Cattle", "Goat", "Sheep", "Pig"];
export const STATUS_FILTER_OPTIONS = ["All Status", "Active", "Sold", "Deceased", "Slaughtered"];
