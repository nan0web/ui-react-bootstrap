import React from 'react'
import { renderItem } from '../renderItem.jsx'

/**
 * PageContent — renders page.page.content (the nano2html array).
 * This is the main body content from the YAML `page.content` field.
 * Equivalent to `nano2html(page['content'], 'div')` in product.ejs.
 * @param {Object} props
 * @param {Object} props.page
 * @param {Function} [props.onNavigate]
 * @param {string} [props.locale]
 * @param {Object} [props.db]
 * @param {Object} [props.globals]
 * @param {Object} [props.duty]
 */
export function Content({ page, onNavigate, locale, db, globals, duty }) {
	const content = page?.page?.content
	if (!content || !Array.isArray(content) || content.length === 0) return null
	const sharedProps = { locale, page, globals, db, onNavigate, duty }
	return (
		<article className="container container-max py-3">
			{content.map((item, i) => renderItem(item, `pc-${i}`, sharedProps))}
		</article>
	)
}
