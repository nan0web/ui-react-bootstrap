import React from 'react'
import PropTypes from 'prop-types'
import { Button as BootstrapButton } from 'react-bootstrap'
import { useUI } from "@nan0web/ui-react"
import ButtonSpec from '../../specs/core/ButtonSpec.js'

/**
 * Bootstrap Button wrapper for declarative UI.
 * @param {Object} props - Button props
 * @param {string} [props.variant='primary'] - Bootstrap variant
 * @param {string} [props.size='md'] - Bootstrap size
 * @param {boolean} [props.outline=false] - Outline variant
 */
export default function Button(props) {
	const { theme } = useUI()
	const spec = ButtonSpec.from(props)
	const bsVariant = spec.outline ? `outline-${spec.variant}` : spec.variant
	const bsSize = spec.size

	return (
		<BootstrapButton
			variant={bsVariant}
			size={bsSize}
			disabled={spec.disabled}
			{...props}
			style={{ ...theme.atoms.Button, ...props.style }}
		/>
	)
}

Button.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark']),
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	outline: PropTypes.bool,
	disabled: PropTypes.bool,
	children: PropTypes.node,
	style: PropTypes.object,
}
