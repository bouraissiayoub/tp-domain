import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ClientDetailPage from '@/app/admin/clients/[id]/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/admin/clients/client-001',
  useParams: () => ({ id: 'client-001' }),
}))

vi.mock('@/lib/firebase', () => {
  const client = { id: 'client-001', prenom: 'Sophie', nom: 'Martin', email: 'sophie@email.com', telephone: '0612345678', createdAt: '2026-06-08T09:00:00Z' }
  const notes = [
    { id: 'note-001', clientId: 'client-001', content: 'Première consultation : objectifs fixés.', rdvRef: 'rdv-001', createdAt: '2026-06-08T10:00:00Z', updatedAt: '2026-06-08T10:00:00Z' },
  ]
  const rdvs = [
    { id: 'rdv-001', prenom: 'Sophie', nom: 'Martin', email: 'sophie@email.com', telephone: '0612345678', message: '', jour: 'Lundi 15 Juin', creneau: '14h00', status: 'accepted', createdAt: '2026-06-08T09:00:00Z' },
  ]
  return {
    getCurrentUser: vi.fn().mockReturnValue({ uid: 'admin-001', email: 'admin@test.com', displayName: 'Admin' }),
    onAuthChange: vi.fn((cb: (user: unknown) => void) => { cb({ uid: 'admin-001', email: 'admin@test.com', displayName: 'Admin' }); return () => {} }),
    signOut: vi.fn(),
    getClient: vi.fn().mockResolvedValue(client),
    getConsultationNotes: vi.fn().mockResolvedValue(notes),
    getAppointments: vi.fn().mockResolvedValue(rdvs),
    addConsultationNote: vi.fn().mockResolvedValue({ id: 'note-002', clientId: 'client-001', content: 'Nouvelle note', rdvRef: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }),
  }
})

describe('ClientDetailPage', () => {
  test('renders client name', async () => {
    render(<ClientDetailPage />)
    expect(await screen.findByText('Sophie Martin')).toBeInTheDocument()
  })

  test('renders client contact info', async () => {
    render(<ClientDetailPage />)
    expect(await screen.findByText(/sophie@email.com/)).toBeInTheDocument()
  })

  test('displays consultation notes', async () => {
    render(<ClientDetailPage />)
    expect(await screen.findByText('Notes de consultation')).toBeInTheDocument()
    expect(await screen.findByText(/Première consultation/)).toBeInTheDocument()
  })

  test('shows add note button', async () => {
    render(<ClientDetailPage />)
    expect(await screen.findByText('Ajouter une note')).toBeInTheDocument()
  })

  test('can open and submit note form', async () => {
    const user = userEvent.setup()
    render(<ClientDetailPage />)

    fireEvent.click(await screen.findByText('Ajouter une note'))
    expect(screen.getByPlaceholderText(/Rédigez vos observations/)).toBeInTheDocument()

    const textarea = screen.getByPlaceholderText(/Rédigez vos observations/)
    await user.type(textarea, 'Nouvelle note de suivi pour ce client.')

    fireEvent.click(screen.getByRole('button', { name: 'Enregistrer la note' }))
  })

  test('shows validation for short notes', async () => {
    render(<ClientDetailPage />)
    fireEvent.click(await screen.findByText('Ajouter une note'))

    const textarea = screen.getByPlaceholderText(/Rédigez vos observations/)
    fireEvent.change(textarea, { target: { value: 'Court' } })

    expect(screen.getByText('Minimum 10 caractères')).toBeInTheDocument()
  })

  test('shows RDV reference on notes', async () => {
    render(<ClientDetailPage />)
    expect(await screen.findByText(/Lié au rendez-vous/)).toBeInTheDocument()
  })
})
