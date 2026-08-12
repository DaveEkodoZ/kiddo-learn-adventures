import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ScreenHeader } from "@/components/app/MobileShell";

export const Route = createFileRoute("/parent/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications parent — Kaléo" },
      {
        name: "description",
        content:
          "Rapports de progression, alertes de temps d'écran et informations d'abonnement pour le compte parent.",
      },
      { property: "og:title", content: "Notifications parent — Kaléo" },
      { property: "og:description", content: "Rapports et alertes de votre compte parent." },
    ],
  }),
  component: ParentNotifications,
});

const items = [
  ["📊", "Rapport hebdomadaire prêt", "Amina a progressé de 14% en maths", "il y a 1 h"],
  ["⏳", "Limite de temps atteinte", "Junior a utilisé ses 45 minutes", "hier"],
  ["🎁", "Essai gratuit : 3 jours restants", "Choisissez une formule pour continuer", "hier"],
  ["🏫", "Invitation de classe", "L'école Les Colibris propose de relier Amina", "il y a 3 j"],
];

function ParentNotifications() {
  return (
    <MobileShell bottomNav={<BottomNav variant="parent" />}>
      <ScreenHeader title="Notifications" subtitle="Espace parent" />

      <ul className="space-y-3">
        {items.map(([e, t, d, when]) => (
          <li
            key={t}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-xl">
              {e}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-extrabold">{t}</span>
              <span className="block text-xs font-semibold text-muted-foreground">{d}</span>
              <span className="mt-1 block text-[11px] font-bold text-primary">{when}</span>
            </span>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
