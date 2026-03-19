import { CheckinButton } from "@/components/checkin-button";
import { SectionCard } from "@/components/section-card";
import { DAILY_REWARD_POINTS, mockUser } from "@/lib/mock-data";

export default function DailyPage() {
  const checkins = [
    { day: "Mon", status: "done" },
    { day: "Tue", status: "done" },
    { day: "Wed", status: "today" },
    { day: "Thu", status: "locked" },
  ];

  return (
    <div className="space-y-4">
      <SectionCard className="p-5">
        <p className="text-sm text-zinc-400">Daily Check-In</p>
        <h2 className="mt-1 text-2xl font-bold">Keep your streak alive.</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-zinc-400">Daily reward</p>
            <p className="mt-1 font-semibold">+{DAILY_REWARD_POINTS} points</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-zinc-400">Current status</p>
            <p className="mt-1 font-semibold">Available</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-white/5 p-3 text-sm text-zinc-300">
          Current streak: <span className="font-semibold text-white">{mockUser.streak} days</span>
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
