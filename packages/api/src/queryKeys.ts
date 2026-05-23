export const queryKeys = {
  auth: { me: ["auth", "me"] as const },
  admin: {
    warRoom: ["admin", "war-room"] as const,
    orders: (params?: object) => ["admin", "orders", params] as const,
    users: (params?: object) => ["admin", "users", params] as const,
    user: (id: string) => ["admin", "users", id] as const,
  },
  catalog: {
    categories: ["catalog", "categories"] as const,
    list: (params?: object) => ["catalog", "list", params] as const,
    item: (id: string) => ["catalog", "item", id] as const,
  },
  vet: {
    orders: (params?: object) => ["vet", "orders", params] as const,
    order: (id: string) => ["vet", "order", id] as const,
    draft: ["vet", "procurement", "draft"] as const,
  },
  supplier: {
    offers: (params?: object) => ["supplier", "offers", params] as const,
    profile: ["supplier", "profile"] as const,
    wallet: ["supplier", "wallet"] as const,
  },
  herd: {
    animals: (params?: object) => ["herd", "animals", params] as const,
    animal: (uid: string) => ["herd", "animal", uid] as const,
    farms: ["herd", "farms"] as const,
  },
  regions: {
    list: (params?: object) => ["regions", "list", params] as const,
  },
  notifications: {
    list: (params?: object) => ["notifications", "list", params] as const,
  },
};
