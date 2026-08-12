import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/app/MobileShell";

export const Route = createFileRoute("/otp")({
  head: () => ({
    meta: [
      { title: "Vérification du code — Kaléo" },
      {
        name: "description",
        content: "Saisissez le code à 4 chiffres reçu par SMS pour valider votre compte parent Kaléo.",
      },
      { property: "og:title", content: "Vérification du code — Kaléo" },
      { property: "og:description", content: "Validez votre numéro en quelques secondes." },
    ],
  }),
  component: Otp,
});

function Otp() {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(42);

  useEffect(() => {
    if (seconds === 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const digits = [0, 1, 2, 3];

  return (
    <MobileShell className="flex flex-col">
      <ScreenHeader title="Vérification" subtitle="Étape 2 sur 3" />

      <div className="flex-1">
        <div className="grid place-items-center py-4">
          <div className="animate-float grid size-24 place-items-center rounded-3xl bg-sun text-5xl shadow-toy">
            ✉️
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl">Entre le code reçu</h2>
        <p className="mt-1 text-center text-sm font-semibold text-muted-foreground">
          Envoyé au +237 6 •• •• •• 42
        </p>

        <div className="mt-8 flex justify-center gap-3">
          {digits.map((i) => (
            <div
              key={i}
              className={
                "grid size-16 place-items-center rounded-2xl border-2 text-3xl font-extrabold " +
                (code.length === i
                  ? "border-primary bg-card text-primary"
                  : "border-input bg-secondary")
              }
            >
              {code[i] ?? ""}
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((k, i) =>
            k === "" ? (
              <span key={i} />
            ) : (
              <button
                key={i}
                onClick={() =>
                  setCode((c) => (k === "⌫" ? c.slice(0, -1) : c.length >= 4 ? c : c + k))
                }
                className="press rounded-2xl bg-secondary py-4 text-2xl font-extrabold text-secondary-foreground shadow-soft"
              >
                {k}
              </button>
            ),
          )}
        </div>

        <button
          disabled={seconds > 0}
          onClick={() => setSeconds(42)}
          className="mx-auto mt-6 block text-sm font-bold text-primary disabled:text-muted-foreground"
        >
          {seconds > 0 ? `Renvoyer le code dans ${seconds}s` : "Renvoyer le code"}
        </button>
      </div>

      <Link
        to="/enfant/nouveau"
        className="press mt-6 block rounded-3xl bg-primary px-6 py-4 text-center text-lg font-extrabold text-primary-foreground shadow-pop"
      >
        Valider
      </Link>
    </MobileShell>
  );
}
