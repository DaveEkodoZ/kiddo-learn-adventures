import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LessonEngine } from "@/components/app/LessonEngine";
import { MobileShell } from "@/components/app/MobileShell";
import { defaultLesson } from "@/lib/mock-data";

export const Route = createFileRoute("/lecon/$lessonId")({
  head: () => ({
    meta: [
      { title: "Leçon interactive — Kaléo" },
      {
        name: "description",
        content:
          "Le moteur de leçons Kaléo enchaîne introduction, explication, questions, mini-jeux et résultat dans un seul écran.",
      },
      { property: "og:title", content: "Leçon interactive — Kaléo" },
      {
        property: "og:description",
        content: "Introduction, explication, quiz, glisser-déposer, calcul puis résultat.",
      },
    ],
  }),
  component: LessonScreen,
});

function LessonScreen() {
  const navigate = useNavigate();
  const lesson = defaultLesson;

  return (
    <MobileShell>
      <LessonEngine
        title={lesson.title}
        subject={lesson.subject}
        steps={lesson.steps}
        onExit={() => navigate({ to: "/accueil" })}
      />
    </MobileShell>
  );
}
