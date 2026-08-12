import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Settings } from "lucide-react";
import { MobileShell, Pill } from "@/components/app/MobileShell";
import { children } from "@/lib/mock-data";

export const Route = createFileRoute("/profils")({
  head: () => ({
    meta: [
      { title: "Qui apprend aujourd'hui ? — Kaléo" },
      {
        name: "description",
        content:
          "Choisissez le profil de l'enfant qui apprend. Un compte parent Kaléo gère plusieurs enfants, chacun avec sa classe et sa progression.",
      },
      { property: "og:title", content: "Qui apprend aujourd'hui ? — Kaléo" },
      {
        property: "og:description",
        content: "Un compte, plusieurs enfants : chacun sa progression et ses récompenses.",
      },
    ],
  }),
  component: Profiles,
});

function Profiles() {
  return (
    <MobileShell className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-xs font-extrabold tracking-widest text-muted-foreground">KALÉO</p>
        <Link
          to="/parent"
          className="press inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-xs font-bold"
        >
          <Settings className="size-4" /> Espace parent
        </Link>
      </div>

      <h1 className="mt-8 text-center text-3xl">Qui apprend aujourd'hui ?</h1>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {children.map((c) => (
          <Link
            key={c.id}
            to="/accueil"
            className="press rounded-3xl border border-border bg-card p-4 text-center shadow-soft"
          >
            <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-gradient-sun text-4xl">
              {c.avatar}
            </div>
            <p className="mt-3 truncate text-lg font-extrabold">{c.name}</p>
            <div className="mt-2 flex justify-center">
              <Pill tone="muted">{c.level}</Pill>
            </div>
            <p className="mt-2 text-xs font-bold text-muted-foreground">
              🔥 {c.streak} jours • {c.xp} XP
            </p>
          </Link>
        ))}

        <Link
          to="/parent/ajouter-enfant"
          className="press grid place-items-center rounded-3xl border-2 border-dashed border-border bg-secondary/40 p-4 text-center"
        >
          <div>
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-card">
              <Plus className="size-6 text-primary" />
            </div>
            <p className="mt-3 text-sm font-extrabold">Ajouter un enfant</p>
          </div>
        </Link>
      </div>

      <p className="mt-auto pt-10 text-center text-xs font-semibold text-muted-foreground">
        Les achats et les réglages sensibles restent dans l'espace parent.
      </p>
    </MobileShell>
  );
}
