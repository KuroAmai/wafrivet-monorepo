import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import * as React from "react";

type LinkProps = Omit<NextLinkProps, "href"> & {
  to: string;
};

export function LinkShim({ to, ...props }: LinkProps) {
  // Cast avoids duplicate @types/react Key mismatch in the monorepo on Vercel.
  const linkProps = { href: to, ...props } as NextLinkProps;
  return <NextLink {...linkProps} />;
}

export const Link: typeof LinkShim = LinkShim;

export function useLocation() {
  const [state, setState] = React.useState<{ hash: string; pathname: string }>(() => {
    if (typeof window === "undefined") return { hash: "", pathname: "" };
    return { hash: window.location.hash || "", pathname: window.location.pathname || "" };
  });

  React.useEffect(() => {
    const onChange = () =>
      setState({
        hash: window.location.hash || "",
        pathname: window.location.pathname || "",
      });

    window.addEventListener("hashchange", onChange);
    window.addEventListener("popstate", onChange);
    return () => {
      window.removeEventListener("hashchange", onChange);
      window.removeEventListener("popstate", onChange);
    };
  }, []);

  return state;
}

export function BrowserRouter({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Routes({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Route() {
  return null;
}

