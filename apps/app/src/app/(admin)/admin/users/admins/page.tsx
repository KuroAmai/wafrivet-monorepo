"use client";

import { AdminUsersList } from "@/components/admin/AdminUsersList";

export default function AdminsPage() {
  return (
    <AdminUsersList
      title="Platform admins"
      subtitle="Internal administrators with full platform access"
      roleFilter="ADMIN"
    />
  );
}
