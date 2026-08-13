import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import { LessonEngine } from "@/components/app/LessonEngine";
import { MobileShell } from "@/components/app/MobileShell";
import { buildLesson, defaultLesson, getLesson, nextLessonId } from "@/lib/mock-data";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/lecon/$lessonId")({
  head: () => ({
    meta: [
      { title: "Leçon interactive — Kaléo" },
      {
        name: "description",
        content:
          "Le moteur de leçons Kaléo enchaîne intro, cours, exercice, correction, défi et solution dans un seul écran.",
      },
      { property: "og:title", content: "Leçon interactive — Kaléo" },
      {
        property: "og:description",
        content: "Intro, cours, exercice, correction, défi puis solution.",
      },
    ],
  }),
  component: LessonScreen,
});

function LessonScreen() {
  const { lessonId } = Route.useParams();
  const navigate = useNavigate();
  const { completeLesson } = useProgress();
  const found = getLesson(lessonId);

  const lesson = useMemo(
    () => (found ? buildLesson(found.lesson, found.subject, found.chapter) : defaultLesson),
    [found],
  );

  const onComplete = useCallback(() => completeLesson(lessonId), [completeLesson, lessonId]);

  const backToChapter = () =>
    found
      ? navigate({ to: "/chapitre/$chapterId", params: { chapterId: found.chapter.id } })
      : navigate({ to: "/accueil" });

  const nextId = found ? nextLessonId(found.chapter, lessonId) : null;

  return (
    <MobileShell>
      <LessonEngine
        title={lesson.title}
        subject={lesson.subject}
        steps={lesson.steps}
        onExit={backToChapter}
        onComplete={onComplete}
        onNext={() =>
          nextId
            ? navigate({ to: "/lecon/$lessonId", params: { lessonId: nextId } })
            : backToChapter()
        }
        nextLabel={nextId ? "Leçon suivante" : "Retour au chapitre"}
      />
    </MobileShell>
  );
}
