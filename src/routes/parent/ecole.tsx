import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ScreenHeader } from "@/components/app/MobileShell";

export const Route = createFileRoute("/parent/ecole")({
  head: () => ({
    meta: [
      { title: "École et classe — Kaléo" },
      {
        name: "description",
        content:
          "Reliez le profil de votre enfant à son école ou sa classe avec un code d'établissement pour suivre le programme officiel.",
      },
      { property: "og:title", content: "École et classe — Kaléo" },
      { property: "og:description", content: "Rejoignez une classe avec un code." },
    ],
  }),
  component: School,
});

function School() {
  return (
    <MobileShell bottomNav={<BottomNav variant="parent" />}>
      <ScreenHeader title="École / classe" subtitle="Facultatif" />

      <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
        <p className="font-extrabold">Rejoindre avec un code</p>
        <p className="mt-1 text-xs font-semibold text-muted-foreground">
          Demandez le code à l'enseignant ou à l'administration.
        </p>
        <input
          placeholder="Ex. KAL-2F7C"
          className="mt-4 w-full rounded-2xl border-2 border-input bg-background px-4 py-4 text-center text-lg font-extrabold tracking-widest outline-none focus:border-primary"
        />
        <button className="press mt-4 w-full rounded-2xl bg-primary py-4 font-extrabold text-primary-foreground shadow-pop">
          Rejoindre la classe
        </button>
      </div>

      <div className="mt-4 rounded-3xl bg-secondary p-5">
        <p className="font-extrabold">Pourquoi lier une école ?</p>
        <ul className="mt-2 space-y-2 text-sm font-semibold text-muted-foreground">
          <li>• Le contenu suit la progression de la classe</li>
          <li>• L'enfant apparaît dans le classement de sa classe</li>
          <li>• L'enseignant voit les résultats globaux, pas les données privées</li>
        </ul>
      </div>
    </MobileShell>
  );
}
