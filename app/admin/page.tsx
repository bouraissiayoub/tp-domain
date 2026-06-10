"use client";

import { useEffect, useState } from "react";
import { getAppointments, getClients } from "@/lib/firebase";
import type { Appointment, Client } from "@/lib/firebase";
import { Users, Clock, CheckCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [rdvs, cls] = await Promise.all([getAppointments(), getClients()]);
      setAppointments(rdvs);
      setClients(cls);
      setLoading(false);
    }
    load();
  }, []);

  const pendingRdvs = appointments.filter((a) => a.status === "pending");
  const todayRdvs = appointments.filter((a) => a.status === "accepted");

  const stats = [
    { label: "Rendez-vous en attente", value: pendingRdvs.length, icon: Clock, color: "text-warning bg-warning/10" },
    { label: "Rendez-vous confirmés", value: todayRdvs.length, icon: CheckCircle, color: "text-success bg-success/10" },
    { label: "Clients actifs", value: clients.length, icon: Users, color: "text-primary bg-primary/10" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-text-muted">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-primary-dark mb-8">Tableau de bord</h1>

      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-surface rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{stat.value}</p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-text">Derniers rendez-vous</h2>
        </div>
        <div className="divide-y divide-border">
          {appointments.length === 0 ? (
            <p className="px-6 py-8 text-center text-text-muted text-sm">Aucun rendez-vous pour le moment</p>
          ) : (
            appointments.slice(0, 5).map((rdv) => (
              <div key={rdv.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-text">{rdv.prenom} {rdv.nom}</p>
                  <p className="text-sm text-text-muted">{rdv.jour} à {rdv.creneau}</p>
                </div>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
