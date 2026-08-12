import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Trophy } from "lucide-react";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ProgressBar, ScreenHeader } from "@/components/app/MobileShell";
import { getSubject } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matieres/$subjectId")({
  head: () => ({
    meta: [
      { title: "Parcours de la matière — Kaléo" },
      {
        name: "description",
        content:
          "Six séquences par matière : suis ton chemin d'apprentissage, débloque les contenus et relève le défi de séquence.",
      },
      { property: "og:title", content: "Parcours de la matière — Kaléo" },
      {
        property: "og:description",
        content: "Un chemin visuel, séquence par séquence, du plus simple au plus complet.",
      },
    ],
  }),
  component: SubjectPath,
});

function SubjectPath() {
  const { subjectId } = Route.useParams();
  const subject = getSubject(subjectId);

  return (
    <MobileShell bottomNav={<BottomNav />}>
      <ScreenHeader title={subject.name} subtitle={`Progression ${subject.progress}%`} />

      <div className={cn("rounded-[2rem] p-5 shadow-soft", subject.gradient)}>
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-card/85 text-2xl">
            {subject.emoji}
          </span>
          <div className="min-w-0 text-primary-foreground">
            <p className="text-sm font-extrabold">Continue ton parcours</p>
            <p className="text-xs font-bold opacity-85">6 séquences • défis à la fin de chacune</p>
          </div>
        </div>
        <ProgressBar value={subject.progress} className="mt-4 bg-card/40" />
      </div>

      <ol className="relative mt-7 space-y-4 pl-8">
        <span className="absolute top-4 bottom-4 left-3 w-1 rounded-full bg-secondary" />
        {subject.sequences.map((s) => (
          <li key={s.id} className="relative">
            <span
              className={cn(
                "absolute top-6 -left-8 grid size-7 place-items-center rounded-full text-xs font-extrabold ring-4 ring-background",
                s.locked ? "bg-secondary text-muted-foreground" : "bg-primary text-primary-foreground",
              )}
            >
              {s.index}
            </span>
            {s.locked ? (
              <div className="rounded-3xl border border-border bg-secondary/50 p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <p className="min-w-0 truncate font-extrabold text-muted-foreground">{s.title}</p>
                  <Lock className="size-4 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1 text-xs font-bold text-muted-foreground">
                  Termine la séquence précédente pour débloquer
                </p>
              </div>
            ) : (
              <Link
                to="/sequence/$sequenceId"
                params={{ sequenceId: s.id }}
                className="press block rounded-3xl border border-border bg-card p-4 shadow-soft"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <p className="min-w-0 truncate font-extrabold">{s.title}</p>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sun px-2 py-1 text-[11px] font-extrabold text-sun-foreground">
                    <Trophy className="size-3" /> Défi
                  </span>
                </div>
                <ProgressBar value={s.progress} className="mt-3 h-2" />
                <p className="mt-1 text-xs font-bold text-muted-foreground">
                  {s.chapters.length} chapitres • {s.progress}%
                </p>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </MobileShell>
  );
}
