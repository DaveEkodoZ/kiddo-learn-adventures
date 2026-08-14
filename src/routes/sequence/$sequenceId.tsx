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

      <div className="mt-6 flex items-center gap-2">
        <h2 className="text-lg">Ma carte de parcours</h2>
        <span className="text-lg">🗺️</span>
      </div>

      <PathMap
        className="mt-2"
        nodes={sequence.chapters.map((ch, ci) => {
          const chProgress = ratio(chapterLessonIds(ch), done);
          const unlocked = isChapterUnlocked(sequence, ch, done);
          const finished = chProgress === 100;
          const isCurrent =
            unlocked &&
            !finished &&
            !sequence.chapters.some(
              (c, i) =>
                i < ci &&
                isChapterUnlocked(sequence, c, done) &&
                ratio(chapterLessonIds(c), done) !== 100,
            );

          return {
            id: ch.id,
            label: `Niveau ${ci + 1}`,
            sublabel: unlocked ? `${ch.title} • ${chProgress}%` : "Verrouillé",
            state: finished ? "done" : isCurrent ? "current" : unlocked ? "open" : "locked",
            emoji: finished ? undefined : unlocked ? "🎯" : undefined,
            link: { to: "/chapitre/$chapterId", params: { chapterId: ch.id } },
          } as const;
        })}
      />


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
