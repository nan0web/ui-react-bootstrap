import React from 'react'
import { Renderer, Blocks } from '../src/index.jsx'

function BlockShowcase({ title, componentUsage, schemaUsage, children, schemaPayload }) {
	return (
		<div className="container mt-5 mb-5 pb-5 border-bottom">
			<h2 className="mb-4 text-primary">📦 {title}</h2>
			<div className="row g-4">
				{/* React Component Example */}
				<div className="col-lg-6">
					<div className="card h-100 shadow-sm border-0">
						<div className="card-header bg-light border-0 py-3">
							<span className="badge bg-primary fs-6 mb-2">React Component</span>
							<p className="mb-0 small text-muted">
								Використання безпосередньо як React компонент (з передачею props).
							</p>
						</div>
						<div className="card-body bg-white border-top">{children}</div>
						<div className="card-footer bg-dark border-0 p-3">
							<pre className="mb-0 text-white" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
								{componentUsage}
							</pre>
						</div>
					</div>
				</div>

				{/* JSON Schema Example */}
				<div className="col-lg-6">
					<div className="card h-100 shadow-sm border-0">
						<div className="card-header bg-light border-0 py-3">
							<span className="badge bg-success fs-6 mb-2">Model as Schema</span>
							<p className="mb-0 small text-muted">
								Використання через універсальну мета-схему (JSON/YAML) та Renderer.
							</p>
						</div>
						<div className="card-body bg-white border-top">
							<Renderer page={schemaPayload} />
						</div>
						<div className="card-footer bg-dark border-0 p-3">
							<pre className="mb-0 text-white" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
								{schemaUsage}
							</pre>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

/**
 * Enhanced Playground using Renderer to test Universal Blocks as a UI Catalog.
 */
export default function Playground({ db }) {
	const sharedProps = { db, locale: 'uk' }

	return (
		<div style={{ padding: '0', maxWidth: '100%', margin: '0 auto', backgroundColor: '#f5f7fa' }}>
			{/* Catalog Header */}
			<div className="bg-white shadow-sm border-bottom py-4 mb-4">
				<div className="container">
					<h1 className="fw-bold mb-2">Універсальні Блоки: Пісочниця</h1>
					<p className="text-muted lead mb-0">
						Каталог компонентів OLMUI (One Logic Many UI). Демонстрація прямого імпорту та Model as
						Schema підключення.
					</p>
				</div>
			</div>

			<div className="container-fluid pb-5">
				{/* Description Block */}
				<BlockShowcase
					title="Blocks.Description"
					componentUsage={`<Blocks.Description \n  page={{ description: "Це короткий опис (підзаголовок)" }} \n/>`}
					schemaUsage={`{\n  "$content": ["Description"],\n  "description": "Це короткий опис (підзаголовок)"\n}`}
					schemaPayload={{
						$content: ['Description'],
						description: 'Це короткий опис (підзаголовок)',
					}}
				>
					<Blocks.Description page={{ description: 'Це короткий опис (підзаголовок)' }} />
				</BlockShowcase>

				{/* Excerpt Block */}
				<BlockShowcase
					title="Blocks.Excerpt"
					componentUsage={`<Blocks.Excerpt \n  page={{\n    excerpt: [\n      { p: "Це перший абзац екстракту." },\n      { p: "І підтримувати **жирний** текст, хоча ми використовуємо HTML." }\n    ]\n  }}\n/>`}
					schemaUsage={`{\n  "$content": ["Excerpt"],\n  "excerpt": [\n    { "p": "Це перший абзац екстракту." },\n    { "p": "І підтримувати **жирний** текст, хоча ми використовуємо HTML." }\n  ]\n}`}
					schemaPayload={{
						$content: ['Excerpt'],
						excerpt: [
							{ p: 'Це перший абзац екстракту.' },
							{ p: 'І підтримувати **жирний** текст, хоча ми використовуємо HTML.' },
						],
					}}
				>
					<Blocks.Excerpt
						page={{
							excerpt: [
								{ p: 'Це перший абзац екстракту.' },
								{ p: 'І підтримувати **жирний** текст, хоча ми використовуємо HTML.' },
							],
						}}
						{...sharedProps}
					/>
				</BlockShowcase>

				{/* Features Block */}
				<BlockShowcase
					title="Blocks.Features"
					componentUsage={`<Blocks.Features \n  page={{\n    features: [\n      "Абсолютна незалежність",\n      "Строга типізація (Model as Schema)",\n      { b: "Вбудовані компоненти" }\n    ]\n  }}\n/>`}
					schemaUsage={`{\n  "$content": ["Features"],\n  "features": [\n    "Абсолютна незалежність",\n    "Строга типізація (Model as Schema)",\n    { "b": "Вбудовані компоненти" }\n  ]\n}`}
					schemaPayload={{
						$content: ['Features'],
						features: [
							'Абсолютна незалежність',
							'Строга типізація (Model as Schema)',
							{ b: 'Вбудовані компоненти' },
						],
					}}
				>
					<Blocks.Features
						page={{
							features: [
								'Абсолютна незалежність',
								'Строга типізація (Model as Schema)',
								{ b: 'Вбудовані компоненти' },
							],
						}}
						{...sharedProps}
					/>
				</BlockShowcase>

				{/* Content Block */}
				<BlockShowcase
					title="Blocks.Content"
					componentUsage={`<Blocks.Content \n  page={{\n    content: [\n      { h3: "Основний контент" },\n      { p: "Тут знаходиться масив основного контенту." },\n      { hr: true },\n      { table: { $class: "table table-bordered", tbody: [{ tr: [{ td: "Ключ" }, { td: "Значення" }] }] } }\n    ]\n  }}\n/>`}
					schemaUsage={`{\n  "$content": ["Content"],\n  "content": [\n    { "h3": "Основний контент" },\n    { "p": "Тут знаходиться масив основного контенту." },\n    { "hr": true },\n    { \n      "table": { \n        "$class": "table table-bordered", \n        "tbody": [{ "tr": [{ "td": "Ключ" }, { "td": "Значення" }] }] \n      } \n    }\n  ]\n}`}
					schemaPayload={{
						$content: ['Content'],
						content: [
							{ h3: 'Основний контент' },
							{ p: 'Тут знаходиться масив основного контенту.' },
							{ hr: true },
							{
								table: {
									$class: 'table table-bordered',
									tbody: [{ tr: [{ td: 'Ключ' }, { td: 'Значення' }] }],
								},
							},
						],
					}}
				>
					<Blocks.Content
						page={{
							content: [
								{ h3: 'Основний контент' },
								{ p: 'Тут знаходиться масив основного контенту.' },
								{ hr: true },
								{
									table: {
										$class: 'table table-bordered',
										tbody: [{ tr: [{ td: 'Ключ' }, { td: 'Значення' }] }],
									},
								},
							],
						}}
						{...sharedProps}
					/>
				</BlockShowcase>

				{/* Accordion Block */}
				<BlockShowcase
					title="Blocks.Accordion"
					componentUsage={`<Blocks.Accordion \n  page={{\n    accordion: [\n      { q: "Що це таке?", a: "Це нова система універсальних блоків." },\n      { title: "Як це працює?", content: "Через єдиний Renderer та Model as Schema." }\n    ]\n  }}\n/>`}
					schemaUsage={`{\n  "$content": ["Accordion"],\n  "accordion": [\n    { "q": "Що це таке?", "a": "Це нова система універсальних блоків." },\n    { "title": "Як це працює?", "content": "Через єдиний Renderer та Model as Schema." }\n  ]\n}`}
					schemaPayload={{
						$content: ['Accordion'],
						accordion: [
							{ q: 'Що це таке?', a: 'Це нова система універсальних блоків.' },
							{ title: 'Як це працює?', content: 'Через єдиний Renderer та Model as Schema.' },
						],
					}}
				>
					<Blocks.Accordion
						page={{
							accordion: [
								{ q: 'Що це таке?', a: 'Це нова система універсальних блоків.' },
								{ title: 'Як це працює?', content: 'Через єдиний Renderer та Model as Schema.' },
							],
						}}
					/>
				</BlockShowcase>

				{/* Files Block */}
				<BlockShowcase
					title="Blocks.Files"
					componentUsage={`<Blocks.Files \n  page={{\n    files: [\n      { href: "/test.pdf", name: "Документація (PDF)" },\n      { href: "https://example.com", title: "Зовнішнє посилання" }\n    ]\n  }}\n/>`}
					schemaUsage={`{\n  "$content": ["Files"],\n  "files": [\n    { "href": "/test.pdf", "name": "Документація (PDF)" },\n    { "href": "https://example.com", "title": "Зовнішнє посилання" }\n  ]\n}`}
					schemaPayload={{
						$content: ['Files'],
						files: [
							{ href: '/test.pdf', name: 'Документація (PDF)' },
							{ href: 'https://example.com', title: 'Зовнішнє посилання' },
						],
					}}
				>
					<Blocks.Files
						page={{
							files: [
								{ href: '/test.pdf', name: 'Документація (PDF)' },
								{ href: 'https://example.com', title: 'Зовнішнє посилання' },
							],
						}}
					/>
				</BlockShowcase>

				{/* Price Block */}
				<BlockShowcase
					title="Blocks.Price"
					componentUsage={`<Blocks.Price \n  page={{ price: "Безкоштовно ($0)" }} \n  locale="uk"\n/>`}
					schemaUsage={`{\n  "$content": ["Price"],\n  "price": "Безкоштовно ($0)"\n}`}
					schemaPayload={{
						$content: ['Price'],
						price: 'Безкоштовно ($0)',
					}}
				>
					<Blocks.Price page={{ price: 'Безкоштовно ($0)' }} locale="uk" />
				</BlockShowcase>

				{/* Contract Block */}
				<BlockShowcase
					title="Blocks.Contract"
					componentUsage={`<Blocks.Contract \n  page={{\n    $pageNavigator: { text: "Навігація по контракту" },\n    contract: [\n      { id: "section-1", title: "1. Загальні положення", content: [{ p: "Текст положення 1." }] },\n      { id: "section-2", title: "2. Права та обов'язки", content: [{ p: "Текст обов'язків." }] }\n    ]\n  }}\n/>`}
					schemaUsage={`{\n  "$content": ["Contract"],\n  "$pageNavigator": { "text": "Навігація по контракту" },\n  "contract": [\n    { "id": "section-1", "title": "1. Загальні положення", "content": [{ "p": "Текст положення 1." }] },\n    { "id": "section-2", "title": "2. Права та обов'язки", "content": [{ "p": "Текст обов'язків." }] }\n  ]\n}`}
					schemaPayload={{
						$content: ['Contract'],
						$pageNavigator: { text: 'Навігація по контракту' },
						contract: [
							{
								id: 'section-1',
								title: '1. Загальні положення',
								content: [{ p: 'Текст положення 1.' }],
							},
							{
								id: 'section-2',
								title: "2. Права та обов'язки",
								content: [{ p: "Текст обов'язків." }],
							},
						],
					}}
				>
					<Blocks.Contract
						page={{
							$pageNavigator: { text: 'Навігація по контракту' },
							contract: [
								{
									id: 'section-1',
									title: '1. Загальні положення',
									content: [{ p: 'Текст положення 1.' }],
								},
								{
									id: 'section-2',
									title: "2. Права та обов'язки",
									content: [{ p: "Текст обов'язків." }],
								},
							],
						}}
						{...sharedProps}
					/>
				</BlockShowcase>
			</div>
		</div>
	)
}
