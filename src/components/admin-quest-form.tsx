"use client";

import { useState, useTransition } from "react";
import { clearSeedQuestsAction, createQuestAction } from "@/app/actions";

export function AdminQuestForm() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    type: "mixed",
    pointsReward: 25,
    isDaily: true,
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    followAccounts: "",
    likeItems: "",
    recastItems: "",
    checklist: "",
    castText: "",
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Quest title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
        <div className="grid grid-cols-2 gap-3">
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Quest type (quiz/social/mixed)" value={form.type} onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))} />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Points" type="number" value={form.pointsReward} onChange={(e) => setForm((s) => ({ ...s, pointsReward: Number(e.target.value) || 0 }))} />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" checked={form.isDaily} onChange={(e) => setForm((s) => ({ ...s, isDaily: e.target.checked }))} />
          Daily quest
        </label>

        <textarea className="min-h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Question (optional)" value={form.question} onChange={(e) => setForm((s) => ({ ...s, question: e.target.value }))} />
        <div className="grid grid-cols-2 gap-3">
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Option A" value={form.optionA} onChange={(e) => setForm((s) => ({ ...s, optionA: e.target.value }))} />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Option B" value={form.optionB} onChange={(e) => setForm((s) => ({ ...s, optionB: e.target.value }))} />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Option C" value={form.optionC} onChange={(e) => setForm((s) => ({ ...s, optionC: e.target.value }))} />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Option D" value={form.optionD} onChange={(e) => setForm((s) => ({ ...s, optionD: e.target.value }))} />
        </div>
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Correct answer (A/B/C/D)" value={form.correctAnswer} onChange={(e) => setForm((s) => ({ ...s, correctAnswer: e.target.value.toUpperCase() }))} />

        <textarea className="min-h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Follow accounts (one per line)" value={form.followAccounts} onChange={(e) => setForm((s) => ({ ...s, followAccounts: e.target.value }))} />
        <textarea className="min-h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Like targets (one per line)" value={form.likeItems} onChange={(e) => setForm((s) => ({ ...s, likeItems: e.target.value }))} />
        <textarea className="min-h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Recast targets (one per line)" value={form.recastItems} onChange={(e) => setForm((s) => ({ ...s, recastItems: e.target.value }))} />
        <textarea className="min-h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Checklist items (one per line)" value={form.checklist} onChange={(e) => setForm((s) => ({ ...s, checklist: e.target.value }))} />
        <textarea className="min-h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Cast text (optional)" value={form.castText} onChange={(e) => setForm((s) => ({ ...s, castText: e.target.value }))} />
      </div>

      <button onClick={() => startTransition(async () => setMessage((await createQuestAction(form)).message))} disabled={pending} className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:opacity-70">
        {pending ? "Creating..." : "Create Quest"}
      </button>

      <button onClick={() => startTransition(async () => setMessage((await clearSeedQuestsAction()).message))} disabled={pending} className="w-full rounded-2xl border border-white/10 px-4 py-3 font-medium disabled:opacity-70">
        Remove Default Quests
      </button>

      {message ? <p className="text-sm text-zinc-300">{message}</p> : null}
    </div>
  );
}
