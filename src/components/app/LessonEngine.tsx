import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, X, Volume2 } from "lucide-react";
import { ProgressBar, Stars } from "@/components/app/MobileShell";
import { cn } from "@/lib/utils";
import type { Step } from "@/lib/mock-data";

type Props = { title: string; subject: string; steps: Step[]; onExit: () => void };

/**
 * Lesson Engine : un seul écran qui joue dynamiquement toutes les activités
 * (INTRO, EXPLANATION, QCM, TRUE_FALSE, FILL_BLANK, DRAG_DROP, MATCHING,
 * CALCULATION, RESULT). Ajouter une leçon = ajouter du contenu, pas une page.
 */
export function LessonEngine({ title, subject, steps, onExit }: Props) {
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState<null | boolean>(null);

  const step = steps[index] as Step;
  const total = steps.length;
  const quizCount = useMemo(
    () => steps.filter((s) => s.type !== "INTRO" && s.type !== "EXPLANATION" && s.type !== "RESULT").length,
    [steps],
  );

  const next = () => {
    setAnswered(null);
    setIndex((i) => Math.min(total - 1, i + 1));
  };

  const validate = (ok: boolean) => {
    if (answered !== null) return;
    setAnswered(ok);
    if (ok) setCorrect((c) => c + 1);
  };

  if (step.type === "RESULT") {
    const score = quizCount ? Math.round((correct / quizCount) * 100) : 100;
    const stars = score >= 90 ? 3 : score >= 60 ? 2 : 1;
    return (
      <div className="flex min-h-[80vh] flex-col">
        <div className="flex-1">
          <div className="mt-6 grid place-items-center">
            <div className="animate-pop grid size-32 place-items-center rounded-[2.5rem] bg-gradient-sun text-6xl shadow-toy">
              🎉
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl">Bravo !</h2>
          <p className="mt-1 text-center text-sm font-bold text-muted-foreground">
            {title} • {subject}
          </p>
          <div className="mt-4 flex justify-center">
            <Stars count={stars} size="size-9" />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              ["Score", `${score}%`],
              ["XP gagnés", `+${40 + stars * 10}`],
              ["Pièces", `+${stars * 5}`],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-2xl border border-border bg-card p-3 text-center shadow-soft"
              >
                <p className="text-lg font-extrabold text-primary">{v}</p>
                <p className="text-[11px] font-bold text-muted-foreground">{k}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-card p-4 shadow-soft">
            <p className="text-sm font-extrabold">Bonnes réponses</p>
            <ProgressBar value={score} className="mt-3" />
            <p className="mt-2 text-xs font-bold text-muted-foreground">
              {correct} / {quizCount} activités réussies
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={onExit}
            className="press w-full rounded-3xl bg-primary px-6 py-4 text-lg font-extrabold text-primary-foreground shadow-pop"
          >
            Leçon suivante
          </button>
          <Link
            to="/recompenses"
            className="press block rounded-3xl border-2 border-border bg-card px-6 py-4 text-center text-lg font-extrabold"
          >
            Voir mes récompenses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] flex-col">
      <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <button
          onClick={onExit}
          aria-label="Quitter la leçon"
          className="press grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary"
        >
          <X className="size-5" />
        </button>
        <div className="min-w-0">
          <ProgressBar value={((index + 1) / total) * 100} />
          <p className="mt-1 truncate text-[11px] font-bold text-muted-foreground">
            {title} • étape {index + 1} / {total}
          </p>
        </div>
      </header>

      <div className="mt-6 flex-1">
        <StepView step={step} answered={answered} onAnswer={validate} />
      </div>

      <Feedback answered={answered} />

      <button
        onClick={next}
        disabled={needsAnswer(step) && answered === null}
        className={cn(
          "press mt-4 w-full rounded-3xl px-6 py-4 text-lg font-extrabold shadow-pop",
          needsAnswer(step) && answered === null
            ? "bg-secondary text-muted-foreground shadow-none"
            : "bg-primary text-primary-foreground",
        )}
      >
        {needsAnswer(step) && answered === null ? "Choisis une réponse" : "Continuer"}
      </button>
    </div>
  );
}

