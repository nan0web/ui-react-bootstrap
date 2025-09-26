import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { useUI } from "@nan0web/ui-react"

export default function Input({ type = 'text', ...props }) {
	const { theme } = useUI()
	const style = { ...theme.atoms.Input, ...props.style }

	return <Form.Control type={type} {...props} style={style} />
}

Input.propTypes = {
	type: PropTypes.string,
	style: PropTypes.object,
}
