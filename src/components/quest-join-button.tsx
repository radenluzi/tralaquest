"use client";

import { useState, useTransition } from "react";
import { joinQuestAction } from "@/app/actions";

type Props = {
  questId: string;
};

export function QuestJoinButton({ questId }: Props) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  return (
    <div className="mt-4 space-y-2">
      <button
        onClick={() =>
          startTransition(async () => {
            const result = await joinQuestAction(questId);
            setMessage(result.message);
          })
        }
        className="w-full rounded-2xl border border-white/10 px-4 py-3 font-medium disabled:opacity-70"
        disabled={pending}
      >
        {pending ? "Ngolah..." : "Join Quest"}
      </button>
      {message ? <p className="text-sm text-zinc-300">{message}</p> : null}
    </div>
  );
}
