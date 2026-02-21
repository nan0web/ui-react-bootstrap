import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export const Page = ({
	header,
	sidebar,
	footer,
	children,
	className = '',
	container = 'fluid',
}) => {
	const contentColProps = sidebar
		? { md: 9, lg: 10, className: 'pt-4 pb-5 px-md-4' }
		: { xs: 12, className: 'pt-4 pb-5 px-3' }

	return (
		<div className={`page-wrapper d-flex flex-column min-vh-100 ${className}`}>
			{header && <div className="page-header sticky-top z-3">{header}</div>}

			<div className="page-body flex-grow-1">
				<Container fluid={container === 'fluid'} className={container === 'fluid' ? 'p-0' : ''}>
					<Row className="g-0 w-100 h-100">
						{sidebar && (
							<Col
								md={3}
								lg={2}
								className="border-end bg-light d-none d-md-block"
								style={{ minHeight: 'calc(100vh - 60px)' }}
							>
								<div
									className="sticky-top"
									style={{ top: '60px', height: 'calc(100vh - 60px)', overflowY: 'auto' }}
								>
									{sidebar}
								</div>
							</Col>
						)}
						<Col {...contentColProps}>{children}</Col>
					</Row>
				</Container>
			</div>

			{footer && <div className="page-footer mt-auto bg-dark text-white p-4">{footer}</div>}
		</div>
	)
}

Page.inlineRenderer = true
Page.displayName = 'Page'
