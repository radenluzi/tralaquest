"use server";

import { runSupabaseDailyCheckin } from "@/lib/supabase-checkin";
import { submitQuestJoin } from "@/lib/supabase-quests";
import { createQuest, normalizeQuestLanguage } from "@/lib/supabase-admin-quests";

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

export async function createQuestAction(input: {
  title: string;
  description: string;
  type: string;
  pointsReward: number;
  isDaily: boolean;
}) {
  try {
    return await createQuest(input);
  } catch (error) {
    console.error("create quest failed", error);
    return {
      ok: false,
      message: "Quest creation failed.",
    };
  }
}

export async function normalizeQuestLanguageAction() {
  try {
    return await normalizeQuestLanguage();
  } catch (error) {
    console.error("normalize quest language failed", error);
    return {
      ok: false,
      message: "Quest copy cleanup failed.",
    };
  }
}
