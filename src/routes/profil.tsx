import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, Pill, ProgressBar } from "@/components/app/MobileShell";
import { children, subjects } from "@/lib/mock-data";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Mon profil — Kaléo" },
      {
        name: "description",
        content:
          "Avatar, pseudo, classe et statistiques : l'enfant suit sa progression et ses réussites dans son profil Kaléo.",
      },
      { property: "og:title", content: "Mon profil — Kaléo" },
      { property: "og:description", content: "Statistiques, progression et amis de l'enfant." },
    ],
  }),
  component: ChildProfile,
});

function ChildProfile() {
  const me = children[0]!;

  return (
    <MobileShell bottomNav={<BottomNav />}>
      <div className="rounded-[2rem] bg-gradient-cool p-6 text-center shadow-soft">
        <div className="mx-auto grid size-24 place-items-center rounded-[2rem] bg-card text-5xl">
          {me.avatar}
        </div>
        <h1 className="mt-4 text-2xl text-accent-foreground">{me.name}</h1>
        <div className="mt-2 flex justify-center gap-2">
          <Pill tone="muted">Classe {me.level}</Pill>
          <Pill tone="sun">Niveau 7</Pill>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          ["⚡", `${me.xp} XP`, "Total gagné"],
          ["🔥", `${me.streak} jours`, "Série en cours"],
          ["⏱️", `${me.minutesToday} min`, "Aujourd'hui"],
          ["🪙", `${me.coins}`, "Pièces"],
        ].map(([e, v, l]) => (
          <div key={l} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <p className="text-xl">{e}</p>
            <p className="mt-1 truncate text-lg font-extrabold">{v}</p>
            <p className="text-[11px] font-bold text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-7 text-lg">Ma progression</h2>
      <div className="mt-3 space-y-3">
        {subjects.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <span className="text-xl">{s.emoji}</span>
              <p className="min-w-0 truncate text-sm font-extrabold">{s.name}</p>
              <span className="text-xs font-extrabold text-primary">{s.progress}%</span>
            </div>
            <ProgressBar value={s.progress} className="mt-3 h-2" />
          </div>
        ))}
      </div>

      <h2 className="mt-7 text-lg">Mes amis</h2>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {["🦁", "🐼", "🐝", "🦉"].map((a, i) => (
          <div
            key={a}
            className="w-24 shrink-0 rounded-3xl border border-border bg-card p-3 text-center shadow-soft"
          >
            <p className="text-2xl">{a}</p>
            <p className="mt-1 truncate text-[11px] font-extrabold">Ami {i + 1}</p>
          </div>
        ))}
      </div>

      <Link
        to="/profils"
        className="press mt-7 block rounded-3xl border-2 border-border bg-card px-6 py-4 text-center font-extrabold"
      >
        Changer de profil
      </Link>
    </MobileShell>
  );
}
