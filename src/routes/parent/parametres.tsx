import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ScreenHeader } from "@/components/app/MobileShell";

export const Route = createFileRoute("/parent/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres parent — Kaléo" },
      {
        name: "description",
        content:
          "Gérez le temps d'écran, les notifications, la langue, la confidentialité et votre compte parent Kaléo.",
      },
      { property: "og:title", content: "Paramètres parent — Kaléo" },
      { property: "og:description", content: "Contrôle parental, langue et confidentialité." },
    ],
  }),
  component: Settings,
});

function Toggle({ label, hint, on }: { label: string; hint: string; on?: boolean }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft">
      <div className="min-w-0">
        <p className="truncate font-extrabold">{label}</p>
        <p className="text-xs font-semibold text-muted-foreground">{hint}</p>
      </div>
      <span
        className={`grid h-7 w-12 shrink-0 items-center rounded-full px-1 ${on ? "bg-accent" : "bg-muted"}`}
      >
        <span className={`size-5 rounded-full bg-card ${on ? "justify-self-end" : ""}`} />
      </span>
    </div>
  );
}

function Settings() {
  return (
    <MobileShell bottomNav={<BottomNav variant="parent" />}>
      <ScreenHeader title="Paramètres" subtitle="Compte parent" back={false} />

      <h2 className="text-lg">Contrôle parental</h2>
      <div className="mt-3 space-y-3">
        <Toggle label="Limite de temps quotidienne" hint="45 minutes par jour" on />
        <Toggle label="Pause nocturne" hint="Bloqué de 20h à 6h" on />
        <Toggle label="Classement visible" hint="L'enfant voit le classement" on />
      </div>

      <h2 className="mt-6 text-lg">Notifications</h2>
      <div className="mt-3 space-y-3">
        <Toggle label="Rappels d'apprentissage" hint="Chaque jour à 17h" on />
        <Toggle label="Rapport hebdomadaire" hint="Chaque dimanche soir" />
      </div>

      <h2 className="mt-6 text-lg">Compte</h2>
      <div className="mt-3 space-y-3">
        {[
          ["Langue de l'application", "Français"],
          ["Confidentialité des données", "Voir la politique"],
          ["Aide et contact", "Support Kaléo"],
        ].map(([label, hint]) => (
          <button
            key={label}
            className="press grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border border-border bg-card p-4 text-left shadow-soft"
          >
            <span className="min-w-0">
              <span className="block truncate font-extrabold">{label}</span>
              <span className="block text-xs font-semibold text-muted-foreground">{hint}</span>
            </span>
            <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>

      <Link
        to="/connexion"
        className="press mt-6 block rounded-3xl bg-secondary py-4 text-center font-extrabold text-destructive"
      >
        Se déconnecter
      </Link>
    </MobileShell>
  );
}
