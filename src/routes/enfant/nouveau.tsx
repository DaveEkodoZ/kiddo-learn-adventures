import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/app/MobileShell";
import { avatars, classLevels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/enfant/nouveau")({
  head: () => ({
    meta: [
      { title: "Créer le profil de mon enfant — Kaléo" },
      {
        name: "description",
        content:
          "Choisissez un prénom, un avatar et une classe (SIL à CM2) pour créer le profil d'apprentissage de votre enfant.",
      },
      { property: "og:title", content: "Créer le profil de mon enfant — Kaléo" },
      {
        property: "og:description",
        content: "Prénom, avatar et classe : le profil enfant est prêt en 30 secondes.",
      },
    ],
  }),
  component: NewChild,
});

function NewChild() {
  const [avatar, setAvatar] = useState(avatars[0]);
  const [level, setLevel] = useState<string>("SIL");
  const [name, setName] = useState("");

  return (
    <MobileShell className="flex flex-col">
      <ScreenHeader title="Mon enfant" subtitle="Étape 3 sur 3" />

      <div className="flex-1 space-y-7">
        <div className="grid place-items-center">
          <div className="grid size-28 place-items-center rounded-[2rem] bg-gradient-sun text-6xl shadow-toy">
            {avatar}
          </div>
        </div>

        <div>
          <label className="text-xs font-extrabold tracking-wide text-muted-foreground">
            PRÉNOM OU PSEUDO
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex. Amina"
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
                  "press rounded-2xl py-3 text-base font-extrabold",
                  c === level
                    ? "bg-accent text-accent-foreground shadow-pop"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs font-semibold text-muted-foreground">
            L'école pourra être ajoutée plus tard, ce n'est pas obligatoire.
          </p>
        </div>
      </div>

      <Link
        to="/profils"
        className="press mt-8 block rounded-3xl bg-primary px-6 py-4 text-center text-lg font-extrabold text-primary-foreground shadow-pop"
      >
        Créer le profil
      </Link>
    </MobileShell>
  );
}
