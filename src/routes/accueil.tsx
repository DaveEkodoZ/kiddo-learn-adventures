import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Flame, Play, Star } from "lucide-react";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ProgressBar } from "@/components/app/MobileShell";
import { challenges, children, subjects } from "@/lib/mock-data";

export const Route = createFileRoute("/accueil")({
  head: () => ({
    meta: [
      { title: "Ma mission du jour — Kaléo" },
      {
        name: "description",
        content:
          "L'accueil enfant Kaléo : mission du jour, reprise de la dernière leçon, XP, série et progression par matière.",
      },
      { property: "og:title", content: "Ma mission du jour — Kaléo" },
      {
        property: "og:description",
        content: "Une mission par jour, des étoiles à gagner et une série à ne pas casser.",
      },
    ],
  }),
  component: ChildHome,
});

function ChildHome() {
  const me = children[0]!;

  return (
    <MobileShell bottomNav={<BottomNav />}>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <Link to="/profil" className="flex min-w-0 items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-sun text-2xl">
            {me.avatar}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-extrabold">Salut {me.name} !</span>
            <span className="block text-xs font-bold text-muted-foreground">
              Classe de {me.level}
            </span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-sun px-3 py-1.5 text-xs font-extrabold text-sun-foreground">
            <Flame className="size-4" /> {me.streak}
          </span>
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="press grid size-10 place-items-center rounded-2xl bg-secondary"
          >
            <Bell className="size-5" />
          </Link>
        </div>
      </header>

      <section className="mt-6 rounded-[2rem] bg-gradient-play p-5 text-primary-foreground shadow-soft">
        <p className="text-xs font-extrabold tracking-widest opacity-90">MISSION DU JOUR</p>
        <h2 className="mt-1 text-2xl leading-tight">Comparer les nombres</h2>
        <p className="mt-1 text-sm font-semibold opacity-90">
          Mathématiques • Séquence 1 • 5 minutes
        </p>
        <div className="mt-4 flex items-center gap-3">
          <Link
            to="/lecon/$lessonId"
            params={{ lessonId: "maths-s1-c1-l0" }}
            className="press inline-flex items-center gap-2 rounded-2xl bg-card px-5 py-3 text-base font-extrabold text-primary shadow-pop"
          >
            <Play className="size-5" /> Continuer
          </Link>
          <span className="inline-flex items-center gap-1 text-sm font-extrabold">
            <Star className="size-4 fill-current" /> +40 XP
          </span>
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-end justify-between">
          <h3 className="text-lg">Mes matières</h3>
          <Link to="/matieres" className="text-xs font-extrabold text-primary">
            Tout voir
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {subjects.map((s) => (
            <Link
              key={s.id}
              to="/matieres/$subjectId"
              params={{ subjectId: s.id }}
              className="press rounded-3xl border border-border bg-card p-4 shadow-soft"
            >
              <span className={`grid size-11 place-items-center rounded-2xl text-2xl ${s.gradient}`}>
                {s.emoji}
              </span>
              <p className="mt-3 truncate text-sm font-extrabold">{s.name}</p>
              <ProgressBar value={s.progress} className="mt-2 h-2" />
              <p className="mt-1 text-[11px] font-bold text-muted-foreground">{s.progress}%</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-end justify-between">
          <h3 className="text-lg">Mes défis</h3>
          <Link to="/defis" className="text-xs font-extrabold text-primary">
            Tous les défis
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {challenges.slice(0, 2).map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p className="min-w-0 truncate font-extrabold">{c.title}</p>
                <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-extrabold">
                  {c.reward}
                </span>
              </div>
              <ProgressBar value={c.progress} className="mt-3 h-2" />
            </div>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
