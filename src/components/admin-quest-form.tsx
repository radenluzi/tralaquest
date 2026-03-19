"use client";

import { useState, useTransition } from "react";
import { clearSeedQuestsAction, createQuestAction } from "@/app/actions";

export function AdminQuestForm() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    pointsReward: 25,
    isDaily: true,
    question: "",
    optionA: "",
    optionB: "",
    correctAnswer: "A",
    minimumFund: "1",
    maxParticipants: 100,
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Quest title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
        <textarea className="min-h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Question" value={form.question} onChange={(e) => setForm((s) => ({ ...s, question: e.target.value }))} />
        <div className="grid grid-cols-2 gap-3">
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Answer A" value={form.optionA} onChange={(e) => setForm((s) => ({ ...s, optionA: e.target.value }))} />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Answer B" value={form.optionB} onChange={(e) => setForm((s) => ({ ...s, optionB: e.target.value }))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Correct answer (A/B)" value={form.correctAnswer} onChange={(e) => setForm((s) => ({ ...s, correctAnswer: e.target.value.toUpperCase() }))} />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Points" type="number" value={form.pointsReward} onChange={(e) => setForm((s) => ({ ...s, pointsReward: Number(e.target.value) || 0 }))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Minimum fund" value={form.minimumFund} onChange={(e) => setForm((s) => ({ ...s, minimumFund: e.target.value }))} />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Max participants" type="number" value={form.maxParticipants} onChange={(e) => setForm((s) => ({ ...s, maxParticipants: Number(e.target.value) || 0 }))} />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" checked={form.isDaily} onChange={(e) => setForm((s) => ({ ...s, isDaily: e.target.checked }))} />
          Daily quest
        </label>
      </div>

      <button onClick={() => startTransition(async () => setMessage((await createQuestAction(form)).message))} disabled={pending} className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:opacity-70">
        {pending ? "Creating..." : "Create Quiz Quest"}
      </button>

      <button onClick={() => startTransition(async () => setMessage((await clearSeedQuestsAction()).message))} disabled={pending} className="w-full rounded-2xl border border-white/10 px-4 py-3 font-medium disabled:opacity-70">
        Remove All Existing Quests
      </button>

      {message ? <p className="text-sm text-zinc-300">{message}</p> : null}
    </div>
  );
}
