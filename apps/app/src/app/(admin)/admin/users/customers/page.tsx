"use client";

import { AdminUsersList } from "@/components/admin/AdminUsersList";

export default function CustomersPage() {
  return (
    <AdminUsersList
      title="Customers"
      subtitle="Retail shoppers and end consumers"
      roleFilter="REGULAR_CUSTOMER"
    />
  );
}
