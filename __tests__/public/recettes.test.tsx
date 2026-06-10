import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RecettesPage from '@/app/(public)/recettes/page'

describe('RecettesPage', () => {
  test('renders the page title', () => {
    render(<RecettesPage />)
    expect(screen.getByText('Recettes')).toBeInTheDocument()
  })

  test('renders all category filter buttons', () => {
    render(<RecettesPage />)
    expect(screen.getByRole('button', { name: 'Toutes' })).toBeInTheDocument()
    const petitDejButtons = screen.getAllByText('Petit-déjeuner')
    const dejButtons = screen.getAllByText('Déjeuner')
    const dinerButtons = screen.getAllByText('Dîner')
    const snackButtons = screen.getAllByText('Snack')
    expect(petitDejButtons.length).toBeGreaterThanOrEqual(1)
    expect(dejButtons.length).toBeGreaterThanOrEqual(1)
    expect(dinerButtons.length).toBeGreaterThanOrEqual(1)
    expect(snackButtons.length).toBeGreaterThanOrEqual(1)
  })

  test('shows all recettes by default', () => {
    render(<RecettesPage />)
    expect(screen.getByText('Bowl de quinoa aux légumes rôtis')).toBeInTheDocument()
  })

  test('filters by category', () => {
    render(<RecettesPage />)
    const snackButtons = screen.getAllByText('Snack')
    fireEvent.click(snackButtons[0])
    expect(screen.getByText('Energy balls cacao & amandes')).toBeInTheDocument()
  })

  test('highlights active category', () => {
    render(<RecettesPage />)
    const activeBtn = screen.getByRole('button', { name: 'Toutes' })
    expect(activeBtn.className).toContain('bg-primary')
  })
})
