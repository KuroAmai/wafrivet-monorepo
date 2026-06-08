import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "./config";
import { normalizeAxiosError } from "./errors";
import { clearAccessToken, getAccessToken, hydrateTokenFromSession, setAccessToken } from "./tokenStore";

export type CreateApiClientOptions = {
  baseURL?: string;
};

let refreshPromise: Promise<string | null> | null = null;

type TokenRefreshPayload = {
  accessToken?: string;
  access_token?: string;
  expiresIn?: number;
  expires_in?: number;
};

function readAccessTokenFromPayload(data: TokenRefreshPayload): string | null {
  const token = data.accessToken ?? data.access_token;
  return typeof token === "string" && token.length > 0 ? token : null;
}

/** Always refresh against the gateway auth route, not a service-specific base URL. */
async function refreshAccessToken(): Promise<string | null> {
  try {
    const { data } = await axios.post<TokenRefreshPayload>(
      `${API_CONFIG.gatewayUrl}/auth/refresh`,
      {},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json", Authorization: undefined },
      },
    );
    const token = readAccessTokenFromPayload(data);
    if (!token) {
      clearAccessToken();
      return null;
    }
    const expiresIn = data.expiresIn ?? data.expires_in ?? 3600;
    setAccessToken(token, expiresIn);
    return token;
  } catch {
    clearAccessToken();
    return null;
  }
}

export function createApiClient(options: CreateApiClientOptions = {}): AxiosInstance {
  hydrateTokenFromSession();

  const client = axios.create({
    baseURL: options.baseURL ?? API_CONFIG.gatewayUrl,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    async (error) => {
      const normalized = normalizeAxiosError(error);
      const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      if (normalized.status === 401 && original && !original._retry) {
        original._retry = true;
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }
        const newToken = await refreshPromise;
        if (newToken) {
          original.headers.Authorization = `Bearer ${newToken}`;
          return client(original);
        }
      }
      return Promise.reject(normalized);
    },
  );

  return client;
}

export const apiClient = createApiClient();

export function createCoreClient(): AxiosInstance {
  return createApiClient({ baseURL: API_CONFIG.coreUrl });
}
