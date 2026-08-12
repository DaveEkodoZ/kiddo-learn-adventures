import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock, Play, Trophy } from "lucide-react";
import { MobileShell, ProgressBar, ScreenHeader, Stars } from "@/components/app/MobileShell";
import { getSequence } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sequence/$sequenceId")({
  head: () => ({
    meta: [
      { title: "Séquence d'apprentissage — Kaléo" },
      {
        name: "description",
        content:
          "Chapitres et leçons d'une séquence Kaléo, avec les étoiles gagnées et le défi de séquence à débloquer.",
      },
      { property: "og:title", content: "Séquence d'apprentissage — Kaléo" },
      {
        property: "og:description",
        content: "Chapitres, leçons courtes et défi final : tout est visible d'un coup d'œil.",
      },
    ],
  }),
  component: SequenceScreen,
});

function SequenceScreen() {
  const { sequenceId } = Route.useParams();
  const { subject, sequence } = getSequence(sequenceId);

  return (
    <MobileShell>
      <ScreenHeader
        title={`Séquence ${sequence.index}`}
        subtitle={`${subject.name} • ${sequence.title}`}
      />

      <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="min-w-0 truncate font-extrabold">{sequence.title}</p>
          <span className="shrink-0 text-xs font-extrabold text-muted-foreground">
            {sequence.progress}%
          </span>
        </div>
        <ProgressBar value={sequence.progress} className="mt-3" />
      </div>

      <div className="mt-6 space-y-6">
        {sequence.chapters.map((ch, ci) => (
          <section key={ch.id}>
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-xl bg-accent text-xs font-extrabold text-accent-foreground">
                {ci + 1}
              </span>
              <h3 className="min-w-0 truncate text-base">{ch.title}</h3>
            </div>

            <ul className="mt-3 space-y-3">
              {ch.lessons.map((l) => {
                const locked = l.state === "locked";
                const rowClass = cn(
                  "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border p-4",
                  locked ? "border-border bg-secondary/50" : "press border-border bg-card shadow-soft",
                );
                const inner = (
                  <>
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-2xl",
                        l.state === "done"
                          ? "bg-success text-success-foreground"
                          : l.state === "current"
                            ? "bg-gradient-play text-primary-foreground"
                            : "bg-secondary text-muted-foreground",
                      )}
                    >
                      {l.state === "done" ? (
                        <Check className="size-5" />
                      ) : l.state === "current" ? (
                        <Play className="size-5" />
                      ) : (
                        <Lock className="size-4" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block truncate font-extrabold",
                          locked && "text-muted-foreground",
                        )}
                      >
                        {l.title}
                      </span>
                      <span className="block text-xs font-bold text-muted-foreground">
                        {l.minutes} min
                      </span>
                    </span>
                    <Stars count={l.stars} />
                  </>
                );
                return (
                  <li key={l.id}>
                    {locked ? (
                      <div className={rowClass}>{inner}</div>
                    ) : (
                      <Link
                        to="/lecon/$lessonId"
                        params={{ lessonId: l.id }}
                        className={rowClass}
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-[2rem] bg-gradient-sun p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-card/85 text-2xl">
            <Trophy className="size-6 text-primary" />
          </span>
          <div className="min-w-0">
            <p className="font-extrabold text-sun-foreground">Défi de séquence</p>
            <p className="text-xs font-bold text-sun-foreground/80">
              Termine toutes les leçons pour l'ouvrir
            </p>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
