import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Orders",
    template: "%s | Orders | Wafrivet Shop",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
