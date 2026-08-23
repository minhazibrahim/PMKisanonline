import Link from "next/link";
import { FileText, Landmark, MapPinned, PlusCircle } from "lucide-react";
import { getAdminUser, createServiceRoleClient } from "@/lib/supabaseServer";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminDashboardPage() {
  const user = await getAdminUser();

  if (!user) {
    return <LoginForm />;
  }

  let totalSchemes = 0;
  let centralSchemes = 0;
  let stateSchemes = 0;

  try {
    const admin = createServiceRoleClient();
    const [{ count: total }, { count: central }, { count: state }] = await Promise.all([
      admin.from("posts").select("*", { count: "exact", head: true }),
      admin.from("posts").select("*", { count: "exact", head: true }).eq("category", "central"),
      admin.from("posts").select("*", { count: "exact", head: true }).eq("category", "state"),
    ]);
    totalSchemes = total || 0;
    centralSchemes = central || 0;
    stateSchemes = state || 0;
  } catch {
    // SUPABASE_SERVICE_ROLE_KEY not configured yet - show zeros instead of crashing.
  }

  const stats = [
    { label: "Total Schemes", value: totalSchemes, icon: FileText },
    { label: "Central Schemes", value: centralSchemes, icon: Landmark },
    { label: "State Schemes", value: stateSchemes, icon: MapPinned },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-darkgray">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user.email}</p>
        </div>
        <Link
          href="/admin/schemes/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition"
        >
          <PlusCircle className="w-4 h-4" /> Add Scheme
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{stat.label}</span>
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-3xl font-extrabold text-darkgray">{stat.value}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="font-bold text-darkgray mb-2">Quick Links</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/admin/schemes" className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            Manage All Schemes
          </Link>
          <Link
            href="/admin/schemes/new/analytics"
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}
