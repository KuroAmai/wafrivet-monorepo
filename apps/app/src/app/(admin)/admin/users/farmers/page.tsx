"use client";

import { AdminUsersList } from "@/components/admin/AdminUsersList";

export default function FarmersPage() {
  return (
    <AdminUsersList
      title="Farmers"
      subtitle="Herd owners and farm account holders"
      roleFilter="FARMER"
    />
  );
}
