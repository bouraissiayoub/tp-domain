import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RendezVousPage from '@/app/(public)/rendez-vous/page'

vi.mock('@/lib/firebase', () => ({
  getAcceptedSlots: vi.fn().mockResolvedValue(['Mardi 16 Juin - 10h00']),
}))

describe('RendezVousPage (public)', () => {
  test('renders the page title', () => {
    render(<RendezVousPage />)
    expect(screen.getByText('Prendre rendez-vous')).toBeInTheDocument()
  })

  test('displays available days', () => {
    render(<RendezVousPage />)
    expect(screen.getByText('Lundi 15 Juin')).toBeInTheDocument()
    expect(screen.getByText('Mardi 16 Juin')).toBeInTheDocument()
  })

  test('calls getAcceptedSlots on mount', async () => {
    render(<RendezVousPage />)
    const mod = await import('@/lib/firebase')
    await waitFor(() => {
      expect(mod.getAcceptedSlots).toHaveBeenCalled()
    })
  })

  test('allows selecting a slot', async () => {
    render(<RendezVousPage />)
    const nineOclockButtons = await screen.findAllByText('9h00')
    fireEvent.click(nineOclockButtons[0])
    expect(screen.getByText(/Demander un rendez-vous/)).toBeInTheDocument()
  })

  test('submit button is disabled when no slot selected', () => {
    render(<RendezVousPage />)
    const submitBtn = screen.getByRole('button', { name: /Sélectionnez un créneau/ })
    expect(submitBtn).toBeDisabled()
  })

  test('submits form successfully', async () => {
    const user = userEvent.setup()
    render(<RendezVousPage />)

    const nineOclockButtons = await screen.findAllByText('9h00')
    fireEvent.click(nineOclockButtons[0])

    await user.type(screen.getByLabelText('Prénom'), 'Jean')
    await user.type(screen.getByLabelText('Nom'), 'Dupont')
    await user.type(screen.getByLabelText('Email'), 'jean@email.com')
    await user.type(screen.getByLabelText('Téléphone'), '0612345678')

    fireEvent.click(screen.getByRole('button', { name: /Demander un rendez-vous/ }))

    expect(screen.getByText('Demande envoyée ✓')).toBeInTheDocument()
  })

  test('requires all required fields', () => {
    render(<RendezVousPage />)
    expect(screen.getByLabelText('Prénom')).toBeRequired()
    expect(screen.getByLabelText('Nom')).toBeRequired()
    expect(screen.getByLabelText('Email')).toBeRequired()
    expect(screen.getByLabelText('Téléphone')).toBeRequired()
  })
})
