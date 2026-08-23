import { NextRequest, NextResponse } from "next/server";
import { getAdminUser, createServiceRoleClient } from "@/lib/supabaseServer";

const BUCKET = "scheme-assets";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * POST /api/upload
 * Admin-only: uploads a file (multipart/form-data, field name "file") to
 * the Supabase Storage bucket and returns its public URL.
 */
export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File exceeds 5MB limit" }, { status: 413 });
  }

  try {
    const admin = createServiceRoleClient();
    const ext = file.name.split(".").pop() || "bin";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await admin.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = admin.storage.from(BUCKET).getPublicUrl(path);

    return NextResponse.json({ url: publicUrlData.publicUrl, path });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server not configured" }, { status: 500 });
  }
}
