import { getSupabaseClient } from "@/lib/supabase";

export type RankingRow = {
  id: string;
  username: string | null;
  total_points: number;
  streak: number;
};

export async function getLeaderboard(limit = 20): Promise<RankingRow[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("id,username,total_points,streak")
    .order("total_points", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}
