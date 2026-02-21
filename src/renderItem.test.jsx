/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderItem, layoutToContent, Renderer } from './renderItem.jsx'
import React from 'react'

describe('renderItem / layoutToContent / Renderer', () => {
	it('layoutToContent maps standard string to standard layout', () => {
		const result = layoutToContent('standard')
		expect(result).toEqual(['Description', 'Excerpt', 'Content', 'Accordion', 'Files'])
	})

	it('layoutToContent fallback is Content', () => {
		const result = layoutToContent('unknown')
		expect(result).toEqual(['Content'])
	})

	it('renderItem can render raw strings directly', () => {
		const { container } = render(<>{renderItem('Hello World', 0, {})}</>)
		expect(container.textContent).toContain('Hello World')
		expect(container.querySelector('p')).toBeInTheDocument()
	})

	it('renderItem can render strings with HTML entities as raw text', () => {
		const { container } = render(<>{renderItem('Hello &nbsp; World', 0, {})}</>)
		expect(container.innerHTML).toContain('Hello &nbsp; World')
	})

	it('renderItem can render standard HTML tags via JSON payload', () => {
		const payload = {
			div: [{ h1: 'Heading 1' }, { p: { $class: 'text-muted', p: 'Paragraph content' } }],
			$class: 'custom-class', // this won't be applied to div because it's a sibling, so we should nest the div.
		}
		const correctPayload = {
			$class: 'custom-class',
			div: [{ h1: 'Heading 1' }, { p: { $class: 'text-muted', p: 'Paragraph content' } }],
		}
		const { container } = render(<>{renderItem(correctPayload, 0, {})}</>)
		const div = container.querySelector('.custom-class')
		expect(div).toBeInTheDocument()
		expect(div.querySelector('h1').textContent).toBe('Heading 1')
		expect(div.querySelector('p.text-muted').textContent).toBe('Paragraph content')
	})

	it('renderItem renders standard Blocks mapping', () => {
		// Mock a Description payload
		const sharedProps = {
			page: {
				description: 'My Subtitle',
			},
		}
		// renderItem maps 'Description' to Blocks.Description
		const { container } = render(<>{renderItem('Description', 0, sharedProps)}</>)
		expect(container.querySelector('h2')).toBeInTheDocument()
		expect(container.textContent).toContain('My Subtitle')
	})

	it('Renderer mounts without errors if no page passed', () => {
		const { container } = render(<Renderer />)
		expect(container).toBeEmptyDOMElement()
	})

	it('Renderer explicitly builds page from content array', () => {
		const page = {
			title: 'Main Title',
			content: [{ p: 'First item' }, { p: 'Second item' }],
		}
		const { container } = render(<Renderer page={page} />)

		expect(container.querySelector('h1').textContent).toBe('Main Title')
		const paragraphs = container.querySelectorAll('p')
		expect(paragraphs[0].textContent).toBe('First item')
		expect(paragraphs[1].textContent).toBe('Second item')
	})
})
