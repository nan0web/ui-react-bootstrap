import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Playground from './Playground.jsx'
import { UIProvider, BootstrapTheme } from '../src/index.jsx'

test('renders Playground with components', () => {
	render(
		<UIProvider context={{ theme: BootstrapTheme }}>
			<Playground />
		</UIProvider>
	)
	expect(screen.getByText('Playground')).toBeInTheDocument()
	expect(screen.getByText('Heading 1')).toBeInTheDocument()
	expect(screen.getByText('Primary')).toBeInTheDocument()
	expect(screen.getByPlaceholderText('Text input')).toBeInTheDocument()
	expect(screen.getByText('Card Title')).toBeInTheDocument()
	expect(screen.getByText('Open Modal')).toBeInTheDocument()
})