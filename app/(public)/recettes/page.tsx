"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["Toutes", "Petit-déjeuner", "Déjeuner", "Dîner", "Snack"];

const recettes = [
  { title: "Bowl de quinoa aux légumes rôtis", category: "Déjeuner", date: "12 Mai 2026" },
  { title: "Smoothie bowl mangue & fruits rouges", category: "Petit-déjeuner", date: "8 Mai 2026" },
  { title: "Salade tiède de lentilles & chèvre", category: "Dîner", date: "2 Mai 2026" },
  { title: "Porridge overnight aux fruits secs", category: "Petit-déjeuner", date: "28 Avril 2026" },
  { title: "Wraps de laitue au poulet épicé", category: "Déjeuner", date: "22 Avril 2026" },
  { title: "Soupe butternut & lait de coco", category: "Dîner", date: "15 Avril 2026" },
  { title: "Energy balls cacao & amandes", category: "Snack", date: "10 Avril 2026" },
  { title: "Tartine avocat & œuf poché", category: "Petit-déjeuner", date: "5 Avril 2026" },
  { title: "Riz sauté aux légumes croquants", category: "Déjeuner", date: "30 Mars 2026" },
];

export default function RecettesPage() {
  const [active, setActive] = useState("Toutes");

  const filtered = active === "Toutes"
    ? recettes
    : recettes.filter((r) => r.category === active);

  return (
    <>
      <section className="bg-gradient-to-br from-primary/20 to-primary-dark/30 py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark">
            Recettes
          </h1>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 mb-6" />
          <p className="text-text-muted max-w-xl mx-auto">
            Des idées simples et savoureuses pour une alimentation équilibrée
            au quotidien.
          </p>
        </div>
      </section>

      <section className="py-12 bg-surface">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full border transition-all",
                  active === cat
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "border-text-muted text-text-muted hover:border-primary hover:text-primary bg-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((recette) => (
              <Card key={recette.title} className="overflow-hidden p-0">
                <div className="h-44 bg-primary-light/20 flex items-center justify-center">
                  <span className="text-primary/30 font-serif text-lg">Image</span>
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
        </div>
      </section>
    </>
  );
}
