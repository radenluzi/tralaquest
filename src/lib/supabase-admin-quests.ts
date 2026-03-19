import { getSupabaseClient } from "@/lib/supabase";

type CreateQuestInput = {
  title: string;
  pointsReward: number;
  isDaily: boolean;
  question?: string;
  optionA?: string;
  optionB?: string;
  correctAnswer?: string;
  minimumFund?: string;
  maxParticipants?: number;
};

export async function createQuest(input: CreateQuestInput) {
  const supabase = getSupabaseClient();

  const description = JSON.stringify({
    question: input.question || undefined,
    optionA: input.optionA || undefined,
    optionB: input.optionB || undefined,
    correctAnswer: input.correctAnswer || undefined,
    minimumFund: input.minimumFund || undefined,
    maxParticipants: input.maxParticipants || undefined,
  });

  const { error } = await supabase.from("quests").insert({
    title: input.title,
    description,
    type: "quiz",
    points_reward: input.pointsReward,
    is_daily: input.isDaily,
    is_active: true,
  });

  if (error) throw error;

  return {
    ok: true,
    message: "Quiz quest created successfully.",
  };
}

export async function clearSeedQuests() {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("quests").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) throw error;

  return {
    ok: true,
    message: "All existing quests removed.",
  };
}
