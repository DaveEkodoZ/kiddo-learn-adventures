import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/app/MobileShell";
import { avatars, classLevels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parent/ajouter-enfant")({
  head: () => ({
    meta: [
      { title: "Ajouter un enfant — Kaléo" },
      {
        name: "description",
        content:
          "Ajoutez un nouveau profil enfant : prénom ou pseudo, avatar et classe de la SIL au CM2. L'école est facultative.",
      },
      { property: "og:title", content: "Ajouter un enfant — Kaléo" },
      { property: "og:description", content: "Un nouveau profil enfant en trois champs." },
    ],
  }),
  component: AddChild,
});

function AddChild() {
  const [avatar, setAvatar] = useState(avatars[1]);
  const [level, setLevel] = useState<string>("CP");

  return (
    <MobileShell className="flex flex-col">
      <ScreenHeader title="Ajouter un enfant" subtitle="Espace parent" />

      <div className="flex-1 space-y-6">
        <div className="grid place-items-center">
          <div className="grid size-24 place-items-center rounded-[2rem] bg-gradient-sun text-5xl shadow-toy">
            {avatar}
          </div>
        </div>

        <div>
          <label className="text-xs font-extrabold tracking-wide text-muted-foreground">
            PRÉNOM OU PSEUDO
          </label>
          <input
            placeholder="Ex. Junior"
            className="mt-2 w-full rounded-2xl border-2 border-input bg-card px-4 py-4 text-lg font-bold outline-none focus:border-primary"
          />
        </div>

        <div>
          <p className="text-xs font-extrabold tracking-wide text-muted-foreground">AVATAR</p>
          <div className="mt-2 grid grid-cols-4 gap-3">
            {avatars.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={cn(
                  "press grid aspect-square place-items-center rounded-2xl text-3xl",
                  a === avatar ? "bg-primary/15 ring-3 ring-primary" : "bg-secondary",
                )}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-extrabold tracking-wide text-muted-foreground">CLASSE</p>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {classLevels.map((c) => (
              <button
                key={c}
                onClick={() => setLevel(c)}
                className={cn(
                  "press rounded-2xl py-3 font-extrabold",
                  c === level
                    ? "bg-accent text-accent-foreground shadow-pop"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-extrabold tracking-wide text-muted-foreground">
            ÉCOLE (FACULTATIF)
          </label>
          <input
            placeholder="Code d'établissement"
            className="mt-2 w-full rounded-2xl border-2 border-input bg-card px-4 py-4 font-bold outline-none focus:border-primary"
          />
        </div>
      </div>

      <Link
        to="/parent/enfants"
        className="press mt-8 block rounded-3xl bg-primary px-6 py-4 text-center text-lg font-extrabold text-primary-foreground shadow-pop"
      >
        Enregistrer
      </Link>
    </MobileShell>
  );
}
