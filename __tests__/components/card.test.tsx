import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '@/components/ui/card'

describe('Card', () => {
  test('renders children', () => {
    render(<Card>Contenu de la carte</Card>)
    expect(screen.getByText('Contenu de la carte')).toBeInTheDocument()
  })

  test('applies className prop', () => {
    render(<Card className="custom-class">Test</Card>)
    const card = screen.getByText('Test')
    expect(card.className).toContain('custom-class')
    expect(card.className).toContain('rounded-xl')
  })
})
