import React from 'react'
import PropTypes from 'prop-types'
import { Card as BootstrapCard } from 'react-bootstrap'
import { useUI } from "@nan0web/ui-react"

export default function Card({ children, ...props }) {
	const { theme } = useUI()
	const config = theme.molecules.Card
	const style = {
		borderRadius: config.borderRadius,
		boxShadow: config.boxShadow,
		padding: config.padding,
		backgroundColor: config.backgroundColor,
		borderColor: config.borderColor,
		...props.style,
	}

	return (
		<BootstrapCard style={style} {...props}>
			{children}
		</BootstrapCard>
	)
}

Card.propTypes = {
	children: PropTypes.node.isRequired,
	style: PropTypes.object,
}
