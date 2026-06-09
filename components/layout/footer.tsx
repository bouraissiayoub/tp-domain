import Link from "next/link";

const footerLinks = [
  { href: "/prestations", label: "Prestations" },
  { href: "/recettes", label: "Recettes" },
  { href: "/articles", label: "Articles" },
  { href: "/rendez-vous", label: "Rendez-vous" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">
              Accompagnement Alimentaire
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Un accompagnement personnalisé pour retrouver une relation
              équilibrée et sereine avec l&apos;alimentation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>contact@accompagnement.fr</li>
              <li>06 12 34 56 78</li>
              <li>Paris, France</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} Accompagnement Alimentaire. Tous
          droits réservés.
        </div>
      </div>
    </footer>
  );
}
