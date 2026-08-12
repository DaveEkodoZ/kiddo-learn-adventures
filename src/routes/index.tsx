import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaléo — Apprendre en jouant, de la SIL au CM2" },
      {
        name: "description",
        content:
          "Kaléo est l'application mobile ludique qui accompagne les élèves du primaire, de la SIL au CM2, en maths, français, anglais et informatique.",
      },
      { property: "og:title", content: "Kaléo — Apprendre en jouant, de la SIL au CM2" },
      {
        property: "og:description",
        content:
          "Leçons courtes, mini-jeux et récompenses : Kaléo motive les enfants du primaire chaque jour.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-play px-6">
      <div className="w-full max-w-md text-center">
        <div className="animate-float mx-auto grid size-28 place-items-center rounded-[2rem] bg-card text-6xl shadow-soft">
          🦁
        </div>
        <h1 className="mt-8 text-5xl text-primary-foreground">Kaléo</h1>
        <p className="mt-2 font-semibold text-primary-foreground/90">
          Apprendre en jouant, de la SIL au CM2
        </p>

        <div className="mt-12 h-10">
          {ready ? (
            <Link
              to="/bienvenue"
              className="press animate-pop inline-block rounded-3xl bg-card px-8 py-3 text-lg font-extrabold text-primary shadow-pop"
            >
              C'est parti !
            </Link>
          ) : (
            <div className="mx-auto flex w-32 justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-3 animate-bounce rounded-full bg-primary-foreground/80"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
