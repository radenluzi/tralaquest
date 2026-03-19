"use server";

import { runSupabaseDailyCheckin } from "@/lib/supabase-checkin";
import { submitQuestJoin } from "@/lib/supabase-quests";
import { clearSeedQuests, createQuest } from "@/lib/supabase-admin-quests";

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
  type: string;
  pointsReward: number;
  isDaily: boolean;
  question?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctAnswer?: string;
  followAccounts?: string;
  likeItems?: string;
  recastItems?: string;
  checklist?: string;
  castText?: string;
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

export async function clearSeedQuestsAction() {
  try {
    return await clearSeedQuests();
  } catch (error) {
    console.error("clear default quests failed", error);
    return {
      ok: false,
      message: "Failed to remove default quests.",
    };
  }
}
