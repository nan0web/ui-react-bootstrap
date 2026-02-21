import React from 'react'

/**
 * Accordion — renders page.page.accordion or page.accordion as Bootstrap accordion.
 * Equivalent to /_/content/accordion in product.ejs.
 * @param {Object} props
 * @param {Object} props.page
 */
export function Accordion({ page }) {
	const accordion = page?.page?.accordion || page?.accordion
	if (!accordion || !Array.isArray(accordion)) return null
	const baseId = React.useId().replace(/:/g, '')
	return (
		<section className="container container-max mb-5">
			<div className="accordion" id={`pageAccordion-${baseId}`}>
				{accordion.map((item, i) => {
					const id = `accordion-${baseId}-${i}`
					return (
						<div className="accordion-item" key={id}>
							<h2 className="accordion-header" id={`heading-${id}`}>
								<button
									className={`accordion-button ${i > 0 ? 'collapsed' : ''}`}
									type="button"
									data-bs-toggle="collapse"
									data-bs-target={`#collapse-${id}`}
									aria-expanded={i === 0 ? 'true' : 'false'}
									aria-controls={`collapse-${id}`}
								>
									{item.title || item.q || `Питання ${i + 1}`}
								</button>
							</h2>
							<div
								id={`collapse-${id}`}
								className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`}
								aria-labelledby={`heading-${id}`}
								data-bs-parent={`#pageAccordion-${baseId}`}
							>
								<div
									className="accordion-body"
									dangerouslySetInnerHTML={{
										__html: item.content || item.a || item.text || '',
									}}
								/>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}
