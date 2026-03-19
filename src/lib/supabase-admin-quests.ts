import { getSupabaseClient } from "@/lib/supabase";

type CreateQuestInput = {
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
};

function splitLines(raw?: string) {
  return (raw ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({ label: line }));
}

export async function createQuest(input: CreateQuestInput) {
  const supabase = getSupabaseClient();

  const description = JSON.stringify({
    question: input.question || undefined,
    options: [
      input.optionA ? { key: "A", text: input.optionA } : null,
      input.optionB ? { key: "B", text: input.optionB } : null,
      input.optionC ? { key: "C", text: input.optionC } : null,
      input.optionD ? { key: "D", text: input.optionD } : null,
    ].filter(Boolean),
    correctAnswer: input.correctAnswer || undefined,
    followAccounts: splitLines(input.followAccounts),
    likeItems: splitLines(input.likeItems),
    recastItems: splitLines(input.recastItems),
    checklist: splitLines(input.checklist),
    castText: input.castText || undefined,
  });

  const { error } = await supabase.from("quests").insert({
    title: input.title,
    description,
    type: input.type,
    points_reward: input.pointsReward,
    is_daily: input.isDaily,
    is_active: true,
  });

  if (error) throw error;

  return {
    ok: true,
    message: "Quest created successfully.",
  };
}

export async function clearSeedQuests() {
  const supabase = getSupabaseClient();
  const titles = [
    "Follow akun utama",
    "Like + recast post campaign",
    "Cast kalimat campaign",
    "Follow main account",
    "Like + recast campaign post",
    "Publish campaign cast",
  ];

  const { error } = await supabase.from("quests").delete().in("title", titles);
  if (error) throw error;

  return {
    ok: true,
    message: "Default quests removed.",
  };
}
