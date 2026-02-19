import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // If they aren't logged in, they can't see the dashboard.
  // But this won't affect the landing page because it's in a different folder group.
  if (!userId) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}