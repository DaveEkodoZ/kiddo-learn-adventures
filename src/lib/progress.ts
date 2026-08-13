import { useCallback, useEffect, useState } from "react";

/** Progression locale (leçons terminées) + amis ajoutés. */
export type ProgressState = { done: string[]; friends: string[] };

const KEY = "kaleo-progress-v1";
const empty: ProgressState = { done: [], friends: ["Ngo Bea", "Éric"] };

function read(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      done: Array.isArray(parsed.done) ? parsed.done : [],
      friends: Array.isArray(parsed.friends) ? parsed.friends : [],
    };
  } catch {
    return empty;
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(empty);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(read());
    setHydrated(true);
  }, []);

  const save = useCallback((next: ProgressState) => {
    setState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* stockage indisponible */
    }
  }, []);

  const completeLesson = useCallback(
    (id: string) => {
      const current = read();
      if (current.done.includes(id)) return;
      save({ ...current, done: [...current.done, id] });
    },
    [save],
  );

  const addFriend = useCallback(
    (name: string) => {
      const clean = name.trim();
      const current = read();
      if (!clean || current.friends.includes(clean)) return;
      save({ ...current, friends: [...current.friends, clean] });
    },
    [save],
  );

  const removeFriend = useCallback(
    (name: string) => {
      const current = read();
      save({ ...current, friends: current.friends.filter((f) => f !== name) });
    },
    [save],
  );

  return {
    hydrated,
    done: state.done,
    friends: state.friends,
    isDone: (id: string) => state.done.includes(id),
    completeLesson,
    addFriend,
    removeFriend,
  };
}
