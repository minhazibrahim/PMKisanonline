import { redirect } from "next/navigation";
import { BarChart3, Landmark, MapPinned, TrendingUp } from "lucide-react";
import { createServiceRoleClient, getAdminUser } from "@/lib/supabaseServer";
import { STATES } from "@/lib/states";
import type { Scheme } from "@/types";

export default async function AnalyticsPage() {
  const user = await getAdminUser();

  if (!user) redirect("/admin");

  let schemes: Scheme[] = [];
  try {
    const admin = createServiceRoleClient();
    const { data } = await admin.from("posts").select("*, states(name, slug)");
    schemes = data || [];
  } catch {
    // Service role key not configured yet.
  }

  const active = schemes.filter((s) => s.status !== "expired").length;
  const expired = schemes.filter((s) => s.status === "expired").length;
  const central = schemes.filter((s) => s.category === "central").length;
  const state = schemes.filter((s) => s.category === "state").length;

  const byState = STATES.map((s) => ({
    ...s,
    count: schemes.filter((sc) => sc.state_slug === s.slug || sc.states?.slug === s.slug).length,
  }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-darkgray flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" /> Analytics
        </h1>
        <p className="text-sm text-gray-500">Overview of published scheme content.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Active" value={active} />
        <StatCard icon={TrendingUp} label="Expired" value={expired} />
        <StatCard icon={Landmark} label="Central" value={central} />
        <StatCard icon={MapPinned} label="State" value={state} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="font-bold text-darkgray mb-4">Schemes by State</h2>
        {byState.length === 0 ? (
          <p className="text-sm text-gray-500">No state-specific schemes published yet.</p>
        ) : (
          <div className="space-y-3">
            {byState.map((s) => (
              <div key={s.slug} className="flex items-center gap-3">
                <span className="w-32 text-sm text-gray-600 truncate">{s.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${Math.min(100, (s.count / byState[0].count) * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-darkgray w-6 text-right">{s.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof TrendingUp; label: string; value: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">{label}</span>
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-2xl font-extrabold text-darkgray">{value}</span>
    </div>
  );
}
