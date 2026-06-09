"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/prestations", label: "Prestations" },
  { href: "/recettes", label: "Recettes" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface shadow-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 h-16">
        <Link href="/" className="font-serif text-xl font-bold text-primary-dark">
          Accompagnement
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/rendez-vous">
            <Button size="sm">Prendre rendez-vous</Button>
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-text"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/rendez-vous" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="w-full">
                Prendre rendez-vous
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
