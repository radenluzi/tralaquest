const logs = [
  { label: "Daily check-in", value: "+10" },
  { label: "Like + recast quest", value: "+20" },
  { label: "Follow quest", value: "+15" },
];

export default function PointsPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-zinc-400">Point Wallet</p>
        <h2 className="mt-1 text-2xl font-bold">Total point ayeuna: 180</h2>
      </section>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <h3 className="font-semibold">Point Logs</h3>
        <div className="mt-3 space-y-3">
          {logs.map((log) => (
            <div key={log.label} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <p>{log.label}</p>
              <p className="font-semibold text-emerald-300">{log.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
