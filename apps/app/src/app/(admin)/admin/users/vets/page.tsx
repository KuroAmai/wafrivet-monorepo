"use client";

import { AdminUsersList } from "@/components/admin/AdminUsersList";

export default function VetsPage() {
  return (
    <AdminUsersList
      title="Vets"
      subtitle="Veterinary clinics and procurement accounts"
      roleFilter="VET"
    />
  );
}
