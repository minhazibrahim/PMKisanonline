import { NextRequest, NextResponse } from "next/server";
import { getAdminUser, createServiceRoleClient } from "@/lib/supabaseServer";
import { getPublicSupabase } from "@/lib/supabasePublic";
import { slugify } from "@/lib/utils";

/**
 * Resolves a free-text state name (as typed into the admin "State Name"
 * field) to its states.id in Supabase, so a scheme saved with
 * category = "state" is automatically attributed to the correct state
 * and shows up under that state's page. Matching is case-insensitive and
 * ignores extra whitespace so small typos in casing still resolve.
 * Returns null for central schemes or when no matching state is found
 * (the scheme is still saved - just without a state link - so a typo
 * never blocks publishing).
 */
async function resolveStateId(admin: ReturnType<typeof createServiceRoleClient>, stateName?: string | null) {
  if (!stateName || !stateName.trim()) return null;
  const { data } = await admin
    .from("states")
    .select("id, name")
    .ilike("name", stateName.trim())
    .limit(1)
    .maybeSingle();
  return data?.id || null;
}

/**
 * GET /api/schemes
 * Public read endpoint. Supports optional filters:
 *   ?category=central|state
 *   ?state=<state-slug>
 *   ?status=active|expired
 *   ?limit=<n>
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const stateSlug = searchParams.get("state");
  const status = searchParams.get("status");
  const limit = Number(searchParams.get("limit")) || 50;

  const supabase = getPublicSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured on the server" }, { status: 503 });
  }

  // The `!inner` hint on the embedded "states" relation is required for
  // .eq("states.slug", ...) to actually filter the outer "posts" rows -
  // without it, PostgREST silently ignores that filter.
  let query = supabase
    .from("posts")
    .select(stateSlug ? "*, states!inner(name, slug)" : "*, states(name, slug)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (category) query = query.eq("category", category);
  if (status) query = query.eq("status", status);
  if (stateSlug) query = query.eq("states.slug", stateSlug);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

/**
 * POST /api/schemes
 * Admin-only: create a new scheme. Requires a logged-in Supabase session.
 */
export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  try {
    const admin = createServiceRoleClient();

    // Auto-categorization: resolve the state_id automatically so a scheme
    // shows up under the correct state page. Priority: an explicit
    // state_id from the request body (e.g. a dropdown of real state IDs)
    // wins if provided; otherwise resolve the free-text state_name typed
    // into the admin form (e.g. "Bihar") to its real states.id. For
    // category = "central", state stays null automatically.
    const resolvedStateId =
      body.category === "state"
        ? body.state_id || (await resolveStateId(admin, body.state_name))
        : null;

    const { data, error } = await admin
      .from("posts")
      .insert({
        title: body.title,
        slug: body.slug || slugify(body.title),
        category: body.category || "central",
        benefit: body.benefit || "",
        last_date: body.last_date || "Ongoing",
        short_summary: body.short_summary || "",
        description: body.description || "",
        eligibility: body.eligibility || [],
        documents_required: body.documents_required || [],
        how_to_apply: body.how_to_apply || "",
        official_link: body.official_link || null,
        state_id: resolvedStateId,
        status: body.status || "active",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server not configured" }, { status: 500 });
  }
}

/**
 * PATCH /api/schemes?id=<id>
 * Admin-only: update an existing scheme.
 */
export async function PATCH(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id query param is required" }, { status: 400 });
  }

  const body = await request.json();

  try {
    const admin = createServiceRoleClient();

    // Same auto-categorization as POST: if the edit form sent a
    // state_name (and no explicit state_id), resolve it to the real
    // states.id so re-saving a scheme keeps it correctly categorized.
    if (body.category === "state" && !body.state_id && body.state_name) {
      body.state_id = await resolveStateId(admin, body.state_name);
    }
    if (body.category === "central") {
      body.state_id = null;
    }
    delete body.state_name; // not a column on posts - only states.name is

    const { data, error } = await admin.from("posts").update(body).eq("id", id).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server not configured" }, { status: 500 });
  }
}

/**
 * DELETE /api/schemes?id=<id>
 * Admin-only: delete a scheme.
 */
export async function DELETE(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id query param is required" }, { status: 400 });
  }

  try {
    const admin = createServiceRoleClient();
    const { error } = await admin.from("posts").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server not configured" }, { status: 500 });
  }
}
