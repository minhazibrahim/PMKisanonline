"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import type { ParsedSchemeDraft, Scheme, SchemeCategory } from "@/types";

const emptyDraft: ParsedSchemeDraft = {
  title: "",
  category: "central",
  benefit: "",
  last_date: "",
  short_summary: "",
  description: "",
  eligibility: [],
  documents_required: [],
  how_to_apply: "",
  official_link: "",
  state_name: "",
};

export default function SchemeForm({ initialScheme }: { initialScheme?: Scheme }) {
  const router = useRouter();
  const [rawText, setRawText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ParsedSchemeDraft>(
    initialScheme
      ? {
          title: initialScheme.title,
          category: initialScheme.category,
          benefit: initialScheme.benefit,
          last_date: initialScheme.last_date,
          short_summary: initialScheme.short_summary,
          description: initialScheme.description || "",
          eligibility: initialScheme.eligibility || [],
          documents_required: initialScheme.documents_required || [],
          how_to_apply: initialScheme.how_to_apply || "",
          official_link: initialScheme.official_link || "",
          state_name: initialScheme.state_name || "",
        }
      : emptyDraft
  );

  function update<K extends keyof ParsedSchemeDraft>(key: K, value: ParsedSchemeDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleAiParse() {
    if (!rawText.trim()) return;
    setParsing(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-parser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "AI parsing failed");
      setForm({ official_link: "", ...json.draft });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setParsing(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const method = initialScheme ? "PATCH" : "POST";
      const url = initialScheme ? `/api/schemes?id=${initialScheme.id}` : "/api/schemes";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save scheme");
      router.push("/admin/schemes");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {!initialScheme && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-darkgray text-sm">AI-Assisted Draft</h3>
          </div>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            rows={5}
            placeholder="Paste the scheme announcement / notification text here and let AI pre-fill the form..."
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={handleAiParse}
            disabled={parsing || !rawText.trim()}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg disabled:opacity-50"
          >
            {parsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {parsing ? "Parsing..." : "Auto-fill with AI"}
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}

        <Field label="Title">
          <input
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="input"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value as SchemeCategory)}
              className="input"
            >
              <option value="central">Central</option>
              <option value="state">State</option>
            </select>
          </Field>
          {form.category === "state" && (
            <Field label="State Name">
              <input
                value={form.state_name}
                onChange={(e) => update("state_name", e.target.value)}
                className="input"
              />
            </Field>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Benefit">
            <input value={form.benefit} onChange={(e) => update("benefit", e.target.value)} className="input" />
          </Field>
          <Field label="Last Date">
            <input
              value={form.last_date}
              onChange={(e) => update("last_date", e.target.value)}
              className="input"
              placeholder="e.g. 31 March 2026 or Ongoing"
            />
          </Field>
        </div>

        <Field label="Official Government Link">
          <input
            type="url"
            value={form.official_link || ""}
            onChange={(e) => update("official_link", e.target.value)}
            className="input"
            placeholder="https://pmkisan.gov.in"
          />
          <span className="block text-[11px] text-gray-400 mt-1">
            The visitor's "Visit Official Portal" button on the scheme page will point here. Leave blank to hide
            that button.
          </span>
        </Field>

        <Field label="Short Summary">
          <textarea
            rows={2}
            value={form.short_summary}
            onChange={(e) => update("short_summary", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Full Description">
          <textarea
            rows={6}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Eligibility (one per line)">
          <textarea
            rows={3}
            value={form.eligibility.join("\n")}
            onChange={(e) => update("eligibility", e.target.value.split("\n").filter(Boolean))}
            className="input"
          />
        </Field>

        <Field label="Documents Required (one per line)">
          <textarea
            rows={3}
            value={form.documents_required.join("\n")}
            onChange={(e) => update("documents_required", e.target.value.split("\n").filter(Boolean))}
            className="input"
          />
        </Field>

        <Field label="How to Apply">
          <textarea
            rows={3}
            value={form.how_to_apply}
            onChange={(e) => update("how_to_apply", e.target.value)}
            className="input"
          />
        </Field>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg disabled:opacity-50"
        >
          {saving ? "Saving..." : initialScheme ? "Update Scheme" : "Publish Scheme"}
        </button>
      </form>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          padding: 0.6rem 0.9rem;
          font-size: 0.875rem;
        }
        .input:focus {
          outline: none;
          box-shadow: 0 0 0 2px #1b5e20;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-gray-600 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
