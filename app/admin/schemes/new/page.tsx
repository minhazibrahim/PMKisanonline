import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabaseServer";
import SchemeForm from "@/components/admin/SchemeForm";

export default async function NewSchemePage() {
  const user = await getAdminUser();

  if (!user) redirect("/admin");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-darkgray">Add New Scheme</h1>
        <p className="text-sm text-gray-500">
          Paste a scheme announcement to auto-fill the form with AI, or fill it in manually.
        </p>
      </div>
      <SchemeForm />
    </div>
  );
}
