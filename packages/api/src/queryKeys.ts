export const queryKeys = {
  auth: { me: ["auth", "me"] as const },
  admin: {
    warRoom: ["admin", "war-room"] as const,
    orders: (params?: object) => ["admin", "orders", params] as const,
    users: (params?: object) => ["admin", "users", params] as const,
    user: (id: string) => ["admin", "users", id] as const,
    livestockSummary: ["admin", "livestock", "summary"] as const,
    livestockAnimals: (params?: object) => ["admin", "livestock", "animals", params] as const,
    livestockAnimal: (uid: string) => ["admin", "livestock", "animals", uid] as const,
    livestockAnimalClinical: (uid: string) => ["admin", "livestock", "clinical", uid] as const,
    livestockAnimalVitals: (uid: string) => ["admin", "livestock", "vitals", uid] as const,
    livestockHealthEvents: (params?: object) => ["admin", "livestock", "health-events", params] as const,
    livestockDiagnoses: (params?: object) => ["admin", "livestock", "diagnoses", params] as const,
    livestockValuations: (params?: object) => ["admin", "livestock", "valuations", params] as const,
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
  shopperCommerce: {
    orders: (params?: object) => ["shopper", "orders", params] as const,
    order: (id: string) => ["shopper", "order", id] as const,
    draft: ["shopper", "procurement", "draft"] as const,
  },
  market: {
    range: (masterSkuId: string) => ["market", "range", masterSkuId] as const,
    compare: (masterSkuId: string) => ["market", "compare", masterSkuId] as const,
  },
  supplier: {
    offers: (params?: object) => ["supplier", "offers", params] as const,
    profile: ["supplier", "profile"] as const,
    wallet: ["supplier", "wallet"] as const,
    orders: (params?: object) => ["supplier", "orders", params] as const,
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
  shopper: {
    profile: ["shopper", "profile"] as const,
    addresses: ["shopper", "addresses"] as const,
    address: (id: string) => ["shopper", "addresses", id] as const,
    wishlist: (params?: object) => ["shopper", "wishlist", params] as const,
  },
};
