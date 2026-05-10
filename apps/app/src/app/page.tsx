import { redirect } from "next/navigation";
import { getServerAuth } from "@wafrivet/auth/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const auth = await getServerAuth();
  
  if (auth.authenticated) {
    redirect("/welcome");
  } else {
    redirect("/login");
  }
}
