import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { UIProvider, BootstrapTheme, components, renderers } from '../src/index.jsx'
import { MemoryRouter } from 'react-router-dom'
import Playground from './Playground.jsx'
import SandboxApp from '../src/apps/sandbox/App.js'
import DB from '@nan0web/db-browser'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Renderer } from '../src/renderItem.jsx'

const db = new DB({ host: window.location.origin, console })
const apps = new Map([['SandboxApp', () => import('../src/apps/sandbox/App.js')]])

const RootRouter = () => {
	const isSandbox = window.location.pathname.includes('sandbox.html')
	const [appData, setAppData] = useState(null)

	const fullRegistry = {}
	components.forEach((Comp, name) => {
		fullRegistry[name.toLowerCase()] = Comp
		fullRegistry[name] = Comp
	})

	// Create adapters for SandboxApp legacy renderItem expectations
	const Autocomplete = components.get('Autocomplete')
	const TreeView = components.get('TreeView')
	const Button = components.get('Button')

	fullRegistry['autocomplete'] = ({ node, ...rest }) => {
		const props = node?.autocomplete || {}
		return <Autocomplete {...props} {...rest} />
	}
	fullRegistry['tree'] = ({ node, ...rest }) => {
		const props = node?.tree || {}
		const data = Array.isArray(props) ? props : props.data || node
		return <TreeView data={data} {...rest} />
	}
	fullRegistry['button'] = ({ node, ...rest }) => {
		const props = typeof node === 'object' && node !== null ? node : {}
		const cleanProps = {}
		for (const [k, v] of Object.entries(props)) {
			if (k.startsWith('$')) {
				cleanProps[k.slice(1)] = v
			} else {
				cleanProps[k] = v
			}
		}
		return (
			<Button {...cleanProps} {...rest}>
				{props.button}
			</Button>
		)
	}
	fullRegistry['Typography'] = ({ node, ...rest }) => {
		const TypographyComponent = components.get('Typography')
		const props = typeof node === 'object' && node !== null ? node : {}
		const variant = props.$variant || 'body'
		const style = props.$style || {}
		return (
			<TypographyComponent variant={variant} style={style} {...rest}>
				{props.Typography}
			</TypographyComponent>
		)
	}

	useEffect(() => {
		if (isSandbox) {
			// Bypass `new SandboxApp(input)` constructor which crashes on `db instanceof DB`
			// due to Vite chunking mismatch between @nan0web/db and @nan0web/core during e2e.
			const app = Object.create(SandboxApp.prototype)
			app.locale = 'uk'
			app.handleLocaleChange = async (loc) => {
				app.locale = loc
				const res = await app.run()
				setAppData(res.payload?.content || res.content)
			}
			app.run().then((res) => setAppData(res.payload?.content || res.content))
		}
	}, [isSandbox])

	if (isSandbox) {
		if (!appData) return null
		return (
			<div className="p-4">
				<Renderer doc={{ content: appData }} db={db} locale="en" registry={fullRegistry} />
			</div>
		)
	}
	return <Playground db={db} />
}

const root = createRoot(document.getElementById('app'))
root.render(
	<MemoryRouter>
		<UIProvider value={{ theme: BootstrapTheme, components, apps }}>
			<RootRouter />
		</UIProvider>
	</MemoryRouter>,
)
