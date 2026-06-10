type AppointmentStatus = 'pending' | 'accepted' | 'rejected'

export type Appointment = {
  id: string
  prenom: string
  nom: string
  email: string
  telephone: string
  message: string
  jour: string
  creneau: string
  status: AppointmentStatus
  createdAt: string
}

export type Client = {
  id: string
  prenom: string
  nom: string
  email: string
  telephone: string
  createdAt: string
}

export type ConsultationNote = {
  id: string
  clientId: string
  content: string
  rdvRef: string | null
  createdAt: string
  updatedAt: string
}

const appointments: Appointment[] = [
  {
    id: 'rdv-001',
    prenom: 'Sophie',
    nom: 'Martin',
    email: 'sophie.martin@email.com',
    telephone: '0612345678',
    message: 'Souhaitе un premier bilan nutritionnel',
    jour: 'Lundi 15 Juin',
    creneau: '14h00',
    status: 'pending',
    createdAt: '2026-06-08T09:00:00Z',
  },
  {
    id: 'rdv-002',
    prenom: 'Lucas',
    nom: 'Bernard',
    email: 'lucas.b@email.com',
    telephone: '0698765432',
    message: '',
    jour: 'Mardi 16 Juin',
    creneau: '10h00',
    status: 'accepted',
    createdAt: '2026-06-07T14:00:00Z',
  },
]

const clients: Client[] = [
  { id: 'client-001', prenom: 'Sophie', nom: 'Martin', email: 'sophie.martin@email.com', telephone: '0612345678', createdAt: '2026-06-08T09:00:00Z' },
  { id: 'client-002', prenom: 'Lucas', nom: 'Bernard', email: 'lucas.b@email.com', telephone: '0698765432', createdAt: '2026-06-07T14:00:00Z' },
  { id: 'client-003', prenom: 'Emma', nom: 'Petit', email: 'emma.p@email.com', telephone: '0655551234', createdAt: '2026-05-20T10:00:00Z' },
]

const notes: ConsultationNote[] = [
  {
    id: 'note-001',
    clientId: 'client-001',
    content: 'Premiеre consultation : objectifs fixés, réduire le sucre et augmenter les fibres. Prochain RDV dans 15 jours.',
    rdvRef: 'rdv-001',
    createdAt: '2026-06-08T10:00:00Z',
    updatedAt: '2026-06-08T10:00:00Z',
  },
  {
    id: 'note-002',
    clientId: 'client-002',
    content: 'Bonne évolution, poids stable, patient motivé. Continuer sur cette lancée.',
    rdvRef: null,
    createdAt: '2026-06-07T15:00:00Z',
    updatedAt: '2026-06-07T15:00:00Z',
  },
]

export async function getAppointments(): Promise<Appointment[]> {
  await new Promise((r) => setTimeout(r, 200))
  return [...appointments]
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<void> {
  await new Promise((r) => setTimeout(r, 200))
  const idx = appointments.findIndex((a) => a.id === id)
  if (idx === -1) throw new Error('Rendez-vous introuvable')
  appointments[idx] = { ...appointments[idx], status }
}

export async function getClients(): Promise<Client[]> {
  await new Promise((r) => setTimeout(r, 200))
  return [...clients]
}

export async function getClient(id: string): Promise<Client | null> {
  await new Promise((r) => setTimeout(r, 100))
  return clients.find((c) => c.id === id) ?? null
}

export async function getConsultationNotes(clientId: string): Promise<ConsultationNote[]> {
  await new Promise((r) => setTimeout(r, 200))
  return notes.filter((n) => n.clientId === clientId)
}

export async function addConsultationNote(data: Omit<ConsultationNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<ConsultationNote> {
  await new Promise((r) => setTimeout(r, 200))
  const note: ConsultationNote = {
    ...data,
    id: `note-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  notes.push(note)
  return note
}

export async function getAcceptedSlots(): Promise<string[]> {
  await new Promise((r) => setTimeout(r, 100))
  return appointments
    .filter((a) => a.status === 'accepted')
    .map((a) => `${a.jour} - ${a.creneau}`)
}
