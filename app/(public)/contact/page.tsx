"use client";

import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";

type FormData = {
  prenom: string;
  nom: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    prenom: "",
    nom: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("Message envoyé:", form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <section className="bg-gradient-to-br from-primary/20 to-primary-dark/30 py-24">
          <div className="mx-auto max-w-[1200px] px-6 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark">
              Message envoyé ✓
            </h1>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 mb-6" />
            <p className="text-text-muted max-w-xl mx-auto">
              Merci pour votre message ! Je vous répondrai dans les plus
              brefs délais.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary/20 to-primary-dark/30 py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark">
            Contact
          </h1>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 mb-6" />
          <p className="text-text-muted max-w-xl mx-auto">
            Une question ? Envie d&apos;échanger ? N&apos;hésitez pas à me
            contacter.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary-dark mb-6">
                Mes coordonnées
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-1">
                    Adresse
                  </h3>
                  <p className="text-text-muted">
                    12 Rue de la Nutrition
                    <br />
                    75001 Paris
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-1">
                    Téléphone
                  </h3>
                  <p className="text-text-muted">06 12 34 56 78</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-1">
                    Email
                  </h3>
                  <p className="text-text-muted">contact@accompagnement.fr</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-1">
                    Horaires
                  </h3>
                  <p className="text-text-muted">
                    Lun - Ven : 9h00 - 19h00
                    <br />
                    Sam : 9h00 - 13h00
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary-dark mb-6">
                Envoyez-moi un message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-prenom" className="block text-sm font-medium text-text-muted mb-1">
                      Prénom
                    </label>
                    <input
                      id="contact-prenom"
                      type="text"
                      required
                      value={form.prenom}
                      onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                      className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-nom" className="block text-sm font-medium text-text-muted mb-1">
                      Nom
                    </label>
                    <input
                      id="contact-nom"
                      type="text"
                      required
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-text-muted mb-1">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-text-muted mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15 resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Envoyer
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
