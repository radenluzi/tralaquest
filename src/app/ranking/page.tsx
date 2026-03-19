import { SectionCard } from "@/components/section-card";
import { getLeaderboard } from "@/lib/supabase-ranking";

export default async function RankingPage() {
  const leaders = await getLeaderboard(20);

  return (
    <div className="space-y-4">
      <SectionCard className="p-5">
        <p className="text-sm text-zinc-400">Leaderboard</p>
        <h2 className="mt-1 text-2xl font-bold">Top user pangaktifna.</h2>
        <p className="mt-2 text-sm text-zinc-300">Ranking ayeuna live tina Supabase.</p>
      </SectionCard>
      <SectionCard>
        <div className="space-y-3">
          {leaders.map((leader, index) => (
            <div key={leader.id} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/15 font-bold text-cyan-300">
                  #{index + 1}
                </div>
                <div>
                  <p className="font-medium">{leader.username ?? "anon"}</p>
                  <p className="text-xs text-zinc-400">streak {leader.streak} poe</p>
                </div>
              </div>
              <p className="text-sm text-zinc-300">{leader.total_points} pt</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
