import React, { useState } from 'react'
import { Renderer } from '../src/index.jsx'

/**
 * Enhanced Playground using Renderer to test Universal Blocks.
 */
export default function Playground({ db }) {
	const mockPage = {
		title: 'Універсальні Блоки (Пісочниця)',
		description: 'Тестування всіх концептуальних блоків OLMUI',
		excerpt: [
			{ p: 'Це короткий опис або excerpt, який може складатися з декількох параграфів.' },
			{ p: 'І підтримувати **жирний** текст, хоча ми використовуємо HTML.' },
		],
		features: [
			'Абсолютна незалежність',
			'Строга типізація (Model as Schema)',
			{ b: 'Вбудовані компоненти' },
		],
		price: 'Безкоштовно ($0)',
		content: [
			{ h3: 'Основний контент' },
			{ p: 'Тут знаходиться масив основного контенту.' },
			{ hr: true },
			{
				table: {
					$class: 'table table-bordered mt-3',
					tbody: [{ tr: [{ td: 'Ключ' }, { td: 'Значення' }] }],
				},
			},
		],
		accordion: [
			{ q: 'Що це таке?', a: 'Це нова система універсальних блоків.' },
			{ title: 'Як це працює?', content: 'Через єдиний Renderer та Model as Schema.' },
		],
		files: [
			{ href: '/test.pdf', name: 'Документація (PDF)' },
			{ href: 'https://example.com', title: 'Зовнішнє посилання' },
		],
		contract: [
			{ id: 'section-1', title: '1. Загальні положення', content: [{ p: 'Текст положення 1.' }] },
			{ id: 'section-2', title: "2. Права та обов'язки", content: [{ p: "Текст обов'язків." }] },
		],
		$layout: 'product',
		$pageNavigator: { text: 'Навігація по контракту' },
	}

	return (
		<div style={{ padding: '0', maxWidth: '100%', margin: '0 auto' }}>
			{/* Header for the playground itself */}
			<div
				style={{
					padding: '10px 20px',
					backgroundColor: '#f8f9fa',
					borderBottom: '1px solid #dee2e6',
					marginBottom: '20px',
				}}
			>
				<h4 className="mb-1">Universal Blocks Sandbox</h4>
				<p className="text-muted mb-0">Testing @nan0web/ui-react-bootstrap/Blocks</p>
			</div>

			{/* Render using the extracted Renderer */}
			<div className="bg-white pb-5">
				<Renderer page={mockPage} db={db} locale="uk" />
			</div>
		</div>
	)
}
