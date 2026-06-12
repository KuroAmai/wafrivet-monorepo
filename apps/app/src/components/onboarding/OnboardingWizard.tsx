"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import type {
  GatewayOnboardingRole,
  PlatformSelectableRole,
  RoleOptionDto,
} from "@wafrivet/types";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { StepTransition } from "@/components/auth/FormAnimations";
import { AVATAR_SEEDS, dicebearAvatarUrl } from "@/lib/dicebear";
import { clearRolesConfirmed, markRolesConfirmed } from "@/lib/onboardingSession";
import { FALLBACK_ROLE_OPTIONS } from "@/lib/roleOptionsFallback";
import {
  platformRoleToKycRole,
  resolveKycRoleForSelection,
} from "@/lib/platformRoles";
import { readStoredReturnTo } from "@/lib/authReturnTo";
import { resolvePostAuthDestination } from "@/lib/resolvePostAuthDestination";
import { AvatarPicker } from "./AvatarPicker";
import { OnboardingProgress } from "./OnboardingProgress";
import {
  BusinessOnboardingForm,
  emptyBusinessForm,
  validateBusinessForm,
  type BusinessFormValues,
} from "./BusinessOnboardingForm";

const PROGRESS_LABELS = ["Avatar", "Your name", "Your role", "Business details"];
const SESSION_STORAGE_KEY = "wafrivet_onboarding_session";

function filterProfessionalRoleOptions(options: RoleOptionDto[]): RoleOptionDto[] {
  return options.filter((r) => r.id !== "REGULAR_CUSTOMER");
}

async function refreshAuthSession() {
  await fetch("/api/auth/refresh", { method: "POST", credentials: "same-origin" });
}

async function navigateAfterOnboarding() {
  const destination = await resolvePostAuthDestination(readStoredReturnTo());
  if (destination.startsWith("http")) {
    window.location.href = destination;
    return;
  }
  window.location.href = destination;
}

