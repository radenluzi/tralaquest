import { DAILY_FEE_ETH, DAILY_REWARD_POINTS } from "@/lib/mock-data";
import { getSupabaseClient } from "@/lib/supabase";

export async function ensureDemoUser() {
  const supabase = getSupabaseClient();

  const { data: existing } = await supabase
    .from("users")
    .select("*")
    .eq("fid", 2125562913)
    .maybeSingle();

  if (existing) return existing;

  const { data, error } = await supabase
    .from("users")
    .insert({
      fid: 2125562913,
      username: "dek",
      total_points: 180,
      streak: 2,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function runSupabaseDailyCheckin() {
  const supabase = getSupabaseClient();
  const user = await ensureDemoUser();
  const today = new Date().toISOString().slice(0, 10);

  const { data: existing } = await supabase
    .from("checkins")
    .select("id")
    .eq("user_id", user.id)
    .eq("checkin_date", today)
    .maybeSingle();

  if (existing) {
    return {
      ok: false,
      message: "Geus check-in poe ieu.",
    };
  }

  const { error: checkinError } = await supabase.from("checkins").insert({
    user_id: user.id,
    checkin_date: today,
    fee_amount: DAILY_FEE_ETH,
    fee_symbol: "ETH",
    points_earned: DAILY_REWARD_POINTS,
  });

  if (checkinError) throw checkinError;

  const { error: userError } = await supabase
    .from("users")
    .update({
      total_points: user.total_points + DAILY_REWARD_POINTS,
      streak: user.streak + 1,
      last_checkin_date: today,
    })
    .eq("id", user.id);

  if (userError) throw userError;

  const { error: logError } = await supabase.from("point_logs").insert({
    user_id: user.id,
    source: "daily_checkin",
    amount: DAILY_REWARD_POINTS,
    meta: { fee_eth: DAILY_FEE_ETH },
  });

  if (logError) throw logError;

  return {
    ok: true,
    message: "Check-in hasil make Supabase.",
  };
}
