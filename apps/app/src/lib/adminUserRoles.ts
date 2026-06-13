/** Backend UserRole values used for GET /admin/users?role= */
export type AdminUserRoleFilter =
  | "ADMIN"
  | "SUPPORT"
  | "FARMER"
  | "VET"
  | "SUPPLIER"
  | "MANUFACTURER"
  | "REGULAR_CUSTOMER"
  | "RIDER";

export type AdminUserRoleNavItem = {
  label: string;
  href: string;
  role?: AdminUserRoleFilter;
  description: string;
};

export const ADMIN_USER_ROLE_NAV: AdminUserRoleNavItem[] = [
  {
    label: "All Users",
    href: "/admin/users",
    description: "Every account across the Wafrivet ecosystem",
  },
  {
    label: "Admins",
    href: "/admin/users/admins",
    role: "ADMIN",
    description: "Platform administrators and internal operators",
  },
  {
    label: "Farmers",
    href: "/admin/users/farmers",
    role: "FARMER",
    description: "Herd owners and farm account holders",
  },
  {
    label: "Vets",
    href: "/admin/users/vets",
    role: "VET",
    description: "Veterinary clinics and procurement accounts",
  },
  {
    label: "Chemists",
    href: "/admin/users/chemists",
    role: "SUPPLIER",
    description: "Marketplace suppliers and chemist storefronts",
  },
  {
    label: "Distributors",
    href: "/admin/users/distributors",
    role: "MANUFACTURER",
    description: "Manufacturers and wholesale distributors",
  },
  {
    label: "Customers",
    href: "/admin/users/customers",
    role: "REGULAR_CUSTOMER",
    description: "Retail shoppers and end consumers",
  },
  {
    label: "Riders",
    href: "/admin/users/riders",
    role: "RIDER",
    description: "Delivery fleet and logistics riders",
  },
];

export function findAdminUserRoleNav(pathname: string): AdminUserRoleNavItem {
  const match = ADMIN_USER_ROLE_NAV.find(
    (item) => item.href === pathname || pathname.startsWith(`${item.href}/`),
  );
  return match ?? ADMIN_USER_ROLE_NAV[0];
}

export function formatAdminUserRole(role: string): string {
  switch (role) {
    case "ADMIN":
      return "Admin";
    case "SUPPORT":
      return "Support";
    case "FARMER":
      return "Farmer";
    case "VET":
      return "Vet";
    case "SUPPLIER":
      return "Chemist";
    case "MANUFACTURER":
      return "Distributor";
    case "REGULAR_CUSTOMER":
      return "Customer";
    case "RIDER":
      return "Rider";
    case "PERSON":
      return "Person";
    default:
      return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

export function adminUserRoleBadgeClass(role: string): string {
  switch (role) {
    case "ADMIN":
    case "SUPPORT":
      return "bg-slate-50 text-slate-600 border-slate-100";
    case "FARMER":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "VET":
      return "bg-blue-50 text-blue-500 border-blue-100";
    case "SUPPLIER":
      return "bg-orange-50 text-orange-500 border-orange-100";
    case "MANUFACTURER":
      return "bg-purple-50 text-purple-500 border-purple-100";
    case "REGULAR_CUSTOMER":
      return "bg-sky-50 text-sky-600 border-sky-100";
    case "RIDER":
      return "bg-amber-50 text-amber-600 border-amber-100";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100";
  }
}
