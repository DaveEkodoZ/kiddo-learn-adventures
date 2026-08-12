import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/app/MobileShell";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion parent — Kaléo" },
      {
        name: "description",
        content:
          "Connectez-vous à Kaléo avec votre numéro de téléphone : un code de vérification vous est envoyé par SMS.",
      },
      { property: "og:title", content: "Connexion parent — Kaléo" },
      {
        property: "og:description",
        content: "Inscription ultra courte : téléphone, code SMS, profil enfant.",
      },
    ],
  }),
  component: Login,
});

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "0", "⌫"];

function Login() {
  const [phone, setPhone] = useState("");

  const press = (k: string) => {
    if (k === "⌫") return setPhone((p) => p.slice(0, -1));
    setPhone((p) => (p.length >= 13 ? p : p + k));
  };

  return (
    <MobileShell className="flex flex-col">
      <ScreenHeader title="Espace parent" subtitle="Étape 1 sur 3" />

      <div className="flex-1">
        <div className="rounded-3xl bg-gradient-cool p-5 text-accent-foreground shadow-soft">
          <p className="text-3xl">📱</p>
          <h2 className="mt-2 text-xl">Ton numéro de téléphone</h2>
          <p className="mt-1 text-sm font-semibold opacity-80">
            Nous envoyons un code de vérification par SMS. Aucun e-mail nécessaire.
          </p>
        </div>

        <div className="mt-6 rounded-3xl border-2 border-input bg-card px-5 py-4">
          <p className="text-xs font-bold text-muted-foreground">NUMÉRO</p>
          <p className="mt-1 text-2xl font-extrabold tracking-wide">
            {phone || <span className="text-muted-foreground">+237 6 00 00 00 00</span>}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {keys.map((k) => (
            <button
              key={k}
              onClick={() => press(k)}
              className="press rounded-2xl bg-secondary py-4 text-2xl font-extrabold text-secondary-foreground shadow-soft"
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <Link
        to="/otp"
        className="press mt-6 block rounded-3xl bg-primary px-6 py-4 text-center text-lg font-extrabold text-primary-foreground shadow-pop"
      >
        Recevoir le code
      </Link>
      <p className="mt-3 text-center text-xs font-semibold text-muted-foreground">
        En continuant, vous acceptez nos conditions d'utilisation.
      </p>
    </MobileShell>
  );
}
