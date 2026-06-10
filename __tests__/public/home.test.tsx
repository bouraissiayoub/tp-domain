import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/(public)/page'

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}))

describe('HomePage', () => {
  test('renders hero title', () => {
    render(<HomePage />)
    expect(screen.getByText(/Retrouvez une relation équilibrée/)).toBeInTheDocument()
  })

  test('renders CTA buttons', () => {
    render(<HomePage />)
    expect(screen.getByText('Prendre rendez-vous')).toBeInTheDocument()
    expect(screen.getByText('Découvrir mes prestations')).toBeInTheDocument()
  })

  test('renders about section', () => {
    render(<HomePage />)
    expect(screen.getByText('À propos')).toBeInTheDocument()
  })

  test('renders prestations section', () => {
    render(<HomePage />)
    expect(screen.getByText('Mes prestations')).toBeInTheDocument()
    expect(screen.getByText('Bilan nutritionnel')).toBeInTheDocument()
    expect(screen.getByText('Accompagnement personnalisé')).toBeInTheDocument()
  })

  test('renders recipes section', () => {
    render(<HomePage />)
    expect(screen.getByText('Dernières recettes')).toBeInTheDocument()
    expect(screen.getByText('Bowl de quinoa aux légumes rôtis')).toBeInTheDocument()
  })

  test('renders CTA section', () => {
    render(<HomePage />)
    expect(screen.getByText('Prêt(e) à commencer votre chemin ?')).toBeInTheDocument()
  })
})
