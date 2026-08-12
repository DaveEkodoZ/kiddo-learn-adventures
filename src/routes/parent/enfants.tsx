import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Plus } from "lucide-react";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, Pill, ProgressBar, ScreenHeader } from "@/components/app/MobileShell";
import { children } from "@/lib/mock-data";

export const Route = createFileRoute("/parent/enfants")({
  head: () => ({
    meta: [
      { title: "Gérer mes enfants — Kaléo" },
      {
        name: "description",
        content:
          "Ajoutez, modifiez et sélectionnez les profils enfants : chacun a sa classe, sa progression et ses récompenses.",
      },
      { property: "og:title", content: "Gérer mes enfants — Kaléo" },
      { property: "og:description", content: "Un compte parent, plusieurs profils enfants." },
    ],
  }),
  component: ManageChildren,
});

function ManageChildren() {
  return (
    <MobileShell bottomNav={<BottomNav variant="parent" />}>
      <ScreenHeader title="Mes enfants" subtitle={`${children.length} profils`} back={false} />

      <div className="space-y-3">
        {children.map((c) => (
          <Link
            key={c.id}
            to="/parent/progression/$childId"
            params={{ childId: c.id }}
            className="press block rounded-3xl border border-border bg-card p-4 shadow-soft"
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-sun text-2xl">
                {c.avatar}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-lg font-extrabold">{c.name}</span>
                <span className="mt-1 flex flex-wrap gap-2">
                  <Pill tone="muted">{c.level}</Pill>
                  <Pill tone="accent">{c.xp} XP</Pill>
                </span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
            </div>
            <ProgressBar value={c.progress} className="mt-3 h-2" />
          </Link>
        ))}
      </div>

      <Link
        to="/parent/ajouter-enfant"
        className="press mt-5 flex items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-border bg-secondary/40 px-6 py-5 font-extrabold"
      >
        <Plus className="size-5 text-primary" /> Ajouter un enfant
      </Link>

      <Link
        to="/parent/ecole"
        className="press mt-3 block rounded-3xl border border-border bg-card p-4 shadow-soft"
      >
        <p className="font-extrabold">🏫 Rejoindre une école ou une classe</p>
        <p className="mt-1 text-xs font-semibold text-muted-foreground">
          Avec un code d'établissement — facultatif
        </p>
      </Link>
    </MobileShell>
  );
}
