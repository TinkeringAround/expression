import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Dashboard from '.'

test('loads and "Dashboard"', async () => {
  render(<Dashboard />)

  expect(screen.findByText('Dashboard')).toBeTruthy()
})
