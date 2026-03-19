"use server";

import { runSupabaseDailyCheckin } from "@/lib/supabase-checkin";
import { submitQuestJoin } from "@/lib/supabase-quests";

export async function submitDailyCheckin() {
  try {
    const result = await runSupabaseDailyCheckin();
    return result;
  } catch (error) {
    console.error("daily checkin failed", error);
    return {
      ok: false,
      message: "Check-in failed. Please verify your Supabase setup.",
    };
  }
}

export async function joinQuestAction(questId: string) {
  try {
    const result = await submitQuestJoin(questId);
    return result;
  } catch (error) {
    console.error("join quest failed", error);
    return {
      ok: false,
      message: "Quest join failed.",
    };
  }
}
