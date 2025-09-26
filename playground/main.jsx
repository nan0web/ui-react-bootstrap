import React from 'react'
import { createRoot } from 'react-dom/client'
import { UIProvider, BootstrapTheme } from '../src/index.jsx'
import { MemoryRouter } from 'react-router-dom'
import Playground from './Playground.jsx'
import DB from "@nan0web/db-browser"

const db = new DB({ host: window.location.origin, console })

// Render app
const root = createRoot(document.getElementById('app'))
root.render(
	<MemoryRouter>
		<UIProvider context={{ theme: BootstrapTheme }}>
			<Playground db={db} />
		</UIProvider>
	</MemoryRouter>
)