import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AdminDashboardPage from '@/app/admin/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/admin',
}))

vi.mock('@/lib/firebase', () => ({
  getCurrentUser: vi.fn().mockReturnValue({ uid: 'admin-001', email: 'admin@test.com', displayName: 'Admin' }),
  onAuthChange: vi.fn((cb: (user: unknown) => void) => { cb({ uid: 'admin-001', email: 'admin@test.com', displayName: 'Admin' }); return () => {} }),
  signOut: vi.fn(),
  getAppointments: vi.fn().mockResolvedValue([
    { id: 'rdv-001', prenom: 'Sophie', nom: 'Martin', email: 'sophie@email.com', telephone: '0612345678', message: '', jour: 'Lundi 15 Juin', creneau: '14h00', status: 'pending', createdAt: '2026-06-08T09:00:00Z' },
    { id: 'rdv-002', prenom: 'Lucas', nom: 'Bernard', email: 'lucas@email.com', telephone: '0698765432', message: '', jour: 'Mardi 16 Juin', creneau: '10h00', status: 'accepted', createdAt: '2026-06-07T14:00:00Z' },
  ]),
  getClients: vi.fn().mockResolvedValue([
    { id: 'client-001', prenom: 'Sophie', nom: 'Martin', email: 'sophie@email.com', telephone: '0612345678', createdAt: '2026-06-08T09:00:00Z' },
  ]),
}))

describe('AdminDashboardPage', () => {
  test('renders dashboard title', async () => {
    render(<AdminDashboardPage />)
    expect(await screen.findByText('Tableau de bord')).toBeInTheDocument()
  })

  test('displays stats', async () => {
    render(<AdminDashboardPage />)
    const values = await screen.findAllByText('1')
    expect(values.length).toBe(3)
    expect(await screen.findByText('Rendez-vous en attente')).toBeInTheDocument()
    expect(await screen.findByText('Clients actifs')).toBeInTheDocument()
  })

  test('displays recent appointments', async () => {
    render(<AdminDashboardPage />)
    expect(await screen.findByText('Sophie Martin')).toBeInTheDocument()
    expect(await screen.findByText('Lucas Bernard')).toBeInTheDocument()
  })

  test('displays status badges', async () => {
    render(<AdminDashboardPage />)
    expect(await screen.findByText('En attente')).toBeInTheDocument()
    expect(await screen.findByText('Accepté')).toBeInTheDocument()
  })
})
