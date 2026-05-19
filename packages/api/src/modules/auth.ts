import type {
  AuthTokenResponseDto,
  AuthUserProfileDto,
  LoginDto,
  RefreshTokenDto,
  SignupDto,
} from "@wafrivet/types";
import { apiClient } from "../client";
import { clearAccessToken, setAccessToken } from "../tokenStore";

export async function login(credentials: LoginDto): Promise<AuthTokenResponseDto> {
  const { data } = await apiClient.post<AuthTokenResponseDto>("/auth/login", credentials);
  setAccessToken(data.accessToken, data.expiresIn);
  return data;
}

export async function signup(body: SignupDto): Promise<AuthUserProfileDto> {
  const { data } = await apiClient.post<AuthUserProfileDto>("/auth/signup", body);
  return data;
}

export async function refresh(body: RefreshTokenDto = {}): Promise<AuthTokenResponseDto> {
  const { data } = await apiClient.post<AuthTokenResponseDto>("/auth/refresh", body);
  setAccessToken(data.accessToken, data.expiresIn);
  return data;
}

export async function logout(userId?: string): Promise<void> {
  try {
    await apiClient.post("/auth/logout", userId ? { userId } : {});
  } finally {
    clearAccessToken();
  }
}

export async function getMe(): Promise<AuthUserProfileDto> {
  const { data } = await apiClient.get<AuthUserProfileDto>("/auth/me");
  return data;
}

export async function verifyEmail(email: string, token?: string): Promise<void> {
  await apiClient.post("/auth/verify-email", { email, token });
}

export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post("/auth/forgot-password", { email });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await apiClient.post("/auth/reset-password", { token, password });
}
