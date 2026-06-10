import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/layout/header'

describe('Header', () => {
  test('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Prestations')).toBeInTheDocument()
    expect(screen.getByText('Recettes')).toBeInTheDocument()
    expect(screen.getByText('Articles')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  test('renders CTA button', () => {
    render(<Header />)
    expect(screen.getByText('Prendre rendez-vous')).toBeInTheDocument()
  })

  test('renders site name', () => {
    render(<Header />)
    expect(screen.getByText('Accompagnement')).toBeInTheDocument()
  })
})
