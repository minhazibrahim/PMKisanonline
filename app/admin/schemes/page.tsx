import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { createServiceRoleClient, getAdminUser } from "@/lib/supabaseServer";
import { formatDate } from "@/lib/utils";
import DeleteSchemeButton from "@/components/admin/DeleteSchemeButton";
import type { Scheme } from "@/types";

export default async function AdminSchemesPage() {
  const user = await getAdminUser();

  if (!user) redirect("/admin");

  let schemes: Scheme[] = [];
  try {
    const admin = createServiceRoleClient();
    const { data } = await admin
      .from("posts")
      .select("*, states(name, slug)")
      .order("created_at", { ascending: false });
    schemes = data || [];
  } catch {
    // Service role key not configured - render an empty list rather than crash.
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-darkgray">All Schemes</h1>
        <Link
          href="/admin/schemes/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition"
        >
          <PlusCircle className="w-4 h-4" /> Add Scheme
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {schemes.length === 0 ? (
          <p className="p-8 text-center text-gray-500 text-sm">
            No schemes yet. Click &ldquo;Add Scheme&rdquo; to publish your first one.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Last Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schemes.map((scheme) => (
                <tr key={scheme.id}>
                  <td className="px-5 py-3 font-medium text-darkgray">{scheme.title}</td>
                  <td className="px-5 py-3 capitalize text-gray-600">
                    {scheme.category === "state" ? scheme.state_name || scheme.states?.name : "Central"}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{formatDate(scheme.last_date)}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        scheme.status === "expired"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {scheme.status || "active"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <DeleteSchemeButton id={scheme.id} title={scheme.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
