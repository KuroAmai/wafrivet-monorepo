"use client";

import { useMemo, useState } from "react";
import {
  MagnifyingGlass,
  DownloadSimple,
  Package,
  Storefront,
  SealCheck,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useAdminCatalog } from "@/hooks/useAdminApi";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [cursor, setCursor] = useState<string | undefined>();

  const isActiveFilter =
    selectedStatus === "All Status" ? undefined : selectedStatus === "Active";

  const { data: catalogResponse, isLoading, isError, error, refetch } = useAdminCatalog({
    limit: 50,
    cursor,
    isActive: isActiveFilter,
  });

  const apiProducts = useMemo(
    () =>
      catalogResponse?.data?.map((p) => ({
        id: p.id,
        name: p.name,
        generic: p.genericName,
        nafdac: p.nafdacRegNo ?? "—",
        category: p.category?.name ?? "—",
        manufacturer: p.manufacturer,
        verified: Boolean(p.nafdacRegNo),
        status: p.isActive ? "Active" : "Inactive",
        listed: new Date(p.createdAt).toLocaleDateString("en-NG", {
          month: "short",
          day: "numeric",
        }),
      })) ?? [],
    [catalogResponse],
  );

  const categories = useMemo(() => {
    const names = new Set(apiProducts.map((p) => p.category).filter((c) => c !== "—"));
    return ["All Categories", ...Array.from(names).sort()];
  }, [apiProducts]);

  const filteredProducts = apiProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nafdac.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const verifiedCount = apiProducts.filter((p) => p.verified).length;
  const inactiveCount = apiProducts.filter((p) => p.status === "Inactive").length;

  const stats = [
    { label: "Total Products", value: String(apiProducts.length), color: "gray" },
    { label: "NAFDAC Verified", value: String(verifiedCount), color: "emerald" },
    { label: "Inactive", value: String(inactiveCount), color: "orange" },
    { label: "Categories", value: String(categories.length - 1), color: "gray" },
    { label: "On Page", value: String(filteredProducts.length), color: "gray" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">
            Product Catalog
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Manage quality and compliance of all marketplace listings
          </p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Catalog
        </button>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError}
        errorMessage={(error as Error)?.message}
        isEmpty={!isLoading && !isError && apiProducts.length === 0}
        onRetry={() => refetch()}
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all"
          >
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
              {stat.label}
            </span>
            <div
              className={cn(
                "text-[20px] font-black leading-none group-hover:scale-105 transition-transform",
                stat.color === "emerald"
                  ? "text-emerald-500"
                  : stat.color === "orange"
                    ? "text-orange-500"
                    : stat.color === "red"
                      ? "text-red-500"
                      : "text-gray-900",
              )}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search product name or NAFDAC no..."
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCursor(undefined);
            }}
          >
            {["All Status", "Active", "Inactive"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedCategory("All Categories");
            setSelectedStatus("All Status");
            setCursor(undefined);
          }}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Product & Generic
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  NAFDAC / Cat
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Manufacturer
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Listed
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">
                  Compliance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] group-hover:bg-white transition-all shadow-none group-hover:shadow-sm flex-shrink-0">
                        <Package size={18} weight="duotone" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-bold text-gray-900 leading-none mb-1 truncate">
                          {product.name}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium truncate">
                          {product.generic}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-black text-gray-900 tracking-tight whitespace-nowrap">
                        {product.nafdac}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {product.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 flex-shrink-0">
                        <Storefront size={12} weight="bold" />
                      </div>
                      <span className="text-[13px] font-bold text-gray-600 truncate whitespace-nowrap">
                        {product.manufacturer}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className="text-[13px] font-bold text-gray-600 whitespace-nowrap">
                      {product.listed}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <span
                      className={cn(
                        "inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                        product.status === "Active"
                          ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                          : "bg-gray-50 text-gray-500 border-gray-100",
                      )}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-right">
                    {product.verified ? (
                      <div className="flex items-center justify-end gap-1 text-emerald-500">
                        <SealCheck size={14} weight="fill" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          NAFDAC
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Unverified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Showing {filteredProducts.length} products
          </span>
          <div className="flex items-center gap-2">
            {cursor && (
              <button
                onClick={() => setCursor(undefined)}
                className="px-4 h-9 rounded-xl text-[13px] font-black text-gray-400 hover:bg-gray-50 transition-all"
              >
                First
              </button>
            )}
            {catalogResponse?.meta.hasNextPage && (
              <button
                onClick={() => setCursor(catalogResponse.meta.nextCursor ?? undefined)}
                className="px-4 h-9 rounded-xl text-[13px] font-black bg-[#2D4D31] text-white shadow-lg shadow-[#2D4D31]/20 hover:bg-[#1a301e] transition-all"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
