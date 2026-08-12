import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, Pill, ScreenHeader } from "@/components/app/MobileShell";

export const Route = createFileRoute("/parent/abonnement")({
  head: () => ({
    meta: [
      { title: "Abonnement — Kaléo" },
      {
        name: "description",
        content:
          "Choisissez la formule Kaléo adaptée à votre famille : mensuelle, annuelle ou multi-enfants, paiement mobile money inclus.",
      },
      { property: "og:title", content: "Abonnement — Kaléo" },
      { property: "og:description", content: "Formules simples, paiement mobile money." },
    ],
  }),
  component: Subscription,
});

const plans = [
  { id: "m", name: "Mensuel", price: "2 500 FCFA", note: "par mois", best: false },
  { id: "a", name: "Annuel", price: "22 000 FCFA", note: "2 mois offerts", best: true },
  { id: "f", name: "Famille", price: "35 000 FCFA", note: "jusqu'à 4 enfants / an", best: false },
];

function Subscription() {
  return (
    <MobileShell bottomNav={<BottomNav variant="parent" />}>
      <ScreenHeader title="Abonnement" subtitle="Formule actuelle : essai gratuit" />

      <div className="space-y-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={
              p.best
                ? "rounded-3xl bg-gradient-play p-5 text-primary-foreground shadow-pop"
                : "rounded-3xl border border-border bg-card p-5 shadow-soft"
            }
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <p className="min-w-0 truncate text-lg font-extrabold">{p.name}</p>
              {p.best ? <Pill tone="sun">Le plus choisi</Pill> : null}
            </div>
            <p className="mt-2 text-2xl font-extrabold">{p.price}</p>
            <p className="text-xs font-bold opacity-80">{p.note}</p>
            <button
              className={
                p.best
                  ? "press mt-4 w-full rounded-2xl bg-card py-3 font-extrabold text-foreground"
                  : "press mt-4 w-full rounded-2xl bg-primary py-3 font-extrabold text-primary-foreground"
              }
            >
              Choisir
            </button>
          </div>
        ))}
      </div>

      <h2 className="mt-6 text-lg">Inclus dans l'abonnement</h2>
      <ul className="mt-3 space-y-2">
        {[
          "Toutes les matières de la SIL au CM2",
          "Leçons illustrées et jeux interactifs",
          "Suivi détaillé de la progression",
          "Mode hors-ligne des leçons téléchargées",
        ].map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm font-semibold">
            <Check className="mt-0.5 size-4 shrink-0 text-accent" /> {f}
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-lg">Moyens de paiement</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {["MTN MoMo", "Orange Money", "Carte"].map((m) => (
          <div
            key={m}
            className="grid place-items-center rounded-2xl border border-border bg-card px-2 py-4 text-center text-xs font-extrabold shadow-soft"
          >
            {m}
          </div>
        ))}
      </div>
    </MobileShell>
  );
}
