import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Page } from './Page.jsx'

describe('Page component', () => {
	it('should render header, sidebar, footer and content', () => {
		const { getByText } = render(
			<Page
				header={<div>Header Content</div>}
				sidebar={<div>Sidebar Content</div>}
				footer={<div>Footer Content</div>}
			>
				<div>Main Children</div>
			</Page>,
		)

		expect(getByText('Header Content')).toBeInTheDocument()
		expect(getByText('Sidebar Content')).toBeInTheDocument()
		expect(getByText('Footer Content')).toBeInTheDocument()
		expect(getByText('Main Children')).toBeInTheDocument()
	})

	it('should render without sidebar and be full width', () => {
		const { getByText, container } = render(
			<Page>
				<div>Full width content</div>
			</Page>,
		)

		expect(getByText('Full width content')).toBeInTheDocument()
		// Sidebar column should not be rendered
		const sidebar = container.querySelector('.border-end.bg-light')
		expect(sidebar).not.toBeInTheDocument()
	})
})
