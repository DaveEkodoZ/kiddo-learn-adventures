import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock, Play, Trophy } from "lucide-react";
import { MobileShell, ProgressBar, ScreenHeader } from "@/components/app/MobileShell";
import {
  chapterLessonIds,
  getSequence,
  isChapterUnlocked,
  ratio,
  sequenceLessonIds,
} from "@/lib/mock-data";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sequence/$sequenceId")({
  head: () => ({
    meta: [
      { title: "Niveaux de la séquence — Kaléo" },
      {
        name: "description",
        content:
          "Les chapitres d'une séquence Kaléo forment des niveaux : chaque niveau réussi débloque le suivant.",
      },
      { property: "og:title", content: "Niveaux de la séquence — Kaléo" },
      {
        property: "og:description",
        content: "Chapitres-niveaux à débloquer un par un, puis le défi de séquence.",
      },
    ],
  }),
  component: SequenceScreen,
});

function SequenceScreen() {
  const { sequenceId } = Route.useParams();
  const { subject, sequence } = getSequence(sequenceId);
  const { done } = useProgress();
  const progress = ratio(sequenceLessonIds(sequence), done);

  return (
    <MobileShell>
      <ScreenHeader
        title={`Séquence ${sequence.index}`}
        subtitle={`${subject.name} • ${sequence.title}`}
      />

      <div className={cn("rounded-[2rem] p-5 shadow-soft", subject.gradient)}>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-primary-foreground">
          <p className="min-w-0 truncate font-extrabold">{sequence.title}</p>
          <span className="shrink-0 text-xs font-extrabold">{progress}%</span>
        </div>
        <ProgressBar value={progress} className="mt-3 bg-card/40" />
        <p className="mt-2 text-xs font-bold text-primary-foreground/85">
          {sequence.chapters.length} niveaux à débloquer
        </p>
      </div>

      <ol className="relative mt-7 space-y-4 pl-8">
        <span className="absolute top-4 bottom-4 left-3 w-1 rounded-full bg-secondary" />
        {sequence.chapters.map((ch, ci) => {
          const ids = chapterLessonIds(ch);
          const chProgress = ratio(ids, done);
          const unlocked = isChapterUnlocked(sequence, ch, done);
          const finished = chProgress === 100;

          return (
            <li key={ch.id} className="relative">
              <span
                className={cn(
                  "absolute top-6 -left-8 grid size-7 place-items-center rounded-full text-xs font-extrabold ring-4 ring-background",
                  finished
                    ? "bg-success text-success-foreground"
                    : unlocked
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground",
                )}
              >
                {ci + 1}
              </span>

              {unlocked ? (
                <Link
                  to="/chapitre/$chapterId"
                  params={{ chapterId: ch.id }}
                  className="press block rounded-3xl border border-border bg-card p-4 shadow-soft"
                >
                  <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-2xl",
                        finished
                          ? "bg-success text-success-foreground"
                          : "bg-gradient-play text-primary-foreground",
                      )}
                    >
                      {finished ? <Check className="size-5" /> : <Play className="size-5" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-extrabold">
                        Niveau {ci + 1} • {ch.title}
                      </span>
                      <span className="block text-xs font-bold text-muted-foreground">
                        {ch.lessons.length} leçons • {chProgress}%
                      </span>
                    </span>
                    <span className="shrink-0 text-lg">{finished ? "⭐" : "🎯"}</span>
                  </div>
                  <ProgressBar value={chProgress} className="mt-3 h-2" />
                </Link>
              ) : (
                <div className="rounded-3xl border border-dashed border-border bg-secondary/50 p-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <p className="min-w-0 truncate font-extrabold text-muted-foreground">
                      Niveau {ci + 1} • {ch.title}
                    </p>
                    <Lock className="size-4 shrink-0 text-muted-foreground" />
                  </div>
                  <p className="mt-1 text-xs font-bold text-muted-foreground">
                    Termine le niveau précédent pour débloquer
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-[2rem] bg-gradient-sun p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-card/85">
            <Trophy className="size-6 text-primary" />
          </span>
          <div className="min-w-0">
            <p className="font-extrabold text-sun-foreground">Défi de séquence</p>
            <p className="text-xs font-bold text-sun-foreground/80">
              {progress === 100
                ? "Débloqué ! Relève le défi final."
                : "Termine tous les niveaux pour l'ouvrir"}
            </p>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
