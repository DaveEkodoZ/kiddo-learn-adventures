import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ProgressBar, ScreenHeader } from "@/components/app/MobileShell";
import { challenges } from "@/lib/mock-data";

export const Route = createFileRoute("/defis")({
  head: () => ({
    meta: [
      { title: "Mes défis — Kaléo" },
      {
        name: "description",
        content:
          "Défis quotidiens, hebdomadaires et défis de séquence : des objectifs courts pour garder la motivation.",
      },
      { property: "og:title", content: "Mes défis — Kaléo" },
      { property: "og:description", content: "Objectifs du jour et de la semaine à relever." },
    ],
  }),
  component: Challenges,
});

function Challenges() {
  return (
    <MobileShell bottomNav={<BottomNav />}>
      <ScreenHeader title="Mes défis" subtitle="Gagne des XP et des pièces" />

      <div className="rounded-[2rem] bg-gradient-sun p-5 shadow-soft">
        <p className="text-xs font-extrabold tracking-widest text-sun-foreground/80">
          DÉFI DE LA SEMAINE
        </p>
        <h2 className="mt-1 text-2xl text-sun-foreground">Le marathon des nombres</h2>
        <p className="mt-1 text-sm font-bold text-sun-foreground/80">
          Réussis 5 leçons de mathématiques • récompense 🏅
        </p>
        <ProgressBar value={60} className="mt-4 bg-card/50" />
      </div>

      <div className="mt-6 space-y-3">
        {challenges.map((c) => (
          <div key={c.title} className="rounded-3xl border border-border bg-card p-4 shadow-soft">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold tracking-widest text-muted-foreground">
                  {c.kind.toUpperCase()}
                </p>
                <p className="truncate font-extrabold">{c.title}</p>
              </div>
              <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-extrabold">
                {c.reward}
              </span>
            </div>
            <ProgressBar value={c.progress} className="mt-3 h-2" />
            <p className="mt-1 text-xs font-bold text-muted-foreground">{c.progress}% terminé</p>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}
