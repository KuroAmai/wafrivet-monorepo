"use client";

import { AdminUsersList } from "@/components/admin/AdminUsersList";

export default function ChemistsPage() {
  return (
    <AdminUsersList
      title="Chemists"
      subtitle="Marketplace suppliers and chemist storefronts"
      roleFilter="SUPPLIER"
    />
  );
}
