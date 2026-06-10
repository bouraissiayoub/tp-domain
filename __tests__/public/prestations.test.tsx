import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PrestationsPage from '@/app/(public)/prestations/page'

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}))

describe('PrestationsPage', () => {
  test('renders the page title', () => {
    render(<PrestationsPage />)
    expect(screen.getByText('Mes prestations')).toBeInTheDocument()
  })

  test('renders all services', () => {
    render(<PrestationsPage />)
    expect(screen.getByText('Bilan nutritionnel complet')).toBeInTheDocument()
    expect(screen.getByText('Suivi personnalisé')).toBeInTheDocument()
    expect(screen.getByText('Rééquilibrage alimentaire')).toBeInTheDocument()
    expect(screen.getByText('Ateliers cuisine')).toBeInTheDocument()
    expect(screen.getByText('Accompagnement familial')).toBeInTheDocument()
    expect(screen.getByText('Suivi en ligne')).toBeInTheDocument()
  })

  test('renders prices', () => {
    render(<PrestationsPage />)
    expect(screen.getByText('80€')).toBeInTheDocument()
    expect(screen.getByText('50€')).toBeInTheDocument()
    expect(screen.getByText('65€')).toBeInTheDocument()
  })

  test('renders CTA section', () => {
    render(<PrestationsPage />)
    expect(screen.getByText('Vous ne trouvez pas ce que vous cherchez ?')).toBeInTheDocument()
    expect(screen.getByText('Me contacter')).toBeInTheDocument()
  })
})
