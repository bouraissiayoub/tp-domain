import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AdminRendezVousPage from '@/app/admin/rendez-vous/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/admin/rendez-vous',
}))

vi.mock('@/lib/firebase', () => {
  const appointments = [
    { id: 'rdv-001', prenom: 'Sophie', nom: 'Martin', email: 'sophie@email.com', telephone: '0612345678', message: 'Premier bilan', jour: 'Lundi 15 Juin', creneau: '14h00', status: 'pending', createdAt: '2026-06-08T09:00:00Z' },
    { id: 'rdv-002', prenom: 'Lucas', nom: 'Bernard', email: 'lucas@email.com', telephone: '0698765432', message: '', jour: 'Mardi 16 Juin', creneau: '10h00', status: 'accepted', createdAt: '2026-06-07T14:00:00Z' },
    { id: 'rdv-003', prenom: 'Emma', nom: 'Petit', email: 'emma@email.com', telephone: '0655551234', message: '', jour: 'Mercredi 17 Juin', creneau: '9h00', status: 'rejected', createdAt: '2026-06-06T10:00:00Z' },
  ]
  return {
    getCurrentUser: vi.fn().mockReturnValue({ uid: 'admin-001', email: 'admin@test.com', displayName: 'Admin' }),
    onAuthChange: vi.fn((cb: (user: unknown) => void) => { cb({ uid: 'admin-001', email: 'admin@test.com', displayName: 'Admin' }); return () => {} }),
    signOut: vi.fn(),
    getAppointments: vi.fn().mockResolvedValue(appointments),
    updateAppointmentStatus: vi.fn().mockResolvedValue(undefined),
  }
})

describe('AdminRendezVousPage', () => {
  test('renders page title', async () => {
    render(<AdminRendezVousPage />)
    expect(await screen.findByText('Gestion des rendez-vous')).toBeInTheDocument()
  })

  test('displays all appointments', async () => {
    render(<AdminRendezVousPage />)
    expect(await screen.findByText('Sophie Martin')).toBeInTheDocument()
    expect(await screen.findByText('Lucas Bernard')).toBeInTheDocument()
    expect(await screen.findByText('Emma Petit')).toBeInTheDocument()
  })

  test('filters by status', async () => {
    render(<AdminRendezVousPage />)
    fireEvent.click(screen.getByText('Acceptés'))
    expect(await screen.findByText('Lucas Bernard')).toBeInTheDocument()
    expect(screen.queryByText('Sophie Martin')).not.toBeInTheDocument()
  })

  test('shows accept/reject buttons for pending appointments', async () => {
    render(<AdminRendezVousPage />)
    expect(await screen.findByText('Accepter')).toBeInTheDocument()
    expect(screen.getByText('Refuser')).toBeInTheDocument()
  })

  test('does not show action buttons for non-pending appointments', async () => {
    render(<AdminRendezVousPage />)
    fireEvent.click(screen.getByText('Acceptés'))
    expect(await screen.findByText('Lucas Bernard')).toBeInTheDocument()
    expect(screen.queryByText('Accepter')).not.toBeInTheDocument()
  })

  test('displays appointment messages', async () => {
    render(<AdminRendezVousPage />)
    expect(await screen.findByText(/Premier bilan/)).toBeInTheDocument()
  })
})
