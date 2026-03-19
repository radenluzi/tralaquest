export default function ConvertPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-zinc-400">Convert</p>
        <h2 className="mt-1 text-2xl font-bold">Tukeur point kana token.</h2>
        <p className="mt-2 text-sm text-zinc-300">V1 mah mock/internal heula. Logika onchain bisa ditambah engke.</p>
      </section>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-zinc-400">Available</p>
            <p className="mt-1 font-semibold">180 pt</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-zinc-400">Rate</p>
            <p className="mt-1 font-semibold">100 pt = 1 TOKEN</p>
          </div>
        </div>
        <button className="mt-4 w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950">
          Convert ayeuna
        </button>
      </section>
    </div>
  );
}
