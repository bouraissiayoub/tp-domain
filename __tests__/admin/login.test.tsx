import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminLoginPage from '@/app/admin/login/page'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/admin/login',
}))

vi.mock('@/lib/firebase', () => ({
  signIn: vi.fn(),
  getCurrentUser: vi.fn().mockReturnValue(null),
  onAuthChange: vi.fn((cb) => { cb(null); return () => {} }),
}))

describe('AdminLoginPage', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  test('renders login form', () => {
    render(<AdminLoginPage />)
    expect(screen.getByText('Back-office')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument()
  })

  test('shows error on failed login', async () => {
    const { signIn } = await import('@/lib/firebase')
    vi.mocked(signIn).mockRejectedValueOnce(new Error('Email ou mot de passe incorrect'))

    const user = userEvent.setup()
    render(<AdminLoginPage />)

    await user.type(screen.getByLabelText('Email'), 'wrong@email.com')
    await user.type(screen.getByLabelText('Mot de passe'), 'wrong')
    fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }))

    expect(await screen.findByText('Email ou mot de passe incorrect')).toBeInTheDocument()
  })

  test('navigates to admin on successful login', async () => {
    const { signIn } = await import('@/lib/firebase')
    vi.mocked(signIn).mockResolvedValueOnce({ uid: 'admin-001', email: 'admin@test.com', displayName: 'Admin' })

    const user = userEvent.setup()
    render(<AdminLoginPage />)

    await user.type(screen.getByLabelText('Email'), 'admin@accompagnement.fr')
    await user.type(screen.getByLabelText('Mot de passe'), 'admin123')
    fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }))

    await vi.waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin')
    })
  })
})
