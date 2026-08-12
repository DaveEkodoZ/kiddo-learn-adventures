import { Link, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/** Conteneur mobile : toute l'app est cadrée comme un téléphone. */
export function MobileShell({
  children,
  className,
  bottomNav,
}: {
  children: ReactNode;
  className?: string;
  bottomNav?: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-sky-soft">
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-background shadow-soft">
        <div className={cn("flex-1 px-5 pt-6", bottomNav ? "pb-28" : "pb-8", className)}>
          {children}
        </div>
        {bottomNav}
      </div>
    </div>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  right,
  back = true,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  back?: boolean;
}) {
  const router = useRouter();
  return (
    <header className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <div className="flex min-w-0 items-center gap-3">
        {back && (
          <button
            aria-label="Retour"
            onClick={() => router.history.back()}
            className="press grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary text-secondary-foreground"
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-xl">{title}</h1>
          {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {right}
    </header>
  );
}

export function Pill({
  children,
  tone = "sun",
}: {
  children: ReactNode;
  tone?: "sun" | "accent" | "primary" | "muted";
}) {
  const tones = {
    sun: "bg-sun text-sun-foreground",
    accent: "bg-accent text-accent-foreground",
    primary: "bg-primary text-primary-foreground",
    muted: "bg-secondary text-secondary-foreground",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-3 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div
        className="h-full rounded-full bg-gradient-play transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Stars({ count, size = "size-4" }: { count: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cn(size, i < count ? "fill-sun" : "fill-border")}
        >
          <path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7-6.3-3.5L5.7 21 7 14.2 2 9.4l7-.9z" />
        </svg>
      ))}
    </span>
  );
}

export function ToyLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "press block rounded-3xl bg-primary px-6 py-4 text-center text-lg font-extrabold text-primary-foreground shadow-pop",
        className,
      )}
    >
      {children}
    </Link>
  );
}
