"use client";

import { useEffect, useState } from "react";
import type { GatewayOnboardingRole, RegionDto } from "@wafrivet/types";

export type BusinessFormValues = {
  regionId: string;
  businessName: string;
  phone: string;
  address: string;
  city: string;
  latitude: string;
  longitude: string;
  vcnLicenseNumber: string;
  nafdacLicenseNumber: string;
  cacNumber: string;
  workingHours: string;
};

type BusinessOnboardingFormProps = {
  gatewayRole: GatewayOnboardingRole;
  values: BusinessFormValues;
  errors: Partial<Record<keyof BusinessFormValues, string>>;
  onChange: (field: keyof BusinessFormValues, value: string) => void;
};

function Field({
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3.5 rounded-xl border text-[15px] outline-none transition-all ${
          error
            ? "border-red-400 bg-red-50"
            : "border-gray-200 bg-gray-50 focus:border-[#2D4D31] focus:bg-white"
        }`}
      />
      {error ? <p className="text-[12px] text-red-500 pl-1">{error}</p> : null}
    </div>
  );
}

function parseRegionsPayload(data: unknown): RegionDto[] {
  if (!data || typeof data !== "object") return [];
  const payload = data as { data?: RegionDto[]; regions?: RegionDto[] };
  return payload.data ?? payload.regions ?? [];
}

export function BusinessOnboardingForm({
  gatewayRole,
  values,
  errors,
  onChange,
}: BusinessOnboardingFormProps) {
  const [regions, setRegions] = useState<RegionDto[]>([]);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [regionsError, setRegionsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setRegionsLoading(true);
      setRegionsError(null);
      try {
        const res = await fetch("/api/regions?limit=100");
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(body.message ?? "Could not load regions");
        }
        if (!cancelled) {
          setRegions(parseRegionsPayload(body));
        }
      } catch (e) {
        if (!cancelled) {
          setRegionsError(e instanceof Error ? e.message : "Could not load regions");
        }
      } finally {
        if (!cancelled) setRegionsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4 max-h-[min(52vh,420px)] overflow-y-auto pr-1">
      <Field
        label="Business name"
        value={values.businessName}
        error={errors.businessName}
        onChange={(v) => onChange("businessName", v)}
        placeholder="e.g. Okafor Agro-Vet"
      />
      <Field
        label="Phone"
        value={values.phone}
        error={errors.phone}
        onChange={(v) => onChange("phone", v)}
        placeholder="+234 800 000 0000"
      />
      <div className="space-y-1.5">
        <label className="block text-[13px] font-medium text-gray-600">Region</label>
        <select
          value={values.regionId}
          onChange={(e) => onChange("regionId", e.target.value)}
          disabled={regionsLoading}
          className={`w-full px-4 py-3.5 rounded-xl border text-[15px] outline-none transition-all ${
            errors.regionId
              ? "border-red-400 bg-red-50"
              : "border-gray-200 bg-gray-50 focus:border-[#2D4D31] focus:bg-white"
          }`}
        >
          <option value="">
            {regionsLoading ? "Loading regions…" : "Select a region"}
          </option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        {errors.regionId ? (
          <p className="text-[12px] text-red-500 pl-1">{errors.regionId}</p>
        ) : null}
        {regionsError ? (
          <p className="text-[12px] text-amber-700 pl-1">{regionsError}</p>
        ) : null}
      </div>
      <Field
        label="Address"
        value={values.address}
        error={errors.address}
        onChange={(v) => onChange("address", v)}
        placeholder="Street address"
      />
      <Field
        label="City"
        value={values.city}
        error={errors.city}
        onChange={(v) => onChange("city", v)}
        placeholder="e.g. Lagos"
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Latitude"
          type="number"
          value={values.latitude}
          error={errors.latitude}
          onChange={(v) => onChange("latitude", v)}
          placeholder="6.5244"
        />
        <Field
          label="Longitude"
          type="number"
          value={values.longitude}
          error={errors.longitude}
          onChange={(v) => onChange("longitude", v)}
          placeholder="3.3792"
        />
      </div>
      {gatewayRole === "VET" ? (
        <Field
          label="VCN license number"
          value={values.vcnLicenseNumber}
          error={errors.vcnLicenseNumber}
          onChange={(v) => onChange("vcnLicenseNumber", v)}
          placeholder="Required for veterinarians"
        />
      ) : null}
      {gatewayRole === "SUPPLIER" || gatewayRole === "MANUFACTURER" ? (
        <Field
          label="NAFDAC license number"
          value={values.nafdacLicenseNumber}
          error={errors.nafdacLicenseNumber}
          onChange={(v) => onChange("nafdacLicenseNumber", v)}
          placeholder="Required for suppliers"
        />
      ) : null}
      <Field
        label="CAC number (optional)"
        value={values.cacNumber}
        error={errors.cacNumber}
        onChange={(v) => onChange("cacNumber", v)}
        placeholder="RC number"
      />
      <Field
        label="Working hours (optional)"
        value={values.workingHours}
        error={errors.workingHours}
        onChange={(v) => onChange("workingHours", v)}
        placeholder="Mon–Sat 8am–6pm"
      />
    </div>
  );
}

export function validateBusinessForm(
  values: BusinessFormValues,
  gatewayRole: GatewayOnboardingRole,
): Partial<Record<keyof BusinessFormValues, string>> {
  const errors: Partial<Record<keyof BusinessFormValues, string>> = {};
  if (!values.businessName.trim()) errors.businessName = "Business name is required";
  if (!values.phone.trim()) errors.phone = "Phone is required";
  if (!values.regionId.trim()) errors.regionId = "Region is required";
  if (!values.address.trim()) errors.address = "Address is required";
  if (!values.city.trim()) errors.city = "City is required";
  const lat = Number(values.latitude);
  const lng = Number(values.longitude);
  if (Number.isNaN(lat) || lat < -90 || lat > 90) errors.latitude = "Enter a valid latitude";
  if (Number.isNaN(lng) || lng < -180 || lng > 180) errors.longitude = "Enter a valid longitude";
  if (gatewayRole === "VET" && !values.vcnLicenseNumber.trim()) {
    errors.vcnLicenseNumber = "VCN license is required";
  }
  if (
    (gatewayRole === "SUPPLIER" || gatewayRole === "MANUFACTURER") &&
    !values.nafdacLicenseNumber.trim()
  ) {
    errors.nafdacLicenseNumber = "NAFDAC license is required";
  }
  return errors;
}

export const emptyBusinessForm = (): BusinessFormValues => ({
  regionId: "",
  businessName: "",
  phone: "",
  address: "",
  city: "",
  latitude: "6.5244",
  longitude: "3.3792",
  vcnLicenseNumber: "",
  nafdacLicenseNumber: "",
  cacNumber: "",
  workingHours: "",
});
