import React from 'react'

/**
 * Price — renders page.page.price if present.
 * Equivalent to the price block in product.ejs.
 * @param {Object} props
 * @param {Object} props.page
 * @param {string} props.locale
 */
export function Price({ page, locale }) {
	const price = page?.page?.price
	if (!price) return null
	return (
		<div className="container container-max py-3">
			<div className="d-flex h2 gap-3">
				<span>{locale === 'uk' ? 'Ціна' : 'Price'}:</span>
				<span>{price}</span>
			</div>
		</div>
	)
}
