"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl font-bold text-primary-dark">
            Back-office
          </h1>
          <p className="mt-2 text-text-muted text-sm">
            Connectez-vous pour accéder à l&apos;administration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface rounded-xl border border-border p-8 shadow-sm space-y-5">
          {error && (
            <div className="bg-error/10 text-error text-sm font-medium px-4 py-3 rounded-lg border border-error/20">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-text-muted mb-1.5">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@accompagnement.fr"
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-text-muted mb-1.5">
              Mot de passe
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}