export function OnboardingWizard() {
  const searchParams = useSearchParams();
  const changeRole = searchParams.get("changeRole") === "1";
  const preselectedRole = searchParams.get("role")?.toUpperCase() as
    | PlatformSelectableRole
    | undefined;

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [avatarSeed, setAvatarSeed] = useState<string>(AVATAR_SEEDS[0]);
  const [displayName, setDisplayName] = useState("");
  const [roleOptions, setRoleOptions] = useState<RoleOptionDto[]>(
    filterProfessionalRoleOptions(FALLBACK_ROLE_OPTIONS),
  );
  const [selectedRole, setSelectedRole] = useState<PlatformSelectableRole | undefined>();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [gatewayRole, setGatewayRole] = useState<GatewayOnboardingRole | null>(null);
  const [business, setBusiness] = useState<BusinessFormValues>(emptyBusinessForm);
  const [businessErrors, setBusinessErrors] = useState<
    Partial<Record<keyof BusinessFormValues, string>>
  >({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(true);

  const goTo = useCallback((next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    setApiError(null);
  }, [step]);

  const loadRoleOptions = useCallback(async () => {
    const res = await fetch("/api/roles/options", { credentials: "same-origin" });
    const body = await res.json().catch(() => ({}));
    if (res.ok && Array.isArray(body.roles)) {
      setRoleOptions(filterProfessionalRoleOptions(body.roles));
    }
  }, []);

  const startKycSession = async (role: GatewayOnboardingRole) => {
    const res = await fetch("/api/onboarding/start", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(body.message ?? "Could not start onboarding.");
    }
    const id = body.id ?? body.sessionId;
    if (!id) {
      throw new Error("Onboarding session id missing from server response.");
    }
    const sid = String(id);
    setSessionId(sid);
    setGatewayRole(role);
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({ sessionId: sid, gatewayRole: role }),
      );
    }
    goTo(4);
  };

  const completeRoleSelection = async (role: PlatformSelectableRole) => {
    const selectRes = await fetch("/api/roles/select", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roles: [role] }),
    });
    const selectBody = await selectRes.json().catch(() => ({}));
    if (!selectRes.ok) {
      throw new Error(selectBody.message ?? "Could not save your role.");
    }

    markRolesConfirmed();
    await refreshAuthSession();

    const kycRequired: GatewayOnboardingRole[] = selectBody.user?.kyc_required_for ?? [];

    if (kycRequired.length === 0) {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
      await navigateAfterOnboarding();
      return;
    }

    const kycRole = resolveKycRoleForSelection(role, kycRequired);
    await startKycSession(kycRole);
  };

  useEffect(() => {
    if (!changeRole) return;
    clearRolesConfirmed();
    if (
      preselectedRole &&
      preselectedRole !== "REGULAR_CUSTOMER" &&
      filterProfessionalRoleOptions(FALLBACK_ROLE_OPTIONS).some((r) => r.id === preselectedRole)
    ) {
      setSelectedRole(preselectedRole);
    }
    setStep(3);
    setBootstrapping(false);
    void loadRoleOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeRole, preselectedRole]);

  useEffect(() => {
    if (changeRole) return;
    let cancelled = false;
    (async () => {
      try {
        await loadRoleOptions();
        const meRes = await fetch("/api/auth/me", { credentials: "same-origin" });
        if (!meRes.ok) return;
        const me = await meRes.json();
        const kyc: GatewayOnboardingRole[] =
          me.kyc_required_for ?? me.user?.kyc_required_for ?? [];

        if (kyc.length > 0) {
          const stored =
            typeof sessionStorage !== "undefined"
              ? sessionStorage.getItem(SESSION_STORAGE_KEY)
              : null;
          let resumeRole = kyc[0];
          let resumeId: string | null = null;
          if (stored) {
            try {
              const parsed = JSON.parse(stored) as {
                sessionId?: string;
                gatewayRole?: GatewayOnboardingRole;
              };
              resumeId = parsed.sessionId ?? null;
              resumeRole = parsed.gatewayRole ?? resumeRole;
            } catch {
              /* ignore */
            }
          }
          if (!cancelled) {
            setGatewayRole(resumeRole);
            if (resumeId) setSessionId(resumeId);
            goTo(4);
            if (!resumeId) {
              await startKycSession(resumeRole);
            }
          }
        }
      } finally {
        if (!cancelled) setBootstrapping(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSkipShopper = async () => {
    setApiError(null);
    setLoading(true);
    try {
      await completeRoleSelection("REGULAR_CUSTOMER");
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    setApiError(null);
    if (step === 1) {
      goTo(2);
      return;
    }
    if (step === 2) {
      if (displayName.trim().length < 2) {
        setApiError("Please enter what we should call you.");
        return;
      }
      goTo(3);
      return;
    }
    if (step === 3) {
      if (!selectedRole) {
        setApiError("Select a professional role, or skip to browse as a shopper.");
        return;
      }
      setLoading(true);
      try {
        await completeRoleSelection(selectedRole);
      } catch (e) {
        setApiError(e instanceof Error ? e.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (step === 4 && sessionId && gatewayRole) {
      const errors = validateBusinessForm(business, gatewayRole);
      setBusinessErrors(errors);
      if (Object.keys(errors).length > 0) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/onboarding/${sessionId}/submit`, {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: gatewayRole,
            regionId: business.regionId.trim(),
            businessName: business.businessName.trim(),
            phone: business.phone.trim(),
            address: business.address.trim(),
            city: business.city.trim(),
            latitude: Number(business.latitude),
            longitude: Number(business.longitude),
            ...(business.vcnLicenseNumber.trim()
              ? { vcnLicenseNumber: business.vcnLicenseNumber.trim() }
              : {}),
            ...(business.nafdacLicenseNumber.trim()
              ? { nafdacLicenseNumber: business.nafdacLicenseNumber.trim() }
              : {}),
            ...(business.cacNumber.trim() ? { cacNumber: business.cacNumber.trim() } : {}),
            ...(business.workingHours.trim()
              ? { workingHours: business.workingHours.trim() }
              : {}),
          }),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(body.message ?? "Could not complete onboarding.");
        }
        if (typeof sessionStorage !== "undefined") {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
        await navigateAfterOnboarding();
      } catch (e) {
        setApiError(e instanceof Error ? e.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step <= 1) return;
    goTo(step - 1);
  };

  const needsKycStep = Boolean(gatewayRole && sessionId);
  const progressTotal = needsKycStep || (selectedRole && platformRoleToKycRole(selectedRole))
    ? 4
    : 3;
  const progressStep = step;

  const finishLabel =
    step === 4 ||
    (step === 3 &&
      selectedRole &&
      (platformRoleToKycRole(selectedRole) === null ||
        !roleOptions.find((r) => r.id === selectedRole)?.requires_kyc));

  if (bootstrapping) {
    return (
      <div className="flex items-center justify-center py-16 text-[15px] text-gray-600">
        Loading…
      </div>
    );
  }

  return (
    <div>
      <OnboardingProgress
        step={progressStep}
        total={progressTotal}
        labels={PROGRESS_LABELS}
      />

      {changeRole ? (
        <p className="mb-4 rounded-xl border border-[#2D4D31]/15 bg-[#f7faf7] px-4 py-3 text-sm text-[#2D4D31]">
          You can add or switch your professional role here. Your shopper account stays active unless
          you replace it with a different role.
        </p>
      ) : null}

      {apiError ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {apiError}
        </p>
      ) : null}

      <StepTransition step={step} direction={direction}>
        {step === 1 ? (
          <div>
            <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">
              Pick your avatar
            </h1>
            <p className="text-[15px] text-gray-600 mt-1.5 mb-6">
              Choose a look for your Wafrivet profile
            </p>
            <AvatarPicker selectedSeed={avatarSeed} onSelect={setAvatarSeed} />
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">
              What should we call you?
            </h1>
            <p className="text-[15px] text-gray-600 mt-1.5 mb-6">
              This is how you&apos;ll appear across Wafrivet
            </p>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full border border-[#2D4D31]/15 overflow-hidden bg-[#f0f4f0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dicebearAvatarUrl(avatarSeed)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-600">
                Display name
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Emeka"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-[15px] outline-none focus:border-[#2D4D31] focus:bg-white"
              />
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div>
            <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">
              How will you use Wafrivet?
            </h1>
            <p className="text-[15px] text-gray-600 mt-1.5 mb-6">
              Choose a professional role below, or skip to browse the shop as a customer.
            </p>
            <RoleSelector
              options={roleOptions}
              selectedRole={selectedRole}
              onSelect={setSelectedRole}
            />
            <button
              type="button"
              onClick={handleSkipShopper}
              disabled={loading}
              className="w-full mt-4 py-3 text-[14px] font-semibold text-[#2D4D31] hover:underline disabled:opacity-50"
            >
              Skip for now — browse as a shopper
            </button>
          </div>
        ) : null}

        {step === 4 && gatewayRole ? (
          <div>
            <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">
              Business details
            </h1>
            <p className="text-[15px] text-gray-600 mt-1.5 mb-6">
              Required to complete your professional profile
            </p>
            <BusinessOnboardingForm
              gatewayRole={gatewayRole}
              values={business}
              errors={businessErrors}
              onChange={(field, value) =>
                setBusiness((prev) => ({ ...prev, [field]: value }))
              }
            />
          </div>
        ) : null}
      </StepTransition>

      <div className="flex gap-3 mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            disabled={loading}
            className="h-[52px] px-5 flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-[15px] hover:bg-gray-50 disabled:opacity-50"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        ) : null}
        <button
          type="button"
          onClick={handleContinue}
          disabled={loading || (step === 3 && !selectedRole)}
          className="flex-1 h-[52px] flex items-center justify-center gap-2 bg-[#2D4D31] text-white font-semibold text-[15px] rounded-xl hover:bg-[#243f28] transition-all disabled:opacity-60"
        >
          {loading ? (
            "Saving…"
          ) : (
            <>
              {finishLabel ? "Finish" : "Continue"} <ArrowRight size={17} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
