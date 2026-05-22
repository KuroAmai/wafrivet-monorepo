import type { WelcomeRole } from "../../components/RoleBadge";

export type WelcomeChecklistItem = {
  icon: string;
  title: string;
  description: string;
};

export type WelcomeRoleContent = {
  introParagraph: string;
  checklistItems: WelcomeChecklistItem[];
};

const farmerContent: WelcomeRoleContent = {
  introParagraph:
    "Wafrivet gives you AI diagnosis, genuine medicines delivered, and a full health record for every animal you own. All in one place.",
  checklistItems: [
    {
      icon: "cow",
      title: "Register your first animal",
      description:
        "Give your herd a digital identity. Every animal gets a unique WAF ID.",
    },
    {
      icon: "sparkles",
      title: "Run your first AI diagnosis",
      description:
        "Point your camera at any animal. Get a diagnosis in under 60 seconds.",
    },
    {
      icon: "cart",
      title: "Order from a nearby chemist",
      description: "Genuine medicines. Delivered to your farm.",
    },
  ],
};

const vetContent: WelcomeRoleContent = {
  introParagraph:
    "Wafrivet gives you a digital patient record for every animal you treat, AI-assisted diagnosis, and a cleaner way to manage your practice.",
  checklistItems: [
    {
      icon: "clipboard",
      title: "Complete your vet profile",
      description:
        "Add your VCN number and practice details so farmers can find and trust you.",
    },
    {
      icon: "search",
      title: "Search your first patient",
      description:
        "Find any animal by WAF ID and see their full health history instantly.",
    },
    {
      icon: "file-text",
      title: "Log your first clinical note",
      description:
        "Replace paper records with a permanent digital trail for every consultation.",
    },
  ],
};

const chemistContent: WelcomeRoleContent = {
  introParagraph:
    "Wafrivet puts your shop in front of farmers actively looking for medicine. Genuine stock, verified listings, and orders that come to you.",
  checklistItems: [
    {
      icon: "store",
      title: "Complete your shop profile",
      description:
        "Add your location, delivery radius, and bank details for settlements.",
    },
    {
      icon: "pill",
      title: "Add your first product",
      description:
        "List your stock with NAFDAC numbers so farmers can find and trust it.",
    },
    {
      icon: "package",
      title: "Set your delivery radius",
      description: "Tell farmers how far you deliver so the right orders come your way.",
    },
  ],
};

const distributorContent: WelcomeRoleContent = {
  introParagraph:
    "Wafrivet connects you directly to a network of verified agro-vet chemists. See demand before it becomes urgent. Ship smarter.",
  checklistItems: [
    {
      icon: "building",
      title: "Complete your business profile",
      description: "Add your coverage area and bank details for settlements.",
    },
    {
      icon: "link",
      title: "Link your first chemist",
      description: "Connect the chemists you already supply to your distributor account.",
    },
    {
      icon: "truck",
      title: "Create your first shipment",
      description: "Manage bulk orders and logistics from one dashboard.",
    },
  ],
};

const contentByRole: Record<WelcomeRole, WelcomeRoleContent> = {
  farmer: farmerContent,
  vet: vetContent,
  chemist: chemistContent,
  distributor: distributorContent,
};

export function getWelcomeRoleContent(role: WelcomeRole): WelcomeRoleContent {
  return contentByRole[role];
}
