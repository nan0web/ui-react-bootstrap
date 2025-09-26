import { createTheme } from '@nan0web/ui-core'
import { tokens } from '@nan0web/ui-react'

// Bootstrap overrides
const bootstrapOverrides = {
	atoms: {
		Button: {
			...tokens.Button,
			solid: {
				primary: { background: 'var(--bs-primary)', color: 'var(--bs-white)', border: 'var(--bs-primary)' },
				secondary: { background: 'var(--bs-secondary)', color: 'var(--bs-white)', border: 'var(--bs-secondary)' },
				success: { background: 'var(--bs-success)', color: 'var(--bs-white)', border: 'var(--bs-success)' },
				danger: { background: 'var(--bs-danger)', color: 'var(--bs-white)', border: 'var(--bs-danger)' },
				warning: { background: 'var(--bs-warning)', color: 'var(--bs-dark)', border: 'var(--bs-warning)' },
				info: { background: 'var(--bs-info)', color: 'var(--bs-white)', border: 'var(--bs-info)' },
				light: { background: 'var(--bs-light)', color: 'var(--bs-dark)', border: 'var(--bs-light)' },
				dark: { background: 'var(--bs-dark)', color: 'var(--bs-white)', border: 'var(--bs-dark)' },
			},
			outline: {
				primary: { background: 'transparent', color: 'var(--bs-primary)', border: 'var(--bs-primary)' },
				secondary: { background: 'transparent', color: 'var(--bs-secondary)', border: 'var(--bs-secondary)' },
				success: { background: 'transparent', color: 'var(--bs-success)', border: 'var(--bs-success)' },
				danger: { background: 'transparent', color: 'var(--bs-danger)', border: 'var(--bs-danger)' },
				warning: { background: 'transparent', color: 'var(--bs-warning)', border: 'var(--bs-warning)' },
				info: { background: 'transparent', color: 'var(--bs-info)', border: 'var(--bs-info)' },
				light: { background: 'transparent', color: 'var(--bs-light)', border: 'var(--bs-light)' },
				dark: { background: 'transparent', color: 'var(--bs-dark)', border: 'var(--bs-dark)' },
			},
		},
	},
	molecules: {
		Card: {
			...tokens.Card,
			borderRadius: 'var(--bs-border-radius)',
			boxShadow: 'var(--bs-card-box-shadow)',
		},
	},
	organisms: {
		Modal: {
			...tokens.Modal,
			overlayBackground: 'rgba(0,0,0,0.5)',
		},
	},
}

export default createTheme(bootstrapOverrides)
