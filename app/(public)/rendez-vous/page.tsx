import { Button } from "@/components/ui/button";

const creneaux = [
  { day: "Lundi 15 Juin", slots: ["9h00", "10h00", "11h00", "14h00", "15h00", "16h00"] },
  { day: "Mardi 16 Juin", slots: ["9h00", "10h00", "11h00", "14h00", "15h00", "16h00"] },
  { day: "Mercredi 17 Juin", slots: ["9h00", "10h00", "11h00"] },
  { day: "Jeudi 18 Juin", slots: ["14h00", "15h00", "16h00", "17h00"] },
  { day: "Vendredi 19 Juin", slots: ["9h00", "10h00", "11h00", "14h00", "15h00"] },
];

export default function RendezVousPage() {
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
                  {jour.slots.map((slot) => (
                    <button
                      key={slot}
                      className="px-3 py-2 text-sm font-medium rounded-lg border border-border bg-surface text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-lg mx-auto">
            <h2 className="font-serif text-2xl font-bold text-primary-dark text-center mb-8">
              Vos informations
            </h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium text-text-muted mb-1">
                    Prénom
                  </label>
                  <input
                    id="prenom"
                    type="text"
                    className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                  />
                </div>
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-text-muted mb-1">
                    Nom
                  </label>
                  <input
                    id="nom"
                    type="text"
                    className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                />
              </div>
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-text-muted mb-1">
                  Téléphone
                </label>
                <input
                  id="telephone"
                  type="tel"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-1">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15 resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Demander un rendez-vous
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
