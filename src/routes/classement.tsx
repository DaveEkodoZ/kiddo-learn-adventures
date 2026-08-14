import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus, X } from "lucide-react";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell } from "@/components/app/MobileShell";
import { avatars, leaderboard } from "@/lib/mock-data";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/classement")({
  head: () => ({
    meta: [
      { title: "Classement des amis — Kaléo" },
      {
        name: "description",
        content:
          "Ajoute tes amis et compare vos XP : seuls tes amis apparaissent dans ton classement Kaléo.",
      },
      { property: "og:title", content: "Classement des amis — Kaléo" },
      {
        property: "og:description",
        content: "Ajoute un ami, gagne des XP et grimpe dans le podium de ton cercle.",
      },
    ],
  }),
  component: Leaderboard,
});

const me = { name: "Amina", avatar: "🦊", xp: 1840, me: true };

/** XP simulés et stables pour un ami ajouté à la main. */
const friendXp = (name: string) =>
  leaderboard.find((p) => p.name === name)?.xp ??
  600 + ([...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 1600);

const friendAvatar = (name: string) =>
  leaderboard.find((p) => p.name === name)?.avatar ??
  (avatars[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % avatars.length] as string);

function Leaderboard() {
  const { friends, addFriend, removeFriend, hydrated } = useProgress();
  const [name, setName] = useState("");

  const rows = [
    me,
    ...friends.map((f) => ({ name: f, avatar: friendAvatar(f), xp: friendXp(f), me: false })),
  ].sort((a, b) => b.xp - a.xp);

  const podium = rows.slice(0, 3);

  return (
    <MobileShell bottomNav={<BottomNav />}>
      <h1 className="text-2xl">Classement des amis</h1>
      <p className="mt-1 text-sm font-bold text-muted-foreground">
        Ajoute tes amis : ce sont eux qui apparaissent ici.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addFriend(name);
          setName("");
        }}
        className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Prénom de ton ami"
          className="min-w-0 rounded-2xl border-2 border-input bg-card px-4 py-3 font-bold outline-none focus:border-primary"
        />
        <button
          type="submit"
          aria-label="Ajouter un ami"
          className="press grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-pop"
        >
          <UserPlus className="size-5" />
        </button>
      </form>

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
        {rows.map((p, i) => (
          <li
            key={p.name}
            className={cn(
              "grid grid-cols-[auto_auto_minmax(0,1fr)_auto_auto] items-center gap-3 rounded-2xl border p-3",
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
            {p.me ? (
              <span className="size-7 shrink-0" />
            ) : (
              <button
                onClick={() => removeFriend(p.name)}
                aria-label={`Retirer ${p.name}`}
                className="press grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </li>
        ))}
      </ul>

      {hydrated && friends.length === 0 && (
        <p className="mt-4 rounded-2xl bg-secondary p-4 text-sm font-bold text-muted-foreground">
          Tu n'as pas encore d'amis dans ton classement. Ajoute un prénom ci-dessus !
        </p>
      )}
    </MobileShell>
  );
}
