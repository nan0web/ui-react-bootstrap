import React from 'react'

/**
 * Files — renders page.files as download links.
 * Equivalent to /_/content/files in product.ejs & standard.ejs.
 * @param {Object} props
 * @param {Object} props.page
 */
export function Files({ page }) {
	const files = page?.files
	if (!files || !Array.isArray(files) || files.length === 0) return null
	return (
		<section className="bg-info bg-gradient bg-opacity-10 py-4">
			<div className="container container-max">
				<h5 className="fw-bold mb-3">📎 Документи</h5>
				<ul className="list-unstyled mb-0">
					{files.map((f, i) => {
						const href = f.src || f.href || '#'
						const isExternal =
							href.startsWith('http') ||
							href.endsWith('.pdf') ||
							href.endsWith('.jpg') ||
							href.endsWith('.png')
						return (
							<li key={i} className="mb-2">
								<a
									href={href}
									className="text-decoration-none d-flex align-items-center gap-2"
									{...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
								>
									<span className="icon-file fs-5 text-primary" />
									<span>{f.name || f.title || href}</span>
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	)
}
