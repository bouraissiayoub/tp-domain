"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["Tous", "Conseils", "Nutrition", "Bien-être", "Actualités"];

const articles = [
  { title: "Les bienfaits d'une alimentation anti-inflammatoire", category: "Nutrition", date: "10 Juin 2026" },
  { title: "Comment lire les étiquettes alimentaires ?", category: "Conseils", date: "1 Juin 2026" },
  { title: "5 idées reçues sur les glucides", category: "Nutrition", date: "25 Mai 2026" },
  { title: "Stress et alimentation : quel lien ?", category: "Bien-être", date: "18 Mai 2026" },
  { title: "Les protéines végétales : le guide complet", category: "Nutrition", date: "11 Mai 2026" },
  { title: "Reprendre une activité sportive : par où commencer ?", category: "Conseils", date: "4 Mai 2026" },
];

export default function ArticlesPage() {
  const [active, setActive] = useState("Tous");

  const filtered = active === "Tous"
    ? articles
    : articles.filter((a) => a.category === active);

  return (
    <>
      <section className="bg-gradient-to-br from-primary/20 to-primary-dark/30 py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-dark">
            Articles
          </h1>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 mb-6" />
          <p className="text-text-muted max-w-xl mx-auto">
            Des conseils et informations pour mieux comprendre la nutrition
            et adopter de bonnes habitudes.
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
            {filtered.map((article) => (
              <Card key={article.title} className="overflow-hidden p-0">
                <div className="h-44 bg-primary-light/20 flex items-center justify-center">
                  <span className="text-primary/30 font-serif text-lg">Image</span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-accent bg-accent-light rounded-full mb-3">
                    {article.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-primary-dark mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-text-muted">{article.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
