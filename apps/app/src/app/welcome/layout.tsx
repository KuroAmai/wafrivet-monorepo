import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="px-6 lg:px-10 pt-8 pb-0">
        <Link href={process.env.NEXT_PUBLIC_MARKETING_URL || "https://www.wafrivet.com"}>
          <Image
            src="/logo-mark.svg"
            alt="Wafrivet"
            width={130}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
        {children}
      </main>

      <footer className="px-6 pb-8 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Wafrivet &nbsp;·&nbsp;
          <Link href="#" className="hover:text-gray-600 transition-colors">Privacy</Link>
          &nbsp;·&nbsp;
          <Link href="#" className="hover:text-gray-600 transition-colors">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
