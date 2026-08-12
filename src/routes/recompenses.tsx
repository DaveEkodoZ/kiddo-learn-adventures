import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ProgressBar } from "@/components/app/MobileShell";
import { badges, children } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recompenses")({
  head: () => ({
    meta: [
      { title: "Mes récompenses — Kaléo" },
      {
        name: "description",
        content:
          "XP, badges, trophées, pièces et séries : toutes les récompenses gagnées par l'enfant au fil des leçons.",
      },
      { property: "og:title", content: "Mes récompenses — Kaléo" },
      { property: "og:description", content: "Badges, pièces et séries à collectionner." },
    ],
  }),
  component: Rewards,
});

function Rewards() {
  const me = children[0]!;
  const nextLevelXp = 2000;

  return (
    <MobileShell bottomNav={<BottomNav />}>
      <h1 className="text-2xl">Mes récompenses</h1>

      <div className="mt-4 rounded-[2rem] bg-gradient-berry p-5 text-primary-foreground shadow-soft">
        <p className="text-xs font-extrabold tracking-widest opacity-90">NIVEAU 7</p>
        <p className="mt-1 text-3xl font-extrabold">{me.xp} XP</p>
        <ProgressBar value={(me.xp / nextLevelXp) * 100} className="mt-4 bg-card/30" />
        <p className="mt-2 text-xs font-bold opacity-90">
          Encore {nextLevelXp - me.xp} XP pour le niveau 8
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          ["🔥", `${me.streak} jours`, "Série"],
          ["🪙", `${me.coins}`, "Pièces"],
          ["⭐", "48", "Étoiles"],
        ].map(([e, v, l]) => (
          <div key={l} className="rounded-2xl border border-border bg-card p-3 text-center shadow-soft">
            <p className="text-2xl">{e}</p>
            <p className="mt-1 text-base font-extrabold">{v}</p>
            <p className="text-[11px] font-bold text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-7 text-lg">Mes badges</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {badges.map((b) => (
          <div
            key={b.name}
            className={cn(
              "rounded-3xl border p-4 text-center",
              b.unlocked
                ? "border-border bg-card shadow-soft"
                : "border-dashed border-border bg-secondary/40",
            )}
          >
            <p className={cn("text-3xl", !b.unlocked && "opacity-30 grayscale")}>{b.emoji}</p>
            <p
              className={cn(
                "mt-2 text-[11px] font-extrabold",
                !b.unlocked && "text-muted-foreground",
              )}
            >
              {b.name}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-7 text-lg">Boutique d'avatars</h2>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {["🦕", "🐬", "🦄", "🐙", "🦋"].map((a, i) => (
          <div
            key={a}
            className="w-28 shrink-0 rounded-3xl border border-border bg-card p-4 text-center shadow-soft"
          >
            <p className="text-3xl">{a}</p>
            <p className="mt-2 text-xs font-extrabold text-primary">🪙 {50 + i * 25}</p>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}
