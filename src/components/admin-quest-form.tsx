"use client";

import { useState, useTransition } from "react";
import { createQuestAction, normalizeQuestLanguageAction } from "@/app/actions";

export function AdminQuestForm() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "follow",
    pointsReward: 15,
    isDaily: true,
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          placeholder="Quest title"
          value={form.title}
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
        />
        <textarea
          className="min-h-28 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          placeholder="Quest description"
          value={form.description}
          onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
            placeholder="Quest type"
            value={form.type}
            onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
          />
          <input
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
            placeholder="Points"
            type="number"
            value={form.pointsReward}
            onChange={(e) => setForm((s) => ({ ...s, pointsReward: Number(e.target.value) || 0 }))}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={form.isDaily}
            onChange={(e) => setForm((s) => ({ ...s, isDaily: e.target.checked }))}
          />
          Daily quest
        </label>
      </div>

      <button
        onClick={() =>
          startTransition(async () => {
            const result = await createQuestAction(form);
            setMessage(result.message);
          })
        }
        disabled={pending}
        className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:opacity-70"
      >
        {pending ? "Creating..." : "Create Quest"}
      </button>

      <button
        onClick={() =>
          startTransition(async () => {
            const result = await normalizeQuestLanguageAction();
            setMessage(result.message);
          })
        }
        disabled={pending}
        className="w-full rounded-2xl border border-white/10 px-4 py-3 font-medium disabled:opacity-70"
      >
        Normalize Existing Quest Copy
      </button>

      {message ? <p className="text-sm text-zinc-300">{message}</p> : null}
    </div>
  );
}
