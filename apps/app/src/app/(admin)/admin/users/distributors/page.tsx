"use client";

import { AdminUsersList } from "@/components/admin/AdminUsersList";

export default function DistributorsPage() {
  return (
    <AdminUsersList
      title="Distributors"
      subtitle="Manufacturers and wholesale distributors"
      roleFilter="MANUFACTURER"
    />
  );
}
