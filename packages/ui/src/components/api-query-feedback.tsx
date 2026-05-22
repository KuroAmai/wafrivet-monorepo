import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type ApiQueryFeedbackProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
  onRetry?: () => void;
  className?: string;
  children?: ReactNode;
};

export function ApiQueryFeedback({
  isLoading,
  isError,
  errorMessage,
  isEmpty,
  emptyMessage = "No data returned from the API.",
  onRetry,
  className,
  children,
}: ApiQueryFeedbackProps) {
  if (isLoading) {
    return (
      <p className={cn("text-sm text-gray-500 py-4", className)}>Loading live data…</p>
    );
  }
  if (isError) {
    return (
      <div
        className={cn(
          "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800",
          className,
        )}
      >
        <p className="font-medium">Could not load live data</p>
        <p className="mt-1 text-red-700/90">{errorMessage ?? "Check login, CORS, and API URL."}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-sm font-semibold underline"
          >
            Retry
          </button>
        ) : null}
      </div>
    );
  }
  if (isEmpty) {
    return (
      <p className={cn("text-sm text-gray-500 py-4", className)}>{emptyMessage}</p>
    );
  }
  return <>{children}</>;
}
