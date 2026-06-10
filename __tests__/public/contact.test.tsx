import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactPage from '@/app/(public)/contact/page'

describe('ContactPage', () => {
  test('renders the page title', () => {
    render(<ContactPage />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  test('renders contact information', () => {
    render(<ContactPage />)
    expect(screen.getByText(/12 Rue de la Nutrition/)).toBeInTheDocument()
    expect(screen.getByText('06 12 34 56 78')).toBeInTheDocument()
    expect(screen.getByText('contact@accompagnement.fr')).toBeInTheDocument()
  })

  test('submits form successfully', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    await user.type(screen.getByLabelText('Prénom'), 'Jean')
    await user.type(screen.getByLabelText('Nom'), 'Dupont')
    await user.type(screen.getByLabelText('Email'), 'jean@email.com')
    await user.type(screen.getByLabelText('Message'), "Bonjour, j'ai une question.")

    fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }))

    expect(screen.getByText('Message envoyé ✓')).toBeInTheDocument()
  })

  test('requires all required fields', () => {
    render(<ContactPage />)
    expect(screen.getByLabelText('Prénom')).toBeRequired()
    expect(screen.getByLabelText('Nom')).toBeRequired()
    expect(screen.getByLabelText('Email')).toBeRequired()
    expect(screen.getByLabelText('Message')).toBeRequired()
  })
})
