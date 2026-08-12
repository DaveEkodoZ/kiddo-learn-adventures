import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, Pill, ProgressBar, ScreenHeader } from "@/components/app/MobileShell";
import { children, subjects } from "@/lib/mock-data";

export const Route = createFileRoute("/parent/progression/$childId")({
  head: () => ({
    meta: [
      { title: "Progression de mon enfant — Kaléo" },
      {
        name: "description",
        content:
          "Résultats par matière, séquences terminées, points de difficulté et temps d'apprentissage de votre enfant.",
      },
      { property: "og:title", content: "Progression de mon enfant — Kaléo" },
      { property: "og:description", content: "Un suivi clair, matière par matière." },
    ],
  }),
  component: ChildProgress,
});

function ChildProgress() {
  const { childId } = Route.useParams();
  const child = children.find((c) => c.id === childId) ?? children[0]!;

  return (
    <MobileShell>
      <ScreenHeader title={child.name} subtitle={`Classe de ${child.level}`} />

      <div className="rounded-[2rem] bg-gradient-cool p-5 text-accent-foreground shadow-soft">
        <div className="flex items-center gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-3xl bg-card/85 text-3xl">
            {child.avatar}
          </span>
          <div className="min-w-0">
            <p className="text-lg font-extrabold">{child.xp} XP</p>
            <p className="text-xs font-bold opacity-80">
              🔥 {child.streak} jours • {child.minutesToday} min aujourd'hui
            </p>
          </div>
        </div>
        <ProgressBar value={child.progress} className="mt-4 bg-card/40" />
      </div>

      <h2 className="mt-6 text-lg">Résultats par matière</h2>
      <div className="mt-3 space-y-3">
        {subjects.map((s) => (
          <div key={s.id} className="rounded-3xl border border-border bg-card p-4 shadow-soft">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <span className="text-xl">{s.emoji}</span>
              <p className="min-w-0 truncate font-extrabold">{s.name}</p>
              <span className="text-xs font-extrabold text-primary">{s.progress}%</span>
            </div>
            <ProgressBar value={s.progress} className="mt-3 h-2" />
            <p className="mt-2 text-xs font-bold text-muted-foreground">
              {s.sequences.filter((q) => !q.locked).length} séquences sur 6 • dernière activité
              aujourd'hui
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-6 text-lg">Points à travailler</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <Pill tone="primary">Soustractions posées</Pill>
        <Pill tone="sun">Sons complexes</Pill>
        <Pill tone="accent">Vocabulaire anglais</Pill>
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-card p-4 shadow-soft">
        <p className="font-extrabold">Temps d'apprentissage cette semaine</p>
        <div className="mt-4 flex h-32 items-end gap-2">
          {[12, 18, 24, 9, 30, 22, 15].map((v, i) => (
            <div key={i} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t-xl bg-gradient-play"
                style={{ height: `${(v / 30) * 100}%` }}
              />
              <span className="text-[10px] font-bold text-muted-foreground">
                {["L", "M", "M", "J", "V", "S", "D"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
