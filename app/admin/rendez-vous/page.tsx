"use client";

import { useEffect, useState } from "react";
import { getAppointments, updateAppointmentStatus } from "@/lib/firebase";
import type { Appointment } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function AdminRendezVousPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");

  useEffect(() => {
    let ignore = false;
    getAppointments().then((data) => {
      if (!ignore) {
        setAppointments(data);
        setLoading(false);
      }
    });
    return () => { ignore = true; };
  }, []);

  async function handleStatus(id: string, status: "accepted" | "rejected") {
    await updateAppointmentStatus(id, status);
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-primary-dark mb-8">Gestion des rendez-vous</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "pending", "accepted", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
              filter === f
                ? "bg-primary text-white border-primary shadow-sm"
                : "border-border text-text-muted hover:border-primary hover:text-primary bg-surface"
            }`}
          >
            {f === "all" ? "Tous" : f === "pending" ? "En attente" : f === "accepted" ? "Acceptés" : "Refusés"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-text-muted text-center py-12">Chargement...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-surface rounded-xl border border-border p-12 text-center shadow-sm">
          <p className="text-text-muted">Aucun rendez-vous trouvé</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((rdv) => (
            <div key={rdv.id} className="bg-surface rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-text text-lg">{rdv.prenom} {rdv.nom}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      rdv.status === "pending"
                        ? "bg-pending/10 text-pending"
                        : rdv.status === "accepted"
                        ? "bg-success/10 text-success"
                        : "bg-error/10 text-error"
                    }`}>
                      {rdv.status === "pending" ? "En attente" : rdv.status === "accepted" ? "Accepté" : "Refusé"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-text-muted mb-2">
                    <span>{rdv.jour} à {rdv.creneau}</span>
                    <span>{rdv.email}</span>
                    <span>{rdv.telephone}</span>
                  </div>
                  {rdv.message && (
                    <p className="text-sm text-text-muted bg-bg rounded-lg px-4 py-3 mt-2">
                      &ldquo;{rdv.message}&rdquo;
                    </p>
                  )}
                </div>
                {rdv.status === "pending" && (
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="bg-success hover:bg-success/90"
                      onClick={() => handleStatus(rdv.id, "accepted")}
                    >
                      <Check size={16} className="mr-1" /> Accepter
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="border-error text-error hover:bg-error/10"
                      onClick={() => handleStatus(rdv.id, "rejected")}
                    >
                      <X size={16} className="mr-1" /> Refuser
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
