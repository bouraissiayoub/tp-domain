"use client";

import { Button } from "@/components/ui/button";
import { useState, FormEvent, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getAcceptedSlots } from "@/lib/firebase";

const creneauxBase = [
  { day: "Lundi 15 Juin", slots: ["9h00", "10h00", "11h00", "14h00", "15h00", "16h00"] },
  { day: "Mardi 16 Juin", slots: ["9h00", "10h00", "11h00", "14h00", "15h00", "16h00"] },
  { day: "Mercredi 17 Juin", slots: ["9h00", "10h00", "11h00"] },
  { day: "Jeudi 18 Juin", slots: ["14h00", "15h00", "16h00", "17h00"] },
  { day: "Vendredi 19 Juin", slots: ["9h00", "10h00", "11h00", "14h00", "15h00"] },
];

type FormData = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  message: string;
};

export default function RendezVousPage() {
  const [selected, setSelected] = useState<{ day: string; slot: string } | null>(null);
  const [form, setForm] = useState<FormData>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [acceptedSlots, setAcceptedSlots] = useState<string[]>([]);

  useEffect(() => {
    getAcceptedSlots().then(setAcceptedSlots);
  }, []);

  const creneaux = creneauxBase.map((jour) => ({
    ...jour,
    slots: jour.slots.filter(
      (slot) => !acceptedSlots.includes(`${jour.day} - ${slot}`)
    ),
  }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    console.log("Rendez-vous demandé:", { ...form, creneau: selected });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <section className="bg-gradient-to-br from-primary/20 to-primary-dark/30 py-24">
          <div className="mx-auto max-w-[1200px] px-6 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark">
              Demande envoyée ✓
            </h1>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 mb-6" />
            <p className="text-text-muted max-w-xl mx-auto">
              Votre demande de rendez-vous a bien été reçue. Je vous
              confirmerai le créneau par email dans les plus brefs délais.
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
            Prendre rendez-vous
          </h1>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 mb-6" />
          <p className="text-text-muted max-w-xl mx-auto">
            Sélectionnez un créneau disponible et remplissez le formulaire
            pour soumettre votre demande.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid lg:grid-cols-5 gap-6 mb-12">
            {creneaux.map((jour) => (
              <div key={jour.day}>
                <h3 className="font-semibold text-sm text-primary-dark mb-3 text-center">
                  {jour.day}
                </h3>
                <div className="flex flex-col gap-2">
                  {jour.slots.map((slot) => {
                    const isActive = selected?.day === jour.day && selected?.slot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelected({ day: jour.day, slot })}
                        className={cn(
                          "px-3 py-2 text-sm font-medium rounded-lg border transition-all",
                          isActive
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "border-text-muted text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 bg-white"
                        )}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-lg mx-auto">
            <h2 className="font-serif text-2xl font-bold text-primary-dark text-center mb-8">
              Vos informations
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="rdv-prenom" className="block text-sm font-medium text-text-muted mb-1">
                    Prénom
                  </label>
                  <input
                    id="rdv-prenom"
                    type="text"
                    required
                    value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                  />
                </div>
                <div>
                  <label htmlFor="rdv-nom" className="block text-sm font-medium text-text-muted mb-1">
                    Nom
                  </label>
                  <input
                    id="rdv-nom"
                    type="text"
                    required
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="rdv-email" className="block text-sm font-medium text-text-muted mb-1">
                  Email
                </label>
                <input
                  id="rdv-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                />
              </div>
              <div>
                <label htmlFor="rdv-telephone" className="block text-sm font-medium text-text-muted mb-1">
                  Téléphone
                </label>
                <input
                  id="rdv-telephone"
                  type="tel"
                  required
                  value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                />
              </div>
              <div>
                <label htmlFor="rdv-message" className="block text-sm font-medium text-text-muted mb-1">
                  Message (optionnel)
                </label>
                <textarea
                  id="rdv-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15 resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!selected}
              >
                {selected
                  ? `Demander un rendez-vous (${selected.day} - ${selected.slot})`
                  : "Sélectionnez un créneau"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
