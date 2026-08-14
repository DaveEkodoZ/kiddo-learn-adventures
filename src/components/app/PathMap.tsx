import { Link } from "@tanstack/react-router";
import { Check, Lock, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type PathNode = {
  id: string;
  label: string;
  sublabel?: string;
  state: "done" | "current" | "open" | "locked";
  emoji?: string;
  link?: { to: string; params: Record<string, string> };
};

const STEP_Y = 108;
/** Serpentine (style Zuma) : la piste zigzague de gauche à droite. */
const OFFSETS = [50, 76, 50, 24];

const xOf = (i: number) => OFFSETS[i % OFFSETS.length]!;

/**
 * Carte de parcours "Zuma" : une piste sinueuse de pierres où chaque nœud est
 * un niveau/leçon. Les nœuds verrouillés restent visibles mais éteints.
 */
export function PathMap({ nodes, className }: { nodes: PathNode[]; className?: string }) {
  const height = nodes.length * STEP_Y + 48;
  const d = nodes
    .map((_, i) => {
      const x = xOf(i);
      const y = 40 + i * STEP_Y;
      if (i === 0) return `M ${x} ${y}`;
      const px = xOf(i - 1);
      const py = 40 + (i - 1) * STEP_Y;
      const my = (py + y) / 2;
      return `C ${px} ${my} ${x} ${my} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className={cn("relative", className)} style={{ height }}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={d} fill="none" stroke="currentColor" className="text-secondary" strokeWidth="9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          className="text-muted-foreground/35"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 12"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {nodes.map((n, i) => {
        const stone = (
          <span
            className={cn(
              "grid size-16 place-items-center rounded-full border-4 text-xl font-extrabold",
              n.state === "done" && "border-card bg-success text-success-foreground shadow-toy",
              n.state === "current" && "animate-pop border-card bg-gradient-play text-primary-foreground shadow-toy",
              n.state === "open" && "border-card bg-accent text-accent-foreground shadow-soft",
              n.state === "locked" && "border-card bg-secondary text-muted-foreground",
            )}
          >
            {n.state === "locked" ? (
              <Lock className="size-5" />
            ) : n.state === "done" ? (
              <Check className="size-6" />
            ) : n.emoji ? (
              <span className="text-2xl">{n.emoji}</span>
            ) : (
              <Play className="size-5" />
            )}
          </span>
        );

        const caption = (
          <span className="mt-1 block w-28 text-center">
            <span
              className={cn(
                "block truncate text-[11px] font-extrabold",
                n.state === "locked" && "text-muted-foreground",
              )}
            >
              {n.label}
            </span>
            {n.sublabel && (
              <span className="block truncate text-[10px] font-bold text-muted-foreground">
                {n.sublabel}
              </span>
            )}
          </span>
        );

        const body = (
          <span className="flex flex-col items-center">
            {stone}
            {caption}
          </span>
        );

        return (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${xOf(i)}%`, top: 40 + i * STEP_Y }}
          >
            {n.link && n.state !== "locked" ? (
              <Link
                to={n.link.to as never}
                params={n.link.params as never}
                className="press block"
                aria-label={n.label}
              >
                {body}
              </Link>
            ) : (
              body
            )}
          </div>
        );
      })}
    </div>
  );
}
