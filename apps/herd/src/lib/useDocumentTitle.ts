import { useEffect } from "react";

const DEFAULT_TITLE = "Wafrivet Herd | Operational Console";
const SUFFIX = "Wafrivet Herd";

export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    const previous = document.title;
    document.title = title
      ? `${title} | ${SUFFIX}`
      : DEFAULT_TITLE;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
