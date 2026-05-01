import { redirect } from "next/navigation";
import { getServerAuth } from "@wafrivet/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const auth = await getServerAuth();
  
  if (auth.authenticated) {
    const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.wafrivet.com";
    redirect(shopUrl);
  } else {
    redirect("/login");
  }
}
