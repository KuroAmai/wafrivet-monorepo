import type {
  OnboardingSessionDto,
  StartOnboardingDto,
  SubmitOnboardingDto,
  UpdateUserProfileDto,
} from "@wafrivet/types";
import { apiClient } from "../client";

export async function startOnboarding(
  body: StartOnboardingDto,
): Promise<OnboardingSessionDto> {
  const { data } = await apiClient.post<OnboardingSessionDto>("/onboarding/start", body);
  return data;
}

export async function submitOnboarding(
  sessionId: string,
  body: SubmitOnboardingDto,
): Promise<unknown> {
  const { data } = await apiClient.post(`/onboarding/${sessionId}/submit`, body);
  return data;
}

export async function updateProfile(body: UpdateUserProfileDto): Promise<unknown> {
  const { data } = await apiClient.patch("/users/profile", body);
  return data;
}
