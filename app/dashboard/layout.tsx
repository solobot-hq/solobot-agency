import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check for the user
  const { userId } = await auth();

  // If not logged in, send them to sign-in
  if (!userId) {
    redirect("/sign-in");
  }

  // If logged in, show the dashboard content
  return <>{children}</>;
}