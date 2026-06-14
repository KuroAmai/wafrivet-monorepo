// TODO: Account panel rows use href="#" intentionally; sub-routes for profile, wallet, security, and notifications are not implemented yet.
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Bell,
  CaretRight,
  ChartLine,
  CurrencyCircleDollar,
  GearSix,
  IdentificationBadge,
  Package,
  Plant,
  ShieldCheck,
  ShoppingCart,
  Storefront,
  User,
  UsersThree,
  Wallet,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { getServerAuth } from "@wafrivet/auth/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const auth = await getServerAuth();

  if (!auth.authenticated) {
    redirect("/login");
  }

  const user = (auth as { user?: { name?: string; location?: string } }).user;
  const role = (auth as { role?: string }).role as
    | "farmer"
    | "vet"
    | "chemist"
    | "distributor"
    | "admin"
    | undefined;

  const fullName = user?.name?.trim() || "there";
  const firstName = fullName.split(" ")[0] || fullName;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const herdUrl = process.env.NEXT_PUBLIC_HERD_URL || "https://herd.wafrivet.com";
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.wafrivet.com";

  const avatarUrl = `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(fullName)}`;

  const roleChipLabel =
    role === "vet"
      ? "VET"
      : role === "chemist"
        ? "CHEMIST"
        : role === "distributor"
          ? "DISTRIBUTOR"
          : role === "admin"
            ? "ADMIN"
            : role === "farmer"
              ? "FARMER"
              : "GUEST";

  const quickActionCardClass =
    "group block rounded-[32px] bg-white border border-gray-100 shadow-sm p-6 hover:border-[#2D4D31]/20 hover:shadow-md transition-all active:scale-[0.99]";

  const isFarmerVet = role === "farmer" || role === "vet";
  const isChemist = role === "chemist";
  const isDistributor = role === "distributor";
  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-[1100px]">
      {/* Greeting hero */}
      <div className="rounded-[32px] bg-white border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="flex items-start gap-4 md:gap-5 min-w-0">
          <div className="w-16 h-16 rounded-full bg-[#f0f4f0] border border-[#2D4D31]/15 overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={fullName}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 space-y-2">
            <h1 className="text-[22px] md:text-[26px] font-black text-gray-900 tracking-tight leading-tight">
              {greeting}, {firstName}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#2D4D31]">
                {roleChipLabel}
              </span>
            </div>
            {user?.location ? (
              <p className="text-[13px] text-gray-500 font-medium">{user.location}</p>
            ) : null}
          </div>
        </div>

        <div className="hidden lg:block shrink-0 w-full max-w-[280px]">
          <div className="rounded-[24px] border border-gray-100 bg-gray-50/80 p-5 shadow-inner">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
              Wallet Balance
            </p>
            <p className="text-[28px] font-black text-gray-900 leading-none tracking-tight">
              ₦24,500.00
            </p>
            <Link
              href="#"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#2D4D31] hover:bg-emerald-100 transition-colors"
            >
              Top up
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isFarmerVet ? (
            <>
              <a href={herdUrl} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <Plant size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Herd App</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Manage animals, vitals, and herd records.
                </p>
              </a>
              <a href={shopUrl} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <Storefront size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Shop</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Order medicine, vaccines, and supplies.
                </p>
              </a>
              <a href={`${herdUrl}/alerts`} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <Warning size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Health Alerts</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Review critical alerts and follow-ups.
                </p>
              </a>
            </>
          ) : isChemist ? (
            <>
              <a href={`${shopUrl}/inventory`} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <Package size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Inventory</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Track stock levels and catalog items.
                </p>
              </a>
              <a href={`${shopUrl}/orders`} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <ShoppingCart size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Orders</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Fulfill and monitor customer orders.
                </p>
              </a>
              <a href={`${shopUrl}/earnings`} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <CurrencyCircleDollar size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Earnings</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  View payouts and revenue trends.
                </p>
              </a>
            </>
          ) : isDistributor ? (
            <>
              <a href={`${shopUrl}/distributor`} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <UsersThree size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">
                  Distributor Network
                </h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Coordinate chemists and coverage areas.
                </p>
              </a>
              <a href={`${shopUrl}/orders`} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <ShoppingCart size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Orders</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Track wholesale orders and deliveries.
                </p>
              </a>
              <a href={`${shopUrl}/insights`} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <ChartLine size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Insights</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Network performance and demand signals.
                </p>
              </a>
            </>
          ) : (
            <>
              <a href={herdUrl} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <Plant size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Herd</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Manage your herd, vitals, and health records.
                </p>
              </a>
              <a href={shopUrl} className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <Storefront size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Shop</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Order medicine and supplies.
                </p>
              </a>
              <Link href="#" className={quickActionCardClass}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] mb-4 group-hover:bg-[#2D4D31]/5 transition-colors">
                  <GearSix size={24} weight="duotone" />
                </div>
                <h3 className="text-[15px] font-black text-gray-900 mb-1">Settings</h3>
                <p className="text-[13px] text-gray-500 leading-snug">
                  Preferences, billing, and workspace controls.
                </p>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isFarmerVet ? (
          <>
            <a
              href={`${herdUrl}/animals`}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-emerald-500/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <IdentificationBadge size={20} weight="bold" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">
                  +12
                </span>
              </div>
              <div>
                <p className="text-[32px] font-black text-gray-900 leading-none">50</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  Active Herd
                </p>
              </div>
            </a>
            <a
              href={`${herdUrl}/alerts`}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-emerald-500/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <Warning size={20} weight="bold" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-red-500">
                  Critical
                </span>
              </div>
              <div>
                <p className="text-[32px] font-black text-gray-900 leading-none">03</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  Health Alerts
                </p>
              </div>
            </a>
          </>
        ) : isChemist ? (
          <>
            <a
              href={`${shopUrl}/orders`}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-emerald-500/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <ShoppingCart size={20} weight="bold" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">
                  +3
                </span>
              </div>
              <div>
                <p className="text-[32px] font-black text-gray-900 leading-none">12</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  Today&apos;s Orders
                </p>
              </div>
            </a>
            <a
              href={`${shopUrl}/inventory`}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-emerald-500/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <Package size={20} weight="bold" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">
                  Action needed
                </span>
              </div>
              <div>
                <p className="text-[32px] font-black text-gray-900 leading-none">04</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  Low Stock
                </p>
              </div>
            </a>
          </>
        ) : isDistributor ? (
          <>
            <a
              href={`${shopUrl}/distributor`}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-emerald-500/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <UsersThree size={20} weight="bold" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">
                  +2
                </span>
              </div>
              <div>
                <p className="text-[32px] font-black text-gray-900 leading-none">18</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  Network
                </p>
              </div>
            </a>
            <a
              href={`${shopUrl}/orders`}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-emerald-500/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <Package size={20} weight="bold" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                  Pending
                </span>
              </div>
              <div>
                <p className="text-[32px] font-black text-gray-900 leading-none">05</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  Pending Shipments
                </p>
              </div>
            </a>
          </>
        ) : (
          <>
            <a
              href={`${herdUrl}/animals`}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-emerald-500/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <IdentificationBadge size={20} weight="bold" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">
                  +12
                </span>
              </div>
              <div>
                <p className="text-[32px] font-black text-gray-900 leading-none">50</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  Active Herd
                </p>
              </div>
            </a>
            <a
              href={`${herdUrl}/alerts`}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-emerald-500/10 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <Warning size={20} weight="bold" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-red-500">
                  Critical
                </span>
              </div>
              <div>
                <p className="text-[32px] font-black text-gray-900 leading-none">03</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  Health Alerts
                </p>
              </div>
            </a>
          </>
        )}
      </section>

      {/* Account panel */}
      <section className="rounded-[32px] bg-white border border-gray-100 shadow-sm p-2">
        <h2 className="px-4 pt-3 pb-2 text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Account
        </h2>
        <div className="rounded-[28px] overflow-hidden">
          <Link
            href="/settings"
            className="group flex items-center justify-between gap-4 px-4 py-4 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                <User size={20} weight="duotone" />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-black text-gray-900 leading-tight">Profile</p>
                <p className="text-[12px] text-gray-500 mt-0.5">Update name, phone, photo</p>
              </div>
            </div>
            <CaretRight
              size={18}
              weight="bold"
              className="text-gray-200 shrink-0 opacity-0 group-hover:opacity-100 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all"
            />
          </Link>
          <Link
            href="#"
            className="group flex items-center justify-between gap-4 px-4 py-4 border-t border-gray-100 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                <Wallet size={20} weight="duotone" />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-black text-gray-900 leading-tight">Wallet</p>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  Manage balance and payment methods
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] font-black text-[#2D4D31] bg-emerald-50 px-2.5 py-1 rounded-full tabular-nums">
                ₦24,500.00
              </span>
              <CaretRight
                size={18}
                weight="bold"
                className="text-gray-200 shrink-0 opacity-0 group-hover:opacity-100 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </Link>
          <Link
            href="#"
            className="group flex items-center justify-between gap-4 px-4 py-4 border-t border-gray-100 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                <ShieldCheck size={20} weight="duotone" />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-black text-gray-900 leading-tight">Security</p>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  Password and two-factor authentication
                </p>
              </div>
            </div>
            <CaretRight
              size={18}
              weight="bold"
              className="text-gray-200 shrink-0 opacity-0 group-hover:opacity-100 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all"
            />
          </Link>
          <Link
            href="#"
            className="group flex items-center justify-between gap-4 px-4 py-4 border-t border-gray-100 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                <Bell size={20} weight="duotone" />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-black text-gray-900 leading-tight">Notifications</p>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  Email, SMS, and push preferences
                </p>
              </div>
            </div>
            <CaretRight
              size={18}
              weight="bold"
              className="text-gray-200 shrink-0 opacity-0 group-hover:opacity-100 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
