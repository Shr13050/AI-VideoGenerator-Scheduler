import { syncUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { Sidebar } from "@/components/dashboard/sidebar";

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

  return (
    <div className="flex min-h-screen bg-zinc-50/50">
      <Sidebar />
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
