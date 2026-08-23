import Sidebar from "@/components/admin/Sidebar";
import { getAdminUser } from "@/lib/supabaseServer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | PMkisanOnline",
  robots: { index: false, follow: false },
};

/**
 * Admin-section layout, nested inside the root layout. <html>/<body> live in
 * app/layout.tsx only. Shows the Sidebar chrome only once an admin is
 * actually logged in - the login screen (rendered by app/admin/page.tsx)
 * takes up the full viewport on its own.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();

  if (!user) {
    return <div className="min-h-screen bg-gray-100">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
