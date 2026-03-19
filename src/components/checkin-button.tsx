"use client";

import { useTransition, useState } from "react";
import { submitDailyCheckin } from "@/app/actions";

type Props = {
  initialMessage?: string;
};

export function CheckinButton({ initialMessage = "Your daily check-in is available." }: Props) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState(initialMessage);

  return (
    <div className="space-y-3">
      <button
        onClick={() =>
          startTransition(async () => {
            const result = await submitDailyCheckin();
            setMessage(result.message);
          })
        }
        className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 disabled:opacity-70"
        disabled={pending}
      >
        {pending ? "Processing check-in..." : "Check In"}
      </button>
      <p className="text-sm text-zinc-300">{message}</p>
    </div>
  );
}
