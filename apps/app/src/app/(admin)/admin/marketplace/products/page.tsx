"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { useAdminCatalog, useUpdateAdminSku, useCategories } from "@/hooks/useAdminApi";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [cursor, setCursor] = useState<string | undefined>();

  // Edit Drawer state
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Form states for Editing
  const [name, setName] = useState("");
  const [genericName, setGenericName] = useState("");
  const [activeIngredient, setActiveIngredient] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [strength, setStrength] = useState("");
  const [unitOfMeasure, setUnitOfMeasure] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [description, setDescription] = useState("");
  const [nafdacRegNo, setNafdacRegNo] = useState("");
  const [requiresColdChain, setRequiresColdChain] = useState(false);
  const [requiresPrescription, setRequiresPrescription] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const { data: categoriesData } = useCategories();
  const updateMutation = useUpdateAdminSku();

  // Debounce search query to avoid spamming the database
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCursor(undefined);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const categoryIdFilter = useMemo(() => {
    if (selectedCategory === "All Categories" || !categoriesData) return undefined;
    return categoriesData.find((c) => c.name === selectedCategory)?.id;
  }, [selectedCategory, categoriesData]);

  const isActiveFilter =
    selectedStatus === "All Status" ? undefined : selectedStatus === "Active";

  const { data: catalogResponse, isLoading, isError, error, refetch } = useAdminCatalog({
    limit: 50,
    cursor,
    isActive: isActiveFilter,
    categoryId: categoryIdFilter,
    q: debouncedSearch || undefined,
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

  const categoriesList = useMemo(() => {
    if (!categoriesData) return ["All Categories"];
    const names = categoriesData.map((c) => c.name);
    return ["All Categories", ...names.sort()];
  }, [categoriesData]);

  const filteredProducts = apiProducts;

  // Initialize edit form when a product is clicked
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name ?? "");
      setGenericName(editingProduct.genericName ?? "");
      setActiveIngredient(editingProduct.activeIngredient ?? "");
      setManufacturer(editingProduct.manufacturer ?? "");
      setDosageForm(editingProduct.dosageForm ?? "");
      setStrength(editingProduct.strength ?? "");
      setUnitOfMeasure(editingProduct.unitOfMeasure ?? "");
      setPackageSize(editingProduct.packageSize ? String(editingProduct.packageSize) : "");
      setDescription(editingProduct.description ?? "");
      setNafdacRegNo(editingProduct.nafdacRegNo ?? "");
      setRequiresColdChain(Boolean(editingProduct.requiresColdChain));
      setRequiresPrescription(Boolean(editingProduct.requiresPrescription));
      setIsActive(Boolean(editingProduct.isActive));
      setCategoryId(editingProduct.categoryId ?? "");
      setImageFile(null);
      setImagePreview(editingProduct.imageUrl ?? "");
      setActionError(null);
      setActionSuccess(null);
    }
  }, [editingProduct]);

  const handleSave = async () => {
    if (!editingProduct) return;
    setActionError(null);
    setActionSuccess(null);

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("genericName", genericName.trim());
    formData.append("activeIngredient", activeIngredient.trim());
    formData.append("manufacturer", manufacturer.trim());
    formData.append("dosageForm", dosageForm.trim());
    formData.append("unitOfMeasure", unitOfMeasure.trim());
    formData.append("requiresColdChain", String(requiresColdChain));
    formData.append("requiresPrescription", String(requiresPrescription));
    formData.append("isActive", String(isActive));
    formData.append("categoryId", categoryId);

    if (strength.trim()) formData.append("strength", strength.trim());
    if (packageSize.trim()) formData.append("packageSize", packageSize.trim());
    if (description.trim()) formData.append("description", description.trim());
    if (nafdacRegNo.trim()) formData.append("nafdacRegNo", nafdacRegNo.trim());

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await updateMutation.mutateAsync({
        id: editingProduct.id,
        formData,
      });
      setActionSuccess("Product updated successfully!");
      setTimeout(() => {
        setEditingProduct(null);
        setActionSuccess(null);
        void refetch();
      }, 1000);
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err?.message ?? "Failed to save product changes.";
      setActionError(msg);
    }
  };

  const stats = [
    { label: "Total Products", value: String(catalogResponse?.meta?.total ?? 0), color: "gray" },
    { label: "NAFDAC Verified", value: String(catalogResponse?.meta?.verifiedCount ?? 0), color: "emerald" },
    { label: "Inactive", value: String(catalogResponse?.meta?.inactiveCount ?? 0), color: "orange" },
    { label: "Categories", value: String(categoriesList.length - 1), color: "gray" },
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
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCursor(undefined);
            }}
          >
            {categoriesList.map((c) => (
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
                <tr
                  key={product.id}
                  onClick={() => {
                    const rawProduct = catalogResponse?.data?.find((p) => p.id === product.id);
                    if (rawProduct) {
                      setEditingProduct(rawProduct);
                    }
                  }}
                  className="group hover:bg-gray-50/30 transition-all cursor-pointer"
                >
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

      {/* Slide Drawer for editing products */}
      <AnimatePresence>
        {editingProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
              className="fixed inset-0 bg-black/25 backdrop-blur-xs z-[100]"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white z-[101] shadow-2xl flex flex-col border-l border-gray-100"
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-[20px] font-black text-gray-900 tracking-tight leading-none mb-2">
                    Edit Catalog Item
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    SKU Code: <span className="text-gray-600 select-all font-mono">{editingProduct.skuCode}</span>
                  </p>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-2.5 hover:bg-gray-50 text-gray-400 hover:text-gray-900 rounded-2xl transition-all"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {actionError && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-xs font-bold">
                    {actionError}
                  </div>
                )}
                {actionSuccess && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold">
                    {actionSuccess}
                  </div>
                )}

                <div className="space-y-5">
                  {/* Image Field */}
                  <div className="flex items-center gap-6 p-5 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative shadow-inner">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Package size={32} className="text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Product Image
                      </label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImageFile(file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImagePreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-[#2D4D31] file:text-white file:cursor-pointer hover:file:bg-[#1a301e] transition-all"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#2D4D31]/20 focus:bg-white transition-all outline-none text-[14px] font-bold text-gray-900"
                      placeholder="e.g. Tylosin Tartrate Soluble Powder"
                      required
                    />
                  </div>

                  {/* Generic Name */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                      Generic Name
                    </label>
                    <input
                      type="text"
                      value={genericName}
                      onChange={(e) => setGenericName(e.target.value)}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#2D4D31]/20 focus:bg-white transition-all outline-none text-[14px] font-bold text-gray-900"
                      placeholder="e.g. Tylosin Tartrate"
                      required
                    />
                  </div>

                  {/* Category Selector */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                      Category
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl hover:border-[#2D4D31]/20 transition-all outline-none text-[14px] font-bold text-gray-900 cursor-pointer appearance-none"
                      required
                    >
                      <option value="" disabled>Select a category</option>
                      {categoriesData?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Manufacturer & Active Ingredient */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Manufacturer
                      </label>
                      <input
                        type="text"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#2D4D31]/20 focus:bg-white transition-all outline-none text-[14px] font-bold text-gray-900"
                        placeholder="e.g. Wafrivet Labs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Active Ingredient
                      </label>
                      <input
                        type="text"
                        value={activeIngredient}
                        onChange={(e) => setActiveIngredient(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#2D4D31]/20 focus:bg-white transition-all outline-none text-[14px] font-bold text-gray-900"
                        placeholder="e.g. Tylosin 100%"
                        required
                      />
                    </div>
                  </div>

                  {/* Dosage, Strength, Unit */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Dosage Form
                      </label>
                      <input
                        type="text"
                        value={dosageForm}
                        onChange={(e) => setDosageForm(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#2D4D31]/20 focus:bg-white transition-all outline-none text-[14px] font-bold text-gray-900"
                        placeholder="e.g. Powder"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Strength
                      </label>
                      <input
                        type="text"
                        value={strength}
                        onChange={(e) => setStrength(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#2D4D31]/20 focus:bg-white transition-all outline-none text-[14px] font-bold text-gray-900"
                        placeholder="e.g. 100g"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Unit of Measure
                      </label>
                      <input
                        type="text"
                        value={unitOfMeasure}
                        onChange={(e) => setUnitOfMeasure(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#2D4D31]/20 focus:bg-white transition-all outline-none text-[14px] font-bold text-gray-900"
                        placeholder="e.g. Sachet"
                        required
                      />
                    </div>
                  </div>

                  {/* Package Size & NAFDAC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        Package Size
                      </label>
                      <input
                        type="number"
                        value={packageSize}
                        onChange={(e) => setPackageSize(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#2D4D31]/20 focus:bg-white transition-all outline-none text-[14px] font-bold text-gray-900"
                        placeholder="e.g. 1"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                        NAFDAC Reg No
                      </label>
                      <input
                        type="text"
                        value={nafdacRegNo}
                        onChange={(e) => setNafdacRegNo(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#2D4D31]/20 focus:bg-white transition-all outline-none text-[14px] font-bold text-gray-900"
                        placeholder="e.g. 01-1234"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#2D4D31]/20 focus:bg-white transition-all outline-none text-[14px] font-bold text-gray-900 resize-none leading-relaxed"
                      placeholder="Product details..."
                    />
                  </div>

                  {/* Settings / Toggles */}
                  <div className="p-6 bg-gray-50 border border-gray-100 rounded-[32px] space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={requiresColdChain}
                        onChange={(e) => setRequiresColdChain(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-200 text-[#2D4D31] focus:ring-[#2D4D31] cursor-pointer"
                      />
                      <span className="text-[13px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                        Requires Cold Chain
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={requiresPrescription}
                        onChange={(e) => setRequiresPrescription(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-200 text-[#2D4D31] focus:ring-[#2D4D31] cursor-pointer"
                      />
                      <span className="text-[13px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                        Requires Prescription
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-200 text-[#2D4D31] focus:ring-[#2D4D31] cursor-pointer"
                      />
                      <span className="text-[13px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                        Active Status (Display in Storefront)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-8 border-t border-gray-50 flex items-center justify-end gap-3 bg-gray-50/10">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-6 h-12 rounded-xl text-xs font-black uppercase tracking-wider text-gray-500 hover:bg-gray-50 transition-all font-sans"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="px-7 h-12 rounded-xl text-xs font-black uppercase tracking-wider bg-[#2D4D31] text-white hover:bg-[#1a301e] shadow-lg shadow-[#2D4D31]/10 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
