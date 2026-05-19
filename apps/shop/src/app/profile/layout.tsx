import type { Metadata } from "next";
import { ProfileShell } from "./ProfileShell";

export const metadata: Metadata = {
  title: {
    default: "Account",
    template: "%s | Account | Wafrivet Shop",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProfileShell>{children}</ProfileShell>;
}
