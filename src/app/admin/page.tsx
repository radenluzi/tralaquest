import { AdminQuestForm } from "@/components/admin-quest-form";
import { SectionCard } from "@/components/section-card";

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <SectionCard className="p-5">
        <p className="text-sm text-zinc-400">Admin</p>
        <h2 className="mt-1 text-2xl font-bold">Create custom quests.</h2>
        <p className="mt-2 text-sm text-zinc-300">
          Build quiz quests, social checklist quests, or mixed quests directly from the app.
        </p>
      </SectionCard>
      <SectionCard>
        <AdminQuestForm />
      </SectionCard>
    </div>
  );
}
