import React from 'react'

/**
 * Description — renders page.description or page.page.description as a subtitle.
 * Equivalent to /_/content/title.ejs + description block in product.ejs.
 * @param {Object} props
 * @param {Object} props.page
 */
export function Description({ page }) {
	const desc = page?.page?.description || page?.description
	if (!desc) return null
	return (
		<article className="container container-max py-2">
			<h2 className="h3 mb-3">{desc}</h2>
		</article>
	)
}
