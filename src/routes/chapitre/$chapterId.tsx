import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, ProgressBar, ScreenHeader } from "@/components/app/MobileShell";
import { PathMap } from "@/components/app/PathMap";
import { chapterLessonIds, getChapter, isLessonUnlocked, ratio } from "@/lib/mock-data";
import { useProgress } from "@/lib/progress";


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

      <div className="mt-6 flex items-center gap-2">
        <h2 className="text-lg">Le chemin des leçons</h2>
        <span className="text-lg">🐸</span>
      </div>

      <PathMap
        className="mt-2"
        nodes={chapter.lessons.map((l, li) => {
          const finished = done.includes(l.id);
          const unlocked = isLessonUnlocked(chapter, l.id, done);
          const isCurrent = unlocked && !finished;
          return {
            id: l.id,
            label: `Leçon ${li + 1}`,
            sublabel: unlocked ? `${l.title} • ${l.minutes} min` : "Verrouillé",
            state: finished ? "done" : isCurrent ? "current" : unlocked ? "open" : "locked",
            emoji: "📚",
            link: { to: "/lecon/$lessonId", params: { lessonId: l.id } },
          } as const;
        })}
      />

    </MobileShell>
  );
}
