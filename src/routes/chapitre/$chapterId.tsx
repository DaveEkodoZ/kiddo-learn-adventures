import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock, Play } from "lucide-react";
import { MobileShell, ProgressBar, ScreenHeader, Stars } from "@/components/app/MobileShell";
import { chapterLessonIds, getChapter, isLessonUnlocked, ratio } from "@/lib/mock-data";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chapitre/$chapterId")({
  head: () => ({
    meta: [
      { title: "Leçons du chapitre — Kaléo" },
      {
        name: "description",
        content:
          "Chaque leçon Kaléo enchaîne intro, cours, exercice, correction, défi et solution. Réussis la leçon 1 pour ouvrir la leçon 2.",
      },
      { property: "og:title", content: "Leçons du chapitre — Kaléo" },
      {
        property: "og:description",
        content: "Intro, cours, exercice, correction, défi et solution dans chaque leçon.",
      },
    ],
  }),
  component: ChapterScreen,
});

function ChapterScreen() {
  const { chapterId } = Route.useParams();
  const { subject, sequence, chapter } = getChapter(chapterId);
  const { done } = useProgress();
  const progress = ratio(chapterLessonIds(chapter), done);

  return (
    <MobileShell>
      <ScreenHeader
        title={chapter.title}
        subtitle={`${subject.name} • Séquence ${sequence.index}`}
      />

      <div className="rounded-[2rem] border border-border bg-card p-4 shadow-soft">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="min-w-0 truncate font-extrabold">{chapter.lessons.length} leçons</p>
          <span className="shrink-0 text-xs font-extrabold text-muted-foreground">{progress}%</span>
        </div>
        <ProgressBar value={progress} className="mt-3" />
        <p className="mt-2 text-xs font-bold text-muted-foreground">
          Intro • cours • exercice • correction • défi • solution
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {chapter.lessons.map((l, li) => {
          const finished = done.includes(l.id);
          const unlocked = isLessonUnlocked(chapter, l.id, done);
          const rowClass = cn(
            "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border p-4",
            unlocked
              ? "press border-border bg-card shadow-soft"
              : "border-dashed border-border bg-secondary/50",
          );
          const inner = (
            <>
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-2xl",
                  finished
                    ? "bg-success text-success-foreground"
                    : unlocked
                      ? "bg-gradient-play text-primary-foreground"
                      : "bg-secondary text-muted-foreground",
                )}
              >
                {finished ? (
                  <Check className="size-5" />
                ) : unlocked ? (
                  <Play className="size-5" />
                ) : (
                  <Lock className="size-4" />
                )}
              </span>
              <span className="min-w-0">
                <span
                  className={cn("block truncate font-extrabold", !unlocked && "text-muted-foreground")}
                >
                  Leçon {li + 1} • {l.title}
                </span>
                <span className="block text-xs font-bold text-muted-foreground">
                  {unlocked ? `${l.minutes} min` : "Réussis la leçon précédente"}
                </span>
              </span>
              <Stars count={finished ? 3 : 0} />
            </>
          );

          return (
            <li key={l.id}>
              {unlocked ? (
                <Link to="/lecon/$lessonId" params={{ lessonId: l.id }} className={rowClass}>
                  {inner}
                </Link>
              ) : (
                <div className={rowClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </MobileShell>
  );
}
