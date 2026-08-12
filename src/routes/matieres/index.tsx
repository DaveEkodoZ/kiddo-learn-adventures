import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ProgressBar } from "@/components/app/MobileShell";
import { subjects } from "@/lib/mock-data";

export const Route = createFileRoute("/matieres/")({
  head: () => ({
    meta: [
      { title: "Mes matières — Kaléo" },
      {
        name: "description",
        content:
          "Mathématiques, Français, Anglais et Informatique : choisis ta matière et avance séquence par séquence.",
      },
      { property: "og:title", content: "Mes matières — Kaléo" },
      {
        property: "og:description",
        content: "Quatre matières du primaire, six séquences chacune, une progression claire.",
      },
    ],
  }),
  component: Subjects,
});

function Subjects() {
  return (
    <MobileShell bottomNav={<BottomNav />}>
      <h1 className="text-2xl">Mes matières</h1>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">
        Choisis ce que tu veux apprendre aujourd'hui.
      </p>

      <div className="mt-6 space-y-4">
        {subjects.map((s) => {
          const done = s.sequences.filter((q) => !q.locked).length;
          return (
            <Link
              key={s.id}
              to="/matieres/$subjectId"
              params={{ subjectId: s.id }}
              className="press block overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft"
            >
              <div className={`flex items-center gap-4 p-5 ${s.gradient}`}>
                <span className="grid size-16 shrink-0 place-items-center rounded-3xl bg-card/85 text-3xl">
                  {s.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xl font-extrabold text-primary-foreground">
                    {s.name}
                  </span>
                  <span className="block text-xs font-bold text-primary-foreground/85">
                    {done} séquence{done > 1 ? "s" : ""} débloquée{done > 1 ? "s" : ""} sur 6
                  </span>
                </span>
              </div>
              <div className="p-4">
                <ProgressBar value={s.progress} />
                <p className="mt-2 text-xs font-bold text-muted-foreground">
                  Progression : {s.progress}%
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </MobileShell>
  );
}
