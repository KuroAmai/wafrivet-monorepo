import type {
  AuthTokenResponseDto,
  AuthUserProfileDto,
  LoginDto,
  RefreshTokenDto,
  SignupDto,
} from "@wafrivet/types";
import { apiClient } from "../client";
import { clearAccessToken, setAccessToken } from "../tokenStore";

function persistTokenFromAuthResponse(data: AuthTokenResponseDto & { access_token?: string; expires_in?: number }) {
  const token = data.accessToken ?? data.access_token;
  const expiresIn = data.expiresIn ?? data.expires_in ?? 3600;
  if (token) {
    setAccessToken(token, expiresIn);
  }
}

export async function login(credentials: LoginDto): Promise<AuthTokenResponseDto> {
  const { data } = await apiClient.post<AuthTokenResponseDto & { access_token?: string; expires_in?: number }>(
    "/auth/login",
    credentials,
  );
  persistTokenFromAuthResponse(data);
  return {
    accessToken: data.accessToken ?? data.access_token ?? "",
    expiresIn: data.expiresIn ?? data.expires_in ?? 3600,
  };
}

export async function signup(body: SignupDto): Promise<AuthUserProfileDto> {
  const { data } = await apiClient.post<AuthUserProfileDto>("/auth/signup", body);
  return data;
}

export async function refresh(body: RefreshTokenDto = {}): Promise<AuthTokenResponseDto> {
  const { data } = await apiClient.post<AuthTokenResponseDto & { access_token?: string; expires_in?: number }>(
    "/auth/refresh",
    body,
  );
  persistTokenFromAuthResponse(data);
  return {
    accessToken: data.accessToken ?? data.access_token ?? "",
    expiresIn: data.expiresIn ?? data.expires_in ?? 3600,
  };
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
