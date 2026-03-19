import { QuestJoinButton } from "@/components/quest-join-button";
import { SectionCard } from "@/components/section-card";
import { getActiveQuests } from "@/lib/supabase-quests";

export default async function QuestsPage() {
  const quests = await getActiveQuests();

  return (
    <div className="space-y-4">
      <SectionCard className="p-5">
        <p className="text-sm text-zinc-400">Quest Board</p>
        <h2 className="mt-1 text-2xl font-bold">Complete daily quests and earn points.</h2>
        <p className="mt-2 text-sm text-zinc-300">Quest data is loaded from your live Supabase project.</p>
      </SectionCard>

      {quests.map((quest) => (
        <section key={quest.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-cyan-300">{quest.type}</p>
              <h3 className="mt-1 font-semibold">{quest.title}</h3>
              {quest.description ? <p className="mt-1 text-sm text-zinc-400">{quest.description}</p> : null}
            </div>
            <div className="rounded-2xl bg-cyan-400/15 px-3 py-1 text-sm text-cyan-200">
              +{quest.points_reward} pts
            </div>
          </div>
          <QuestJoinButton questId={quest.id} />
        </section>
      ))}

      {quests.length === 0 ? (
        <SectionCard>
          <p className="text-sm text-zinc-300">No active quests found in the database yet.</p>
        </SectionCard>
      ) : null}
    </div>
  );
}
