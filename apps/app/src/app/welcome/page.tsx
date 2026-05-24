import Link from "next/link";
import { redirect } from "next/navigation";
import { Plant, Storefront, GearSix, ArrowRight, SignOut } from "@phosphor-icons/react/dist/ssr";
import {
  getShopBaseUrl,
  getShopEntryUrl,
  hasAdminAccess,
  normalizeUserRole,
  type UserRole,
} from "@wafrivet/auth";
import { getServerAuth } from "@wafrivet/auth/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Welcome | Wafrivet",
};

type AppCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  external: boolean;
  Icon: React.ComponentType<{ size?: number | string; className?: string; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone" }>;
};

export default async function WelcomePage() {
  const auth = await getServerAuth();

  if (!auth.authenticated) {
    redirect("/login");
  }

  const user = (auth as { user?: { name?: string; location?: string } }).user;
  const role = (auth as { role?: string }).role;
  const roles = (auth as { roles?: string[] }).roles ?? (role ? [role] : []);

  if (hasAdminAccess(roles)) {
    redirect("/admin");
  }

  const productRole = normalizeUserRole(role);

  if (productRole === "customer") {
    redirect(getShopBaseUrl());
  }

  const fullName = user?.name?.trim() || "there";
  const firstName = fullName.split(" ")[0] || fullName;

  const herdUrl = process.env.NEXT_PUBLIC_HERD_URL || "https://herd.wafrivet.com";
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.wafrivet.com";
  const accountHref = productRole === "admin" ? "/admin" : "/dashboard";

  const allCards: AppCard[] = [
    {
      id: "herd",
      title: "Herd",
      description: "Manage your herd, vitals, and health records.",
      href: herdUrl,
      external: true,
      Icon: Plant,
    },
    {
      id: "shop",
      title: "Shop",
      description: "Order medicine and supplies.",
      href: shopUrl,
      external: true,
      Icon: Storefront,
    },
    {
      id: "account",
      title: "Account",
      description: "Settings, billing, and profile.",
      href: accountHref,
      external: false,
      Icon: GearSix,
    },
  ];

  const cards = cardsForRole(productRole, allCards, shopUrl);

  const avatarUrl = `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(fullName)}`;

  return (
    <div className="w-full max-w-[860px]">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-20 h-20 rounded-full bg-[#f0f4f0] border border-[#2D4D31]/15 overflow-hidden mb-5 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt={fullName}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight leading-tight">
          Welcome back, {firstName}
        </h1>
        <p className="text-[15px] text-gray-500 mt-1.5">
          What would you like to do today?
        </p>
      </div>

      <div
        className={`grid grid-cols-1 gap-3 ${
          cards.length === 1 ? "max-w-sm mx-auto" : cards.length === 2 ? "sm:grid-cols-2 max-w-xl mx-auto" : "sm:grid-cols-3"
        }`}
      >
        {cards.map(({ id, title, description, href, external, Icon }) => {
          const cardClass =
            "group text-left p-5 rounded-xl border border-gray-200 bg-gray-50 hover:border-[#2D4D31] hover:bg-[#f0f4f0] transition-all duration-200 active:scale-[0.99] flex flex-col h-full";

          const inner = (
            <>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#2D4D31]/20 transition-colors">
                  <Icon size={22} weight="duotone" className="text-[#2D4D31]" />
                </div>
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="text-gray-300 group-hover:text-[#2D4D31] group-hover:translate-x-0.5 transition-all"
                />
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mt-4">{title}</h3>
              <p className="text-[13px] text-gray-500 mt-1 leading-snug">{description}</p>
            </>
          );

          return external ? (
            <a key={id} href={href} className={cardClass}>
              {inner}
            </a>
          ) : (
            <Link key={id} href={href} className={cardClass}>
              {inner}
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/logout"
          className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          <SignOut size={14} weight="regular" />
          Sign out
        </Link>
      </div>
    </div>
  );
}

function cardsForRole(
  role: UserRole | null,
  cards: AppCard[],
  shopUrl: string,
): AppCard[] {
  if (!role) return cards;

  const herd = cards.find((c) => c.id === "herd")!;
  const account = cards.find((c) => c.id === "account")!;

  switch (role) {
    case "farmer":
    case "vet":
      return [
        herd,
        { ...cards.find((c) => c.id === "shop")!, description: "Order medicine and supplies for your herd." },
        account,
      ];
    case "chemist":
      return [
        {
          id: "shop",
          title: "Shop dashboard",
          description: "Manage inventory, orders, and your storefront.",
          href: getShopEntryUrl("chemist"),
          external: true,
          Icon: Storefront,
        },
        account,
      ];
    case "distributor":
      return [
        {
          id: "shop",
          title: "Distributor portal",
          description: "Manage your chemist network and supply chain.",
          href: getShopEntryUrl("distributor"),
          external: true,
          Icon: Storefront,
        },
        account,
      ];
    case "admin":
      return cards.map((c) =>
        c.id === "account"
          ? { ...c, title: "Admin", description: "Platform settings and operations.", href: "/admin" }
          : c,
      );
    default:
      return cards;
  }
}
