import { Link, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, Trophy, Gift, User, LayoutDashboard, Users, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { to: string; label: string; icon: typeof Home };

const childItems: Item[] = [
  { to: "/accueil", label: "Accueil", icon: Home },
  { to: "/matieres", label: "Apprendre", icon: BookOpen },
  { to: "/classement", label: "Classement", icon: Trophy },
  { to: "/recompenses", label: "Récompenses", icon: Gift },
  { to: "/profil", label: "Profil", icon: User },
];

const parentItems: Item[] = [
  { to: "/parent", label: "Tableau", icon: LayoutDashboard },
  { to: "/parent/enfants", label: "Enfants", icon: Users },
  { to: "/parent/abonnement", label: "Abonnement", icon: CreditCard },
  { to: "/parent/parametres", label: "Profil", icon: User },
];

export function BottomNav({ variant = "child" }: { variant?: "child" | "parent" }) {
  const { pathname } = useLocation();
  const items = variant === "child" ? childItems : parentItems;

  return (
    <nav className="sticky bottom-0 z-20 mx-auto w-full max-w-md border-t border-border bg-card/95 px-2 pt-2 pb-3 backdrop-blur">
      <ul className="flex items-stretch justify-between">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/parent" && pathname.startsWith(to));
          return (
            <li key={to} className="min-w-0 flex-1">
              <Link
                to={to}
                className={cn(
                  "press flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[11px] font-bold",
                  active ? "bg-secondary text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className={cn("size-5 shrink-0", active && "text-primary")} />
                <span className="w-full truncate text-center">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
