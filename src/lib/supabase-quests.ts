import { getSupabaseClient } from "@/lib/supabase";
import { ensureDemoUser } from "@/lib/supabase-checkin";

export type QuestRow = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  points_reward: number;
  is_daily: boolean;
  is_active: boolean;
};

export async function getActiveQuests(): Promise<QuestRow[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("quests")
    .select("id,title,description,type,points_reward,is_daily,is_active")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function submitQuestJoin(questId: string) {
  const supabase = getSupabaseClient();
  const user = await ensureDemoUser();

  const { data: existing } = await supabase
    .from("quest_submissions")
    .select("id,status")
    .eq("user_id", user.id)
    .eq("quest_id", questId)
    .maybeSingle();

  if (existing) {
    return {
      ok: false,
      message: "You have already joined or submitted this quest.",
    };
  }

  const { error } = await supabase.from("quest_submissions").insert({
    user_id: user.id,
    quest_id: questId,
    status: "joined",
    points_earned: 0,
  });

  if (error) throw error;

  return {
    ok: true,
    message: "Quest joined successfully.",
  };
}