const needsAnswer = (s: Step) =>
  s.type !== "INTRO" && s.type !== "EXPLANATION" && s.type !== "RESULT";

function Feedback({ answered }: { answered: null | boolean }) {
  if (answered === null) return null;
  return (
    <div
      className={cn(
        "animate-pop mt-4 flex items-center gap-3 rounded-2xl p-4 font-extrabold",
        answered ? "bg-success/20 text-foreground" : "bg-destructive/15 text-foreground",
      )}
    >
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-xl",
          answered ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground",
        )}
      >
        {answered ? <Check className="size-5" /> : <X className="size-5" />}
      </span>
      <span className="min-w-0">{answered ? "Super, c'est juste !" : "Presque ! Regarde bien."}</span>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-pop rounded-[2rem] border border-border bg-card p-5 shadow-soft">
      {children}
    </div>
  );
}

function Choice({
  children,
  onClick,
  state,
}: {
  children: React.ReactNode;
  onClick: () => void;
  state: "idle" | "good" | "bad";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "press w-full rounded-2xl border-2 px-4 py-4 text-left text-lg font-extrabold",
        state === "idle" && "border-input bg-card",
        state === "good" && "border-success bg-success/20",
        state === "bad" && "border-destructive bg-destructive/10",
      )}
    >
      {children}
    </button>
  );
}

