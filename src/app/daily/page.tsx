import { CheckinButton } from "@/components/checkin-button";
import { SectionCard } from "@/components/section-card";
import { DAILY_FEE_ETH, DAILY_REWARD_POINTS, mockUser } from "@/lib/mock-data";

export default function DailyPage() {
  const checkins = [
    { day: "Senin", status: "done" },
    { day: "Salasa", status: "done" },
    { day: "Rebo", status: "today" },
    { day: "Kemis", status: "locked" },
  ];

  return (
    <div className="space-y-4">
      <SectionCard className="p-5">
        <p className="text-sm text-zinc-400">Daily Check-in</p>
        <h2 className="mt-1 text-2xl font-bold">Bayar fee, jaga streak.</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-zinc-400">Fee poe ieu</p>
            <p className="mt-1 font-semibold">{DAILY_FEE_ETH} ETH</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-zinc-400">Reward</p>
            <p className="mt-1 font-semibold">+{DAILY_REWARD_POINTS} point</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-white/5 p-3 text-sm text-zinc-300">
          Ayeuna streak maneh: <span className="font-semibold text-white">{mockUser.streak} poe</span>
        </div>
        <div className="mt-4">
          <CheckinButton />
        </div>
      </SectionCard>

      <SectionCard>
        <h3 className="font-semibold">Streak Progress</h3>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {checkins.map((item) => (
            <div
              key={item.day}
              className={`rounded-2xl p-3 text-center text-sm ${
                item.status === "done"
                  ? "bg-emerald-400/15 text-emerald-300"
                  : item.status === "today"
                    ? "bg-cyan-400/15 text-cyan-300"
                    : "bg-white/5 text-zinc-500"
              }`}
            >
              <p>{item.day}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
