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
        <p className="mt-2 text-sm text-zinc-300">Every quest below is created from the admin panel.</p>
      </SectionCard>

      {quests.map((quest) => (
        <section key={quest.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-cyan-300">{quest.type}</p>
              <h3 className="mt-1 font-semibold">{quest.title}</h3>
            </div>
            <div className="rounded-2xl bg-cyan-400/15 px-3 py-1 text-sm text-cyan-200">+{quest.points_reward} pts</div>
          </div>

          {quest.meta.followAccounts?.length ? (
            <div className="mt-4">
              <p className="text-sm font-semibold text-white">Follow</p>
              <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                {quest.meta.followAccounts.map((item, index) => (
                  <li key={`follow-${index}`} className="rounded-2xl bg-white/5 px-3 py-2">☐ {item.label}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {quest.meta.likeItems?.length ? (
            <div className="mt-4">
              <p className="text-sm font-semibold text-white">Like</p>
              <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                {quest.meta.likeItems.map((item, index) => (
                  <li key={`like-${index}`} className="rounded-2xl bg-white/5 px-3 py-2">☐ {item.label}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {quest.meta.recastItems?.length ? (
            <div className="mt-4">
              <p className="text-sm font-semibold text-white">Recast</p>
              <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                {quest.meta.recastItems.map((item, index) => (
                  <li key={`recast-${index}`} className="rounded-2xl bg-white/5 px-3 py-2">☐ {item.label}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {quest.meta.checklist?.length ? (
            <div className="mt-4">
              <p className="text-sm font-semibold text-white">Checklist</p>
              <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                {quest.meta.checklist.map((item, index) => (
                  <li key={`check-${index}`} className="rounded-2xl bg-white/5 px-3 py-2">☐ {item.label}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {quest.meta.castText ? (
            <div className="mt-4 rounded-2xl bg-white/5 p-3 text-sm text-zinc-300">
              <p className="font-semibold text-white">Cast Text</p>
              <p className="mt-2">{quest.meta.castText}</p>
            </div>
          ) : null}

          {quest.meta.question ? (
            <div className="mt-4 rounded-2xl bg-white/5 p-3 text-sm text-zinc-300">
              <p className="font-semibold text-white">Question</p>
              <p className="mt-2">{quest.meta.question}</p>
              {quest.meta.options?.length ? (
                <div className="mt-3 space-y-2">
                  {quest.meta.options.map((option) => (
                    <label key={option.key} className="flex items-center gap-2 rounded-2xl bg-black/10 px-3 py-2">
                      <input type="radio" name={`quest-${quest.id}`} />
                      <span>{option.key}. {option.text}</span>
                    </label>
                  ))}
                </div>
              ) : null}
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
