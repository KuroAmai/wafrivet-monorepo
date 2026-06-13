"use client";

import { AdminUsersList } from "@/components/admin/AdminUsersList";

export default function RidersPage() {
  return (
    <AdminUsersList
      title="Riders"
      subtitle="Delivery fleet and logistics riders"
      roleFilter="RIDER"
    />
  );
}
