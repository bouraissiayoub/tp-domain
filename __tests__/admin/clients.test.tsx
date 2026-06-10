import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AdminClientsPage from '@/app/admin/clients/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/admin/clients',
}))

vi.mock('@/lib/firebase', () => {
  const clients = [
    { id: 'client-001', prenom: 'Sophie', nom: 'Martin', email: 'sophie@email.com', telephone: '0612345678', createdAt: '2026-06-08T09:00:00Z' },
    { id: 'client-002', prenom: 'Lucas', nom: 'Bernard', email: 'lucas@email.com', telephone: '0698765432', createdAt: '2026-06-07T14:00:00Z' },
  ]
  return {
    getCurrentUser: vi.fn().mockReturnValue({ uid: 'admin-001', email: 'admin@test.com', displayName: 'Admin' }),
    onAuthChange: vi.fn((cb: (user: unknown) => void) => { cb({ uid: 'admin-001', email: 'admin@test.com', displayName: 'Admin' }); return () => {} }),
    signOut: vi.fn(),
    getClients: vi.fn().mockResolvedValue(clients),
  }
})

describe('AdminClientsPage', () => {
  test('renders page title', async () => {
    render(<AdminClientsPage />)
    expect(await screen.findByText('Clients')).toBeInTheDocument()
  })

  test('displays client list', async () => {
    render(<AdminClientsPage />)
    expect(await screen.findByText('Sophie Martin')).toBeInTheDocument()
    expect(await screen.findByText('Lucas Bernard')).toBeInTheDocument()
  })

  test('displays client emails', async () => {
    render(<AdminClientsPage />)
    expect(await screen.findByText(/sophie@email.com/)).toBeInTheDocument()
  })

  test('filters clients by search', async () => {
    render(<AdminClientsPage />)
    expect(await screen.findByText('Lucas Bernard')).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText('Rechercher un client...')
    fireEvent.change(searchInput, { target: { value: 'Lucas' } })

    expect(screen.getByText('Lucas Bernard')).toBeInTheDocument()
    expect(screen.queryByText('Sophie Martin')).not.toBeInTheDocument()
  })

  test('shows empty state when no clients match', async () => {
    render(<AdminClientsPage />)
    expect(await screen.findByText('Sophie Martin')).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText('Rechercher un client...')
    fireEvent.change(searchInput, { target: { value: 'zzz' } })

    expect(await screen.findByText('Aucun client trouvé')).toBeInTheDocument()
  })
})
