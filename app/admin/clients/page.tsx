"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClients } from "@/lib/firebase";
import type { Client } from "@/lib/firebase";
import { ChevronRight } from "lucide-react";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getClients();
      setClients(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = search
    ? clients.filter(
        (c) =>
          c.prenom.toLowerCase().includes(search.toLowerCase()) ||
          c.nom.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase())
      )
    : clients;

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-primary-dark mb-8">Clients</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-border bg-surface px-4 py-2.5 text-base text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
        />
      </div>

      {loading ? (
        <p className="text-text-muted text-center py-12">Chargement...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-surface rounded-xl border border-border p-12 text-center shadow-sm">
          <p className="text-text-muted">{search ? "Aucun client trouvé" : "Aucun client pour le moment"}</p>
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border shadow-sm divide-y divide-border">
          {filtered.map((client) => (
            <Link
              key={client.id}
              href={`/admin/clients/${client.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-bg/50 transition-colors"
            >
              <div>
                <p className="font-medium text-text">{client.prenom} {client.nom}</p>
                <p className="text-sm text-text-muted">{client.email} &middot; {client.telephone}</p>
              </div>
              <ChevronRight size={18} className="text-text-muted" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
