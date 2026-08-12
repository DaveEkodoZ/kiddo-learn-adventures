import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/app/MobileShell";

export const Route = createFileRoute("/bienvenue")({
  head: () => ({
    meta: [
      { title: "Bienvenue sur Kaléo — Créer un compte parent" },
      {
        name: "description",
        content:
          "Créez votre compte parent Kaléo en une minute et ajoutez le profil de votre enfant, de la SIL au CM2.",
      },
      { property: "og:title", content: "Bienvenue sur Kaléo" },
      {
        property: "og:description",
        content: "Créez un compte parent et lancez l'apprentissage ludique de votre enfant.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <MobileShell className="flex flex-col">
      <div className="flex-1">
        <div className="relative mt-6 grid place-items-center">
          <div className="absolute size-56 rounded-full bg-sun/40 blur-2xl" />
          <div className="animate-float relative grid size-40 place-items-center rounded-[2.5rem] bg-gradient-sun text-7xl shadow-toy">
            🎒
          </div>
        </div>

        <h1 className="mt-10 text-center text-3xl leading-tight">
          Des leçons courtes,
          <br />
          des jeux, des étoiles ⭐
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-center font-semibold text-muted-foreground">
          Maths, Français, Anglais et Informatique pour les élèves de la SIL au CM2.
        </p>

        <ul className="mt-8 space-y-3">
          {[
            ["⏱️", "5 minutes par jour suffisent"],
            ["🎮", "Mini-jeux et animations"],
            ["👨‍👩‍👧", "Un compte parent, plusieurs enfants"],
          ].map(([e, t]) => (
            <li
              key={t}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-soft"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-xl">
                {e}
              </span>
              <span className="min-w-0 font-bold">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 space-y-3">
        <Link
          to="/connexion"
          className="press block rounded-3xl bg-primary px-6 py-4 text-center text-lg font-extrabold text-primary-foreground shadow-pop"
        >
          Créer un compte parent
        </Link>
        <Link
          to="/connexion"
          className="press block rounded-3xl border-2 border-border bg-card px-6 py-4 text-center text-lg font-extrabold text-foreground"
        >
          J'ai déjà un compte
        </Link>
      </div>
    </MobileShell>
  );
}
