import React from 'react'

/**
 * Price — displays a large price label.
 * Localized "Price:" vs "Ціна:" automatically via locale.
 * @param {Object} props
 * @param {Object} props.doc
 * @param {string} props.locale
 */
export function Price({ doc, locale }) {
	const price = doc?.doc?.price || doc?.price
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
