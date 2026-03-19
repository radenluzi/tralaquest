import { QuestJoinButton } from "@/components/quest-join-button";
import { SectionCard } from "@/components/section-card";
import { getActiveQuests } from "@/lib/supabase-quests";

export default async function QuestsPage() {
  const quests = await getActiveQuests();

  return (
    <div className="space-y-4">
      <SectionCard className="p-5">
        <p className="text-sm text-zinc-400">Quest Board</p>
        <h2 className="mt-1 text-2xl font-bold">Answer the question and join the quest.</h2>
        <p className="mt-2 text-sm text-zinc-300">Every quest now uses a quiz-only format created from the admin panel.</p>
      </SectionCard>

      {quests.map((quest) => (
        <section key={quest.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-cyan-300">quiz</p>
              <h3 className="mt-1 font-semibold">{quest.title}</h3>
            </div>
            <div className="rounded-2xl bg-cyan-400/15 px-3 py-1 text-sm text-cyan-200">+{quest.points_reward} pts</div>
          </div>

          {quest.meta.minimumFund ? (
            <div className="mt-4 rounded-2xl bg-white/5 p-3 text-sm text-zinc-300">
              <span className="font-semibold text-white">Minimum fund:</span> {quest.meta.minimumFund}
            </div>
          ) : null}

          {quest.meta.maxParticipants ? (
            <div className="mt-3 rounded-2xl bg-white/5 p-3 text-sm text-zinc-300">
              <span className="font-semibold text-white">Max participants:</span> {quest.meta.maxParticipants}
            </div>
          ) : null}

          {quest.meta.question ? (
            <div className="mt-4 rounded-2xl bg-white/5 p-3 text-sm text-zinc-300">
              <p className="font-semibold text-white">Question</p>
              <p className="mt-2">{quest.meta.question}</p>
              <div className="mt-3 space-y-2">
                {quest.meta.optionA ? (
                  <label className="flex items-center gap-2 rounded-2xl bg-black/10 px-3 py-2">
                    <input type="radio" name={`quest-${quest.id}`} />
                    <span>A. {quest.meta.optionA}</span>
                  </label>
                ) : null}
                {quest.meta.optionB ? (
                  <label className="flex items-center gap-2 rounded-2xl bg-black/10 px-3 py-2">
                    <input type="radio" name={`quest-${quest.id}`} />
                    <span>B. {quest.meta.optionB}</span>
                  </label>
                ) : null}
              </div>
            </div>
          ) : null}

          <QuestJoinButton questId={quest.id} />
        </section>
      ))}

      {quests.length === 0 ? (
        <SectionCard>
          <p className="text-sm text-zinc-300">No active quests found yet. Create one in Admin.</p>
        </SectionCard>
      ) : null}
    </div>
  );
}
