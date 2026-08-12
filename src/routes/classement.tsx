import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell } from "@/components/app/MobileShell";
import { leaderboard } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/classement")({
  head: () => ({
    meta: [
      { title: "Classement — Kaléo" },
      {
        name: "description",
        content:
          "Compare tes XP avec tes amis, ta classe et ton école : le classement Kaléo motive sans jamais décourager.",
      },
      { property: "og:title", content: "Classement — Kaléo" },
      { property: "og:description", content: "Amis, classe et école : qui gagne le plus d'XP ?" },
    ],
  }),
  component: Leaderboard,
});

const tabs = ["Amis", "Ma classe", "École"] as const;

function Leaderboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Amis");
  const podium = leaderboard.slice(0, 3);

  return (
    <MobileShell bottomNav={<BottomNav />}>
      <h1 className="text-2xl">Classement</h1>

      <div className="mt-4 flex gap-2 rounded-2xl bg-secondary p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "press min-w-0 flex-1 truncate rounded-xl px-2 py-2 text-xs font-extrabold",
              tab === t ? "bg-card text-primary shadow-soft" : "text-muted-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 items-end gap-3">
        {[podium[1], podium[0], podium[2]].map((p, i) => {
          if (!p) return <span key={i} />;
          const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
          return (
            <div key={p.name} className="text-center">
              <div
                className={cn(
                  "mx-auto grid place-items-center rounded-3xl text-3xl",
                  rank === 1 ? "size-20 bg-gradient-sun" : "size-16 bg-secondary",
                )}
              >
                {p.avatar}
              </div>
              <p className="mt-2 truncate text-sm font-extrabold">{p.name}</p>
              <p className="text-xs font-bold text-muted-foreground">{p.xp} XP</p>
              <div
                className={cn(
                  "mt-2 rounded-t-2xl bg-secondary py-2 text-lg font-extrabold",
                  rank === 1 ? "h-20 bg-gradient-play text-primary-foreground" : "h-12",
                )}
              >
                {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
              </div>
            </div>
          );
        })}
      </div>

      <ul className="mt-6 space-y-3">
        {leaderboard.map((p, i) => (
          <li
            key={p.name}
            className={cn(
              "grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-3",
              p.me ? "border-primary bg-primary/10" : "border-border bg-card shadow-soft",
            )}
          >
            <span className="w-6 shrink-0 text-center font-extrabold text-muted-foreground">
              {i + 1}
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary text-xl">
              {p.avatar}
            </span>
            <span className="min-w-0 truncate font-extrabold">
              {p.name} {p.me && <span className="text-primary">(moi)</span>}
            </span>
            <span className="shrink-0 text-sm font-extrabold text-primary">{p.xp} XP</span>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
