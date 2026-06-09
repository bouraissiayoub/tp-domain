import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Apple, Salad, Heart, Leaf } from "lucide-react";

const prestations = [
  {
    icon: Apple,
    title: "Bilan nutritionnel",
    desc: "Analyse complète de vos habitudes alimentaires et de vos besoins pour établir un plan personnalisé.",
  },
  {
    icon: Heart,
    title: "Accompagnement personnalisé",
    desc: "Un suivi régulier et bienveillant pour vous aider à atteindre vos objectifs durablement.",
  },
  {
    icon: Salad,
    title: "Rééquilibrage alimentaire",
    desc: "Apprenez à manger équilibré sans frustration, avec des conseils adaptés à votre rythme de vie.",
  },
  {
    icon: Leaf,
    title: "Ateliers cuisine",
    desc: "Des ateliers pratiques pour cuisiner sainement tout en prenant du plaisir.",
  },
];

const recettes = [
  {
    title: "Bowl de quinoa aux légumes rôtis",
    category: "Déjeuner",
    date: "12 Mai 2026",
    image: null,
  },
  {
    title: "Smoothie bowl mangue & fruits rouges",
    category: "Petit-déjeuner",
    date: "8 Mai 2026",
    image: null,
  },
  {
    title: "Salade tiède de lentilles & chèvre",
    category: "Dîner",
    date: "2 Mai 2026",
    image: null,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 to-primary-dark/30">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-dark leading-tight max-w-2xl mx-auto">
            Retrouvez une relation équilibrée avec votre alimentation
          </h1>
          <p className="mt-6 text-lg text-text-muted max-w-xl mx-auto">
            Un accompagnement bienveillant et personnalisé pour vous aider à
            atteindre vos objectifs, sans régime restrictif.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/rendez-vous">
              <Button size="lg">Prendre rendez-vous</Button>
            </Link>
            <Link href="/prestations">
              <Button variant="secondary" size="lg">
                Découvrir mes prestations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className=" aspect-square rounded-xl bg-primary-light/20 flex items-center justify-center">
              <span className="text-primary/40 font-serif text-6xl">Photo</span>
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary-dark">
                À propos
              </h2>
              <div className="w-16 h-1 bg-accent mt-4 mb-6" />
              <p className="text-text-muted leading-relaxed mb-4">
                Diététicienne-nutritionniste depuis plus de 10 ans, je vous
                accompagne dans une démarche bienveillante et sans jugement.
                Mon approche est basée sur l&apos;écoute de vos besoins et la
                recherche d&apos;un équilibre alimentaire durable.
              </p>
              <p className="text-text-muted leading-relaxed">
                Je crois qu&apos;il n&apos;y a pas de &quot;bon&quot; ou de
                &quot;mauvais&quot; aliment, seulement une relation à
                construire avec ce que nous mangeons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-primary-dark">
              Mes prestations
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4" />
            <p className="mt-4 text-text-muted max-w-lg mx-auto">
              Des services adaptés à vos besoins pour vous accompagner dans
              votre démarche.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prestations.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                    <Icon size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary-dark">
                Dernières recettes
              </h2>
              <div className="w-16 h-1 bg-accent mt-4" />
            </div>
            <Link
              href="/recettes"
              className="hidden sm:inline text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              Voir toutes les recettes →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recettes.map((recette) => (
              <Card key={recette.title} className="overflow-hidden p-0">
                <div className="h-48 bg-primary-light/20 flex items-center justify-center">
                  <span className="text-primary/30 font-serif text-lg">
                    Image
                  </span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-accent bg-accent-light rounded-full mb-3">
                    {recette.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-primary-dark mb-2">
                    {recette.title}
                  </h3>
                  <p className="text-xs text-text-muted">{recette.date}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/recettes"
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              Voir toutes les recettes →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary-dark text-white text-center">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="font-serif text-3xl font-bold">
            Prêt(e) à commencer votre chemin ?
          </h2>
          <p className="mt-4 text-white/80 max-w-lg mx-auto">
            Prenez rendez-vous dès aujourd&apos;hui pour un premier échange
            sans engagement.
          </p>
          <div className="mt-10">
            <Link href="/rendez-vous">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Demander un rendez-vous
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
