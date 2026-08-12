import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, Clock, TrendingUp } from "lucide-react";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ProgressBar } from "@/components/app/MobileShell";
import { children } from "@/lib/mock-data";

export const Route = createFileRoute("/parent/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord parent — Kaléo" },
      {
        name: "description",
        content:
          "Suivez la progression, le temps d'apprentissage et les résultats de chacun de vos enfants depuis un seul compte parent.",
      },
      { property: "og:title", content: "Tableau de bord parent — Kaléo" },
      {
        property: "og:description",
        content: "Progression, temps d'écran utile et résultats par matière, en un coup d'œil.",
      },
    ],
  }),
  component: ParentDashboard,
});

function ParentDashboard() {
  const totalMinutes = children.reduce((a, c) => a + c.minutesToday, 0);

  return (
    <MobileShell bottomNav={<BottomNav variant="parent" />}>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="text-xs font-extrabold tracking-widest text-muted-foreground">
            ESPACE PARENT
          </p>
          <h1 className="truncate text-2xl">Bonjour 👋</h1>
        </div>
        <Link
          to="/parent/notifications"
          aria-label="Notifications"
          className="press grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary"
        >
          <Bell className="size-5" />
        </Link>
      </header>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-gradient-cool p-4 text-accent-foreground shadow-soft">
          <Clock className="size-5" />
          <p className="mt-2 text-2xl font-extrabold">{totalMinutes} min</p>
          <p className="text-[11px] font-bold opacity-80">Apprentissage aujourd'hui</p>
        </div>
        <div className="rounded-3xl bg-gradient-play p-4 text-primary-foreground shadow-soft">
          <TrendingUp className="size-5" />
          <p className="mt-2 text-2xl font-extrabold">+14%</p>
          <p className="text-[11px] font-bold opacity-90">Progression cette semaine</p>
        </div>
      </div>

      <h2 className="mt-7 text-lg">Mes enfants</h2>
      <div className="mt-3 space-y-3">
        {children.map((c) => (
          <Link
            key={c.id}
            to="/parent/progression/$childId"
            params={{ childId: c.id }}
            className="press block rounded-3xl border border-border bg-card p-4 shadow-soft"
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-sun text-2xl">
                {c.avatar}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-extrabold">{c.name}</span>
                <span className="block text-xs font-bold text-muted-foreground">
                  {c.level} • {c.minutesToday} min aujourd'hui • 🔥 {c.streak}
                </span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
            </div>
            <ProgressBar value={c.progress} className="mt-3 h-2" />
          </Link>
        ))}
      </div>

      <h2 className="mt-7 text-lg">Raccourcis</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {[
          ["👨‍👩‍👧", "Gérer les enfants", "/parent/enfants"] as const,
          ["🏫", "École / classe", "/parent/ecole"] as const,
          ["💳", "Abonnement", "/parent/abonnement"] as const,
          ["⚙️", "Paramètres", "/parent/parametres"] as const,
        ].map(([e, label, to]) => (
          <Link
            key={label}
            to={to}
            className="press rounded-3xl border border-border bg-card p-4 shadow-soft"
          >
            <p className="text-xl">{e}</p>
            <p className="mt-2 truncate text-sm font-extrabold">{label}</p>
          </Link>
        ))}
      </div>
    </MobileShell>
  );
}
