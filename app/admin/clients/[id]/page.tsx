"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams } from "next/navigation";
import { getClient, getConsultationNotes, addConsultationNote, getAppointments } from "@/lib/firebase";
import type { Client, ConsultationNote, Appointment } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [notes, setNotes] = useState<ConsultationNote[]>([]);
  const [rdvs, setRdvs] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [noteRdvRef, setNoteRdvRef] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const [clientData, notesData, rdvsData] = await Promise.all([
        getClient(id),
        getConsultationNotes(id),
        getAppointments(),
      ]);
      setClient(clientData);
      setNotes(notesData);
      setRdvs(rdvsData.filter((r) => r.status === "accepted"));
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleAddNote(e: FormEvent) {
    e.preventDefault();
    if (noteContent.trim().length < 10) return;
    setSubmitting(true);

    const note = await addConsultationNote({
      clientId: id,
      content: noteContent.trim(),
      rdvRef: noteRdvRef,
    });

    setNotes((prev) => [note, ...prev]);
    setNoteContent("");
    setNoteRdvRef(null);
    setShowForm(false);
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-text-muted">Chargement...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="bg-surface rounded-xl border border-border p-12 text-center shadow-sm">
        <p className="text-text-muted">Client introuvable</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-primary-dark">
          {client.prenom} {client.nom}
        </h1>
        <p className="text-text-muted mt-1">{client.email} &middot; {client.telephone}</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-text text-lg flex items-center gap-2">
          <FileText size={20} />
          Notes de consultation
        </h2>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-1" /> Ajouter une note
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAddNote} className="bg-surface rounded-xl border border-border p-6 mb-8 shadow-sm space-y-4">
          <div>
            <label htmlFor="note-content" className="block text-sm font-medium text-text-muted mb-1.5">
              Contenu de la note <span className="text-error">*</span>
            </label>
            <textarea
              id="note-content"
              rows={5}
              required
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Rédigez vos observations, recommandations et objectifs..."
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-base text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15 resize-none"
            />
            {noteContent.length > 0 && noteContent.length < 10 && (
              <p className="text-xs text-error mt-1">Minimum 10 caractères</p>
            )}
          </div>

          {rdvs.length > 0 && (
            <div>
              <label htmlFor="note-rdv" className="block text-sm font-medium text-text-muted mb-1.5">
                Lier à un rendez-vous (optionnel)
              </label>
              <select
                id="note-rdv"
                value={noteRdvRef ?? ""}
                onChange={(e) => setNoteRdvRef(e.target.value || null)}
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
              >
                <option value="">Sans rendez-vous</option>
                {rdvs.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.jour} à {r.creneau} - {r.prenom} {r.nom}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" disabled={submitting || noteContent.trim().length < 10}>
              {submitting ? "Enregistrement..." : "Enregistrer la note"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setNoteContent(""); setNoteRdvRef(null); }}>
              Annuler
            </Button>
          </div>
        </form>
      )}

      {notes.length === 0 ? (
        <div className="bg-surface rounded-xl border border-border p-12 text-center shadow-sm">
          <FileText size={32} className="mx-auto mb-3 text-text-muted/40" />
          <p className="text-text-muted">Aucune note de consultation</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-surface rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-text-muted">
                  {new Date(note.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {note.rdvRef && (
                  <span className="text-xs text-primary font-medium">
                    Lié au rendez-vous #{note.rdvRef}
                  </span>
                )}
              </div>
              <p className="text-text leading-relaxed whitespace-pre-wrap">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
