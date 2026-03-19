import Link from "next/link";
import { DAILY_FEE_ETH } from "@/lib/mock-data";
import { getLeaderboard } from "@/lib/supabase-ranking";
import { getActiveQuests } from "@/lib/supabase-quests";
import { StatCard } from "@/components/stat-card";
import { SectionCard } from "@/components/section-card";

const quickMenu = [
  { href: "/daily", title: "Daily Check-in", desc: "Bayar fee, nambah streak, meunang point." },
  { href: "/quests", title: "Quest Board", desc: "Follow, like, recast, cast task." },
  { href: "/ranking", title: "Leaderboard", desc: "Tempo ranking user pangaktifna." },
  { href: "/convert", title: "Convert Point", desc: "Tukeur point kana token." },
];

export default async function Home() {
  const leaders = await getLeaderboard(20);
  const quests = await getActiveQuests();
  const currentUser = leaders.find((leader) => leader.username === "dek") ?? leaders[0];
  const currentRank = Math.max(
    1,
    leaders.findIndex((leader) => leader.username === "dek") + 1 || 1,
  );

  return (
    <div className="space-y-4">
      <section className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 p-5">
        <p className="text-sm text-cyan-200">Wilujeng sumping deui, {currentUser?.username ?? "dek"} 👋</p>
        <h2 className="mt-1 text-2xl font-bold">Daily grind, quest, point, convert.</h2>
        <p className="mt-2 text-sm text-zinc-300">
          Cek in unggal poe make fee, kumpulkeun point, terus naek ranking.
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/daily" className="rounded-2xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950">
            Check-in ayeuna
          </Link>
          <Link href="/quests" className="rounded-2xl border border-white/15 px-4 py-2 font-medium">
            Tingali quest
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <StatCard label="Streak" value={`${currentUser?.streak ?? 0} poe`} />
        <StatCard label="Point" value={`${currentUser?.total_points ?? 0}`} />
        <StatCard label="Ranking" value={`#${currentRank}`} />
        <StatCard label="Fee Today" value={`${DAILY_FEE_ETH} ETH`} />
      </section>

      <SectionCard>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Quick Status</h3>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">Supabase live</span>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-zinc-300">
          <li>- Daily check-in make Supabase aktif</li>
          <li>- Quest aktif: {quests.length}</li>
          <li>- Total leaderboard user: {leaders.length}</li>
          <li>- Home ayeuna geus narik point/streak/ranking live</li>
        </ul>
      </SectionCard>

      <section className="space-y-3">
        {quickMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/8"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
              </div>
              <span className="text-cyan-300">→</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
