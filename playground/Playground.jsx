import React, { useState } from 'react'
import { Button, Input, Typography, Card, Modal } from '../src/components/index.jsx'

export default function Playground() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
			<h1>Playground</h1>
			<hr />
			<Typography variant="body">Welcome to the @nan0web/ui-react-bootstrap Playground. Below are examples of all components with various usages.</Typography>
			<hr />
			<h2>Typography</h2>
			<Typography variant="body">Typography component with different variants:</Typography>
			<Typography variant="h1">Heading 1</Typography>
			<Typography variant="h2">Heading 2</Typography>
			<Typography variant="h3">Heading 3</Typography>
			<Typography variant="body">Body text</Typography>
			<Typography variant="small">Small text</Typography>
			<Typography variant="caption">Caption text</Typography>
			<hr />
			<h2>Buttons</h2>
			<Typography variant="body">Button component with different variants, sizes, and outline styles:</Typography>
			<Button variant="primary" size="md">Primary</Button>
			<Button variant="primary" size="md" outline>Primary Outline</Button>
			<Button variant="secondary" size="sm">Secondary</Button>
			<Button variant="secondary" size="lg" outline>Secondary Outline Large</Button>
			<Button variant="success" size="lg">Success</Button>
			<Button variant="danger" size="md" disabled>Danger Disabled</Button>
			<Button variant="warning" size="sm" outline>Warning Outline</Button>
			<Button variant="info" size="md">Info</Button>
			<Button variant="light" size="lg">Light</Button>
			<Button variant="dark" size="sm" outline>Dark Outline</Button>
			<hr />
			<h2>Inputs</h2>
			<Typography variant="body">Input component with different types:</Typography>
			<Input type="text" placeholder="Text input" />
			<Input type="password" placeholder="Password input" />
			<Input type="email" placeholder="Email input" />
			<Input type="number" placeholder="Number input" />
			<Input type="textarea" placeholder="Textarea" as="textarea" />
			<hr />
			<h2>Cards</h2>
			<Typography variant="body">Card component with nested content:</Typography>
			<Card>
				<Typography variant="h3">Card Title</Typography>
				<Typography variant="body">This is a sample card body with some text and a button inside.</Typography>
				<Button variant="primary">Card Button</Button>
			</Card>
			<Card>
				<Typography variant="body">Another card with input:</Typography>
				<Input type="text" placeholder="Input inside card" />
			</Card>
			<hr />
			<h2>Modals</h2>
			<Typography variant="body">Modal component example (click button to open):</Typography>
			<Button variant="primary" onClick={() => setIsModalOpen(true)}>Open Modal</Button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<Typography variant="h3">Modal Title</Typography>
				<Typography variant="body">This is the modal body. It can contain any components like buttons or inputs.</Typography>
				<Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close Modal</Button>
				<Button variant="primary">Action Button</Button>
			</Modal>
			<hr />
			<Typography variant="body">This playground demonstrates declarative rendering of UI components using JSON structures. Experiment by editing public/index.json!</Typography>
		</div>
	)
}