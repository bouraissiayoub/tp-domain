import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/layout/footer'

describe('Footer', () => {
  test('renders navigation links', () => {
    render(<Footer />)
    const navLinks = screen.getAllByText('Prestations')
    expect(navLinks.length).toBe(1)
    expect(screen.getByText('Recettes')).toBeInTheDocument()
    expect(screen.getByText('Articles')).toBeInTheDocument()
    expect(screen.getByText('Rendez-vous')).toBeInTheDocument()
    const contactLinks = screen.getAllByText('Contact')
    expect(contactLinks.length).toBe(2)
  })

  test('renders contact info', () => {
    render(<Footer />)
    expect(screen.getByText('contact@accompagnement.fr')).toBeInTheDocument()
    expect(screen.getByText('Paris, France')).toBeInTheDocument()
  })

  test('renders site description', () => {
    render(<Footer />)
    expect(screen.getByText(/retrouver une relation/)).toBeInTheDocument()
  })
})
