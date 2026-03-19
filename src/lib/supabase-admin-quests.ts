import { getSupabaseClient } from "@/lib/supabase";

export async function createQuest(input: {
  title: string;
  description: string;
  type: string;
  pointsReward: number;
  isDaily: boolean;
}) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("quests").insert({
    title: input.title,
    description: input.description,
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

export async function normalizeQuestLanguage() {
  const supabase = getSupabaseClient();
  const updates = [
    {
      match: "Follow akun utama",
      title: "Follow main account",
      description: "Follow the main campaign account",
      type: "follow",
      points_reward: 15,
    },
    {
      match: "Like + recast post campaign",
      title: "Like + recast campaign post",
      description: "Like and recast the main campaign post",
      type: "engagement",
      points_reward: 20,
    },
    {
      match: "Cast kalimat campaign",
      title: "Publish campaign cast",
      description: "Publish the required campaign cast",
      type: "cast",
      points_reward: 30,
    },
  ];

  for (const item of updates) {
    const { error } = await supabase
      .from("quests")
      .update({
        title: item.title,
        description: item.description,
        type: item.type,
        points_reward: item.points_reward,
      })
      .eq("title", item.match);

    if (error) throw error;
  }

  return {
    ok: true,
    message: "Quest language normalized to English.",
  };
}
