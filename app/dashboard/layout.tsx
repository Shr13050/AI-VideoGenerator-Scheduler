import { syncUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Sync user to Supabase (runs on server, non-blocking)
  const syncResult = await syncUser();

  // Log the result but don't block the page
  if (syncResult.error) {
    console.error("⚠️ User sync failed, but allowing page load:", syncResult.error);
  }

  return <>{children}</>;
}
