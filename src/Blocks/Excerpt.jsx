import React from 'react'
import { renderItem } from '../renderItem.jsx'

/**
 * Excerpt — renders page.page.excerpt (array of nano items) or page.excerpt.
 * Equivalent to the excerpt block in product.ejs.
 * @param {Object} props
 * @param {Object} props.page
 * @param {Function} [props.onNavigate]
 * @param {string} [props.locale]
 * @param {Object} [props.db]
 * @param {Object} [props.globals]
 * @param {Object} [props.duty]
 */
export function Excerpt({ page, onNavigate, locale, db, globals, duty }) {
	const excerpt = page?.page?.excerpt || page?.excerpt
	if (!excerpt || !Array.isArray(excerpt)) return null
	const sharedProps = { locale, page, globals, db, onNavigate, duty }
	return (
		<article className="excerpt container container-max py-3">
			{excerpt.map((item, i) => renderItem(item, `excerpt-${i}`, sharedProps))}
		</article>
	)
}
