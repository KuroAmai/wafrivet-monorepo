import type { AxiosError } from "axios";
import { ApiRequestError } from "@wafrivet/types";

export function normalizeAxiosError(error: unknown): ApiRequestError {
  if (error instanceof ApiRequestError) {
    return error;
  }
  const ax = error as AxiosError<{ code?: string; message?: string; details?: unknown }>;
  const status = ax.response?.status ?? 0;
  const body = ax.response?.data;
  const message =
    body?.message ?? ax.message ?? "Request failed";
  const code = body?.code;
  return new ApiRequestError(message, status, code, body?.details);
}
