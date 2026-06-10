import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ArticlesPage from '@/app/(public)/articles/page'

describe('ArticlesPage', () => {
  test('renders the page title', () => {
    render(<ArticlesPage />)
    expect(screen.getByText('Articles')).toBeInTheDocument()
  })

  test('renders all category filter buttons', () => {
    render(<ArticlesPage />)
    expect(screen.getByRole('button', { name: 'Tous' })).toBeInTheDocument()
    const conseilsButtons = screen.getAllByText('Conseils')
    const nutritionButtons = screen.getAllByText('Nutrition')
    expect(conseilsButtons.length).toBeGreaterThanOrEqual(1)
    expect(nutritionButtons.length).toBeGreaterThanOrEqual(1)
  })

  test('shows all articles by default', () => {
    render(<ArticlesPage />)
    expect(screen.getByText('Les bienfaits d\'une alimentation anti-inflammatoire')).toBeInTheDocument()
  })

  test('filters by category', () => {
    render(<ArticlesPage />)
    const conseilsButtons = screen.getAllByText('Conseils')
    fireEvent.click(conseilsButtons[0])
    expect(screen.getByText('Comment lire les étiquettes alimentaires ?')).toBeInTheDocument()
  })
})
