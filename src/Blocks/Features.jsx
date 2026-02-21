import React from 'react'
import { renderItem } from '../renderItem.jsx'

/**
 * Features — renders page.features as a checklist.
 * Equivalent to the features block in product.ejs.
 * @param {Object} props
 * @param {Object} props.page
 * @param {Function} [props.onNavigate]
 * @param {string} [props.locale]
 * @param {Object} [props.db]
 * @param {Object} [props.globals]
 * @param {Object} [props.duty]
 */
export function Features({ page, onNavigate, locale, db, globals, duty }) {
	const features = page?.features || page?.page?.features
	if (!features || !Array.isArray(features)) return null
	const sharedProps = { locale, page, globals, db, onNavigate, duty }
	return (
		<div className="container container-max py-3">
			<ul className="checked list-unstyled">
				{features.map((item, i) => (
					<li key={i} className="d-flex align-items-start gap-2 mb-2">
						<span className="text-success fw-bold">✓</span>
						<span>
							{typeof item === 'string' ? item : renderItem(item, `feat-${i}`, sharedProps)}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}
