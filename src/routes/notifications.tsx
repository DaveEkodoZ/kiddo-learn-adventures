import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ScreenHeader } from "@/components/app/MobileShell";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Mes notifications — Kaléo" },
      {
        name: "description",
        content: "Rappels de leçons, nouveaux badges et invitations d'amis : les notifications de l'enfant.",
      },
      { property: "og:title", content: "Mes notifications — Kaléo" },
      { property: "og:description", content: "Rappels doux et bonnes nouvelles d'apprentissage." },
    ],
  }),
  component: Notifications,
});

const items = [
  ["⏰", "C'est l'heure d'apprendre !", "Ta mission du jour t'attend", "il y a 5 min"],
  ["🏅", "Nouveau badge : Roi du calcul", "Tu as réussi 20 calculs d'affilée", "il y a 2 h"],
  ["🔥", "Ta série continue", "6 jours de suite, continue comme ça", "hier"],
  ["👋", "Ngo Bea t'a dépassé", "Il te manque 310 XP pour reprendre la tête", "hier"],
];

function Notifications() {
  return (
    <MobileShell bottomNav={<BottomNav />}>
      <ScreenHeader title="Notifications" subtitle="Tes rappels et bonnes nouvelles" />

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
