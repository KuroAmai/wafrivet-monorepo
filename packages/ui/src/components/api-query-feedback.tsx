import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type ApiQueryFeedbackProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  onRetry?: () => void;
  className?: string;
  children?: ReactNode;
};

function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-[#2D4D31]",
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

export function LoadingState({
  message = "Loading…",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-14 px-6",
        className,
      )}
    >
      <Spinner />
      <p className="text-sm font-medium text-gray-700">{message}</p>
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  message = "Check back soon — new items will show up here.",
  className,
}: {
  title?: string;
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50/90 py-14 px-6 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm ring-1 ring-gray-100">
        <InboxIcon className="h-6 w-6" />
      </div>
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="max-w-sm text-sm leading-relaxed text-gray-600">{message}</p>
    </div>
  );
}

export function ApiQueryFeedback({
  isLoading,
  isError,
  errorMessage,
  isEmpty,
  emptyTitle,
  emptyMessage = "Check back soon — new items will show up here.",
  loadingMessage = "Loading…",
  onRetry,
  className,
  children,
}: ApiQueryFeedbackProps) {
  if (isLoading) {
    return <LoadingState message={loadingMessage} className={className} />;
  }
  if (isError) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50/90 px-6 py-12 text-center",
          className,
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-red-500 shadow-sm ring-1 ring-red-100">
          <span className="text-xl font-bold" aria-hidden>
            !
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-900">Something went wrong</p>
        <p className="max-w-sm text-sm text-gray-600">
          {errorMessage ?? "We couldn't load this content. Please try again."}
        </p>
        {errorMessage?.toLowerCase().includes("supplier profile not found") ? (
          <p className="max-w-sm text-sm text-gray-600">
            Complete supplier onboarding in the main app, then return here.
          </p>
        ) : null}
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 rounded-xl bg-[#2D4D31] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#243f28]"
          >
            Try again
          </button>
        ) : null}
      </div>
    );
  }
  if (isEmpty) {
    return (
      <EmptyState title={emptyTitle} message={emptyMessage} className={className} />
    );
  }
  return <>{children}</>;
}
