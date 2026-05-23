import { redirect } from "next/navigation";
import { getShopLoginUrl } from "@wafrivet/auth";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ redirect?: string }>;
};

/** Shop login UI lives on app.wafrivet.com; preserve intended shop path as returnTo. */
export default async function ShopLoginPage({ searchParams }: PageProps) {
  const { redirect: path } = await searchParams;
  redirect(getShopLoginUrl(path));
}