function StepView({
  step,
  answered,
  onAnswer,
}: {
  step: Step;
  answered: null | boolean;
  onAnswer: (ok: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [left, setLeft] = useState<string | null>(null);
  const [value, setValue] = useState("");

  switch (step.type) {
    case "INTRO":
    case "EXPLANATION":
      return (
        <Card>
          <div className="grid place-items-center">
            <span className="animate-float text-7xl">{step.emoji}</span>
          </div>
          <h2 className="mt-5 text-center text-2xl">{step.title}</h2>
          <p className="mt-3 text-center font-semibold text-muted-foreground">{step.text}</p>
          <button className="press mx-auto mt-5 flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-extrabold">
            <Volume2 className="size-4" /> Écouter
          </button>
        </Card>
      );

    case "QCM":
      return (
        <Card>
          <h2 className="text-xl">{step.question}</h2>
          <div className="mt-5 space-y-3">
            {step.options.map((o, i) => (
              <Choice
                key={o}
                onClick={() => {
                  if (answered !== null) return;
                  setPicked(i);
                  onAnswer(i === step.answer);
                }}
                state={
                  answered === null || picked !== i
                    ? answered !== null && i === step.answer
                      ? "good"
                      : "idle"
                    : i === step.answer
                      ? "good"
                      : "bad"
                }
              >
                {o}
              </Choice>
            ))}
          </div>
        </Card>
      );

    case "TRUE_FALSE":
      return (
        <Card>
          <h2 className="text-xl">Vrai ou faux ?</h2>
          <p className="mt-3 rounded-2xl bg-secondary p-4 text-lg font-extrabold">{step.question}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[true, false].map((v) => (
              <Choice
                key={String(v)}
                onClick={() => {
                  if (answered !== null) return;
                  setPicked(v ? 1 : 0);
                  onAnswer(v === step.answer);
                }}
                state={
                  answered === null
                    ? "idle"
                    : v === step.answer
                      ? "good"
                      : picked === (v ? 1 : 0)
                        ? "bad"
                        : "idle"
                }
              >
                <span className="block text-center">{v ? "✅ Vrai" : "❌ Faux"}</span>
              </Choice>
            ))}
          </div>
        </Card>
      );

    case "FILL_BLANK":
      return (
        <Card>
          <h2 className="text-xl">Complète avec le bon signe</h2>
          <div className="mt-5 flex items-center justify-center gap-4 text-4xl font-extrabold">
            <span>{step.before}</span>
            <span className="grid size-16 place-items-center rounded-2xl border-2 border-dashed border-primary text-primary">
              {picked !== null ? step.options[picked] : "?"}
            </span>
            <span>{step.after}</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {step.options.map((o, i) => (
              <Choice
                key={o}
                onClick={() => {
                  if (answered !== null) return;
                  setPicked(i);
                  onAnswer(i === step.answer);
                }}
                state={
                  answered === null
                    ? "idle"
                    : i === step.answer
                      ? "good"
                      : picked === i
                        ? "bad"
                        : "idle"
                }
              >
                <span className="block text-center text-2xl">{o}</span>
              </Choice>
            ))}
          </div>
        </Card>
      );

    case "DRAG_DROP": {
      const remaining = step.items.filter((it) => !order.includes(it));
      return (
        <Card>
          <h2 className="text-xl">{step.question}</h2>
          <div className="mt-5 flex min-h-20 flex-wrap items-center gap-3 rounded-2xl border-2 border-dashed border-input bg-secondary/40 p-3">
            {order.length === 0 && (
              <span className="text-sm font-bold text-muted-foreground">
                Touche les nombres dans le bon ordre
              </span>
            )}
            {order.map((o) => (
              <span
                key={o}
                className="rounded-xl bg-gradient-play px-4 py-2 text-lg font-extrabold text-primary-foreground"
              >
                {o}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {remaining.map((it) => (
              <button
                key={it}
                onClick={() => {
                  if (answered !== null) return;
                  const nextOrder = [...order, it];
                  setOrder(nextOrder);
                  if (nextOrder.length === step.order.length) {
                    onAnswer(nextOrder.join() === step.order.join());
                  }
                }}
                className="press rounded-xl border-2 border-input bg-card px-5 py-3 text-lg font-extrabold"
              >
                {it}
              </button>
            ))}
          </div>
        </Card>
      );
    }

    case "MATCHING":
      return (
        <Card>
          <h2 className="text-xl">{step.question}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="space-y-3">
              {step.pairs.map(([a]) => (
                <button
                  key={a}
                  onClick={() => answered === null && setLeft(a)}
                  className={cn(
                    "press w-full rounded-2xl border-2 px-3 py-3 text-lg font-extrabold",
                    matched.includes(a)
                      ? "border-success bg-success/20"
                      : left === a
                        ? "border-primary bg-primary/10"
                        : "border-input bg-card",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {step.pairs.map(([, b], i) => {
                const key = step.pairs[i]?.[0] ?? "";
                return (
                  <button
                    key={b}
                    onClick={() => {
                      if (answered !== null || !left) return;
                      if (left === key) {
                        const nextMatched = [...matched, key];
                        setMatched(nextMatched);
                        setLeft(null);
                        if (nextMatched.length === step.pairs.length) onAnswer(true);
                      } else {
                        onAnswer(false);
                        setLeft(null);
                      }
                    }}
                    className={cn(
                      "press w-full rounded-2xl border-2 px-3 py-3 text-sm font-extrabold",
                      matched.includes(key) ? "border-success bg-success/20" : "border-input bg-card",
                    )}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      );

    case "CALCULATION":
      return (
        <Card>
          <h2 className="text-xl">Calcule</h2>
          <p className="mt-4 text-center text-4xl font-extrabold">{step.question}</p>
          <div className="mt-4 grid place-items-center">
            <div className="grid h-16 w-32 place-items-center rounded-2xl border-2 border-primary bg-secondary/50 text-3xl font-extrabold text-primary">
              {value || "?"}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "OK"].map((k) => (
              <button
                key={k}
                onClick={() => {
                  if (answered !== null) return;
                  if (k === "OK") return onAnswer(Number(value) === step.answer);
                  if (k === "⌫") return setValue((v) => v.slice(0, -1));
                  setValue((v) => (v.length >= 4 ? v : v + k));
                }}
                className={cn(
                  "press rounded-2xl py-4 text-xl font-extrabold",
                  k === "OK"
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {k}
              </button>
            ))}
          </div>
        </Card>
      );

    default:
      return null;
  }
}
