import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Apple, Heart, Salad, Leaf, Users, Clock } from "lucide-react";

const services = [
  {
    icon: Apple,
    title: "Bilan nutritionnel complet",
    duration: "1h30",
    price: "80€",
    desc: "Analyse approfondie de vos habitudes alimentaires, de votre mode de vie et de vos objectifs. Remise d'un plan personnalisé.",
  },
  {
    icon: Heart,
    title: "Suivi personnalisé",
    duration: "45min",
    price: "50€",
    desc: "Séances de suivi régulières pour ajuster votre plan et maintenir votre motivation. Fréquence adaptée à vos besoins.",
  },
  {
    icon: Salad,
    title: "Rééquilibrage alimentaire",
    duration: "1h",
    price: "65€",
    desc: "Programme sur mesure pour adopter une alimentation équilibrée sans frustration. Résultats durables garantis.",
  },
  {
    icon: Leaf,
    title: "Ateliers cuisine",
    duration: "2h",
    price: "35€",
    desc: "Ateliers collectifs ou individuels pour apprendre à cuisiner sain, rapide et savoureux au quotidien.",
  },
  {
    icon: Users,
    title: "Accompagnement familial",
    duration: "1h15",
    price: "90€",
    desc: "Consultation adaptée à toute la famille. Solutions pour les repas équilibrés qui plaisent aux petits comme aux grands.",
  },
  {
    icon: Clock,
    title: "Suivi en ligne",
    duration: "30min",
    price: "40€",
    desc: "Consultation à distance par visioconférence. Idéal pour les follow-up entre deux rendez-vous en présentiel.",
  },
];

export default function PrestationsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/20 to-primary-dark/30 py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark">
            Mes prestations
          </h1>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 mb-6" />
          <p className="text-text-muted max-w-xl mx-auto">
            Des formules adaptées à chaque besoin. Toutes les consultations
            sont personnalisées.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="flex flex-col">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed flex-1 mb-4">
                    {service.desc}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm text-text-muted">
                      <span className="font-medium text-primary-dark">
                        {service.duration}
                      </span>
                    </div>
                    <span className="font-bold text-accent text-lg">
                      {service.price}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark text-white py-24 text-center">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="font-serif text-3xl font-bold">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="mt-4 text-white/70 max-w-lg mx-auto">
            Chaque accompagnement est unique. Contactez-moi pour une formule
            sur mesure.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/rendez-vous">
              <Button className="bg-white text-primary hover:bg-white/90" size="lg">
                Prendre rendez-vous
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Me contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
