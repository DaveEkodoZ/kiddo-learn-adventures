import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Sparkles, Trophy } from "lucide-react";
import { BottomNav } from "@/components/app/BottomNav";
import { MobileShell, ProgressBar, ScreenHeader } from "@/components/app/MobileShell";
import {
  getSubject,
  isSequenceUnlocked,
  ratio,
  sequenceLessonIds,
  chapterLessonIds,
} from "@/lib/mock-data";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matieres/$subjectId")({
  head: () => ({
    meta: [
      { title: "Séquences de la matière — Kaléo" },
      {
        name: "description",
        content:
          "Chaque matière se joue en cartes de séquences : termine une séquence pour débloquer la suivante et ses niveaux.",
      },
      { property: "og:title", content: "Séquences de la matière — Kaléo" },
      {
        property: "og:description",
        content: "Des cartes de séquences colorées avec des niveaux qui se débloquent au fur et à mesure.",
      },
    ],
  }),
  component: SubjectPath,
});

function SubjectPath() {
  const { subjectId } = Route.useParams();
  const subject = getSubject(subjectId);
  const { done } = useProgress();

  const globalIds = subject.sequences.flatMap(sequenceLessonIds);
  const globalProgress = ratio(globalIds, done);

  return (
    <MobileShell bottomNav={<BottomNav />}>
      <ScreenHeader title={subject.name} subtitle={`Progression ${globalProgress}%`} />

      <div className={cn("rounded-[2rem] p-5 shadow-soft", subject.gradient)}>
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-card/85 text-2xl">
            {subject.emoji}
          </span>
          <div className="min-w-0 text-primary-foreground">
            <p className="text-sm font-extrabold">Choisis ta séquence</p>
            <p className="text-xs font-bold opacity-85">
              {subject.sequences.length} cartes • chapitres et défis à l'intérieur
            </p>
          </div>
        </div>
        <ProgressBar value={globalProgress} className="mt-4 bg-card/40" />
      </div>

      <div className="mt-6 grid gap-4">
        {subject.sequences.map((s) => {
          const ids = sequenceLessonIds(s);
          const progress = ratio(ids, done);
          const unlocked = isSequenceUnlocked(subject, s, done);
          const card = (
            <>
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                <span
                  className={cn(
                    "grid size-12 shrink-0 place-items-center rounded-2xl text-lg font-extrabold",
                    unlocked
                      ? "bg-gradient-play text-primary-foreground"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {unlocked ? s.index : <Lock className="size-5" />}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-base font-extrabold">{s.title}</span>
                  <span className="block text-xs font-bold text-muted-foreground">
                    Séquence {s.index} • {s.chapters.length} niveaux
                  </span>
                </span>
                {unlocked ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sun px-2 py-1 text-[11px] font-extrabold text-sun-foreground">
                    <Trophy className="size-3" /> Défi
                  </span>
                ) : (
                  <Sparkles className="size-4 shrink-0 text-muted-foreground" />
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {s.chapters.map((c, ci) => {
                  const cProgress = ratio(chapterLessonIds(c), done);
                  const cOpen = unlocked && (ci === 0 || ratio(chapterLessonIds(s.chapters[ci - 1]!), done) === 100);
                  return (
                    <span
                      key={c.id}
                      className={cn(
                        "grid size-9 place-items-center rounded-xl text-xs font-extrabold",
                        cProgress === 100
                          ? "bg-success text-success-foreground"
                          : cOpen
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-muted-foreground",
                      )}
                      title={c.title}
                    >
                      {cProgress === 100 ? "★" : cOpen ? ci + 1 : "🔒"}
                    </span>
                  );
                })}
              </div>

              <ProgressBar value={progress} className="mt-4 h-2" />
              <p className="mt-1 text-xs font-bold text-muted-foreground">
                {unlocked
                  ? `${progress}% terminé`
                  : "Termine la séquence précédente pour débloquer cette carte"}
              </p>
            </>
          );

          return unlocked ? (
            <Link
              key={s.id}
              to="/sequence/$sequenceId"
              params={{ sequenceId: s.id }}
              className="press block rounded-[2rem] border border-border bg-card p-4 shadow-soft"
            >
              {card}
            </Link>
          ) : (
            <div
              key={s.id}
              className="rounded-[2rem] border border-dashed border-border bg-secondary/40 p-4"
            >
              {card}
            </div>
          );
        })}
      </div>
    </MobileShell>
  );
}
