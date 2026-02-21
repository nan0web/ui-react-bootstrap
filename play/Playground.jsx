import React, { useState } from 'react'
import { Renderer, Blocks } from '../src/index.jsx'
import yaml from 'js-yaml'

function BlockShowcase({
	title,
	description,
	id,
	componentUsage,
	schemaPayload,
	children,
	locale,
}) {
	const schemaYaml = yaml.dump(schemaPayload, { indent: 2, noRefs: true, flowLevel: -1 })

	// Add syntax highlighting placeholder mapping if needed
	return (
		<div id={id} className="container mt-5 mb-5 pb-5 border-bottom px-0 px-md-3">
			<h2 className="mb-2 text-primary">📦 {title}</h2>
			{description && <p className="text-muted mb-4">{description}</p>}

			<div className="row g-4">
				{/* React Component Example */}
				<div className="col-lg-6">
					<div className="card h-100 shadow-sm border-0">
						<div className="card-header bg-light border-0 py-3">
							<span className="badge bg-primary fs-6 mb-2">React Component</span>
							<p className="mb-0 small text-muted">
								Використання безпосередньо як React компонент (props).
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

				{/* YAML Schema Example */}
				<div className="col-lg-6">
					<div className="card h-100 shadow-sm border-0">
						<div className="card-header bg-light border-0 py-3">
							<span className="badge bg-success fs-6 mb-2">Model as Schema</span>
							<p className="mb-0 small text-muted">Використання через універсальний YAML-шаблон.</p>
						</div>
						<div className="card-body bg-white border-top">
							<Renderer page={schemaPayload} locale={locale} />
						</div>
						<div className="card-footer bg-dark border-0 p-3">
							<pre className="mb-0 text-white" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
								{schemaYaml}
							</pre>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function Playground({ db }) {
	const [locale, setLocale] = useState('uk')

	const toggleLocale = () => setLocale((prev) => (prev === 'uk' ? 'en' : 'uk'))
	const sharedProps = { db, locale }

	const blocks = [
		'Description',
		'Excerpt',
		'Features',
		'Content',
		'Accordion',
		'Files',
		'Price',
		'Contract',
	]

	return (
		<div
			className="d-flex flex-column flex-md-row"
			style={{ minHeight: '100vh', backgroundColor: '#f5f7fa', paddingBottom: '70px' }} // Padding for mobile nav
		>
			{/* Sidebar Navigation - Desktop only */}
			<nav
				className="col-md-3 col-lg-2 bg-white shadow-sm sidebar sticky-top d-none d-md-block"
				style={{ top: 0, height: '100vh', overflowY: 'auto' }}
			>
				<div className="p-4 border-bottom">
					<h5 className="fw-bold mb-0">Каталог OLMUI</h5>
					<p className="small text-muted mb-0 mt-1">@nan0web/ui-react-bootstrap</p>
				</div>
				<div className="p-3">
					<ul className="nav flex-column gap-2">
						{blocks.map((b) => (
							<li className="nav-item" key={b}>
								<a
									className="nav-link text-dark fw-medium rounded p-2"
									href={'#block-' + b.toLowerCase()}
								>
									{b}
								</a>
							</li>
						))}
					</ul>
				</div>
			</nav>

			{/* Bottom Navigation - Mobile only */}
			<nav
				className="d-md-none fixed-bottom bg-white border-top shadow-lg"
				style={{ zIndex: 1050, overflowX: 'auto', whiteSpace: 'nowrap' }}
			>
				<ul
					className="nav nav-pills p-2 flex-nowrap align-items-center"
					style={{ overflowX: 'auto' }}
				>
					{blocks.map((b) => (
						<li className="nav-item" key={b}>
							<a
								className="nav-link text-dark px-3 py-2"
								style={{ borderRadius: '20px' }}
								href={'#block-' + b.toLowerCase()}
							>
								{b}
							</a>
						</li>
					))}
				</ul>
			</nav>

			{/* Main Content */}
			<div className="col-md-9 col-lg-10">
				{/* Top Header */}
				<div className="bg-white shadow-sm border-bottom py-3 px-3 px-md-4 mb-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
					<div>
						<h1 className="fw-bold mb-0 h3">Універсальні Блоки: Пісочниця</h1>
						<p className="text-muted small mb-0 mt-1">
							Всі концептуальні блоки рендеряться використовуючи <code>Renderer</code> та{' '}
							<code>Blocks.*</code>.
						</p>
					</div>
					<div>
						<button className="btn btn-outline-primary fw-bold px-4" onClick={toggleLocale}>
							<span className="me-2">Мова:</span>
							{locale === 'uk' ? '🇺🇦 UK' : '🇬🇧 EN'}
						</button>
					</div>
				</div>

				<div className="container-fluid px-3 px-md-4 pb-5">
					<BlockShowcase
						id="block-description"
						title="Blocks.Description"
						description="Підзаголовок або короткий опис сторінки."
						locale={locale}
						componentUsage={`<Blocks.Description \n  page={{ description: "Це короткий опис (підзаголовок)" }} \n/>`}
						schemaPayload={{
							$content: ['Description'],
							description: 'Це короткий опис (підзаголовок)',
						}}
					>
						<Blocks.Description page={{ description: 'Це короткий опис (підзаголовок)' }} />
					</BlockShowcase>

					{/* Excerpt Block */}
					<BlockShowcase
						id="block-excerpt"
						title="Blocks.Excerpt"
						description="Вступний текст сторінки, що підтримує форматування (жирний шрифт, курсив, тощо)."
						locale={locale}
						componentUsage={`<Blocks.Excerpt \n  locale={locale} \n  page={{\n    excerpt: [\n      { p: "Це перший абзац екстракту." },\n      { p: ["Тут є ", { b: "жирний" }, " і звичайний текст."] }\n    ]\n  }}\n/>`}
						schemaPayload={{
							$content: ['Excerpt'],
							excerpt: [
								{ p: 'Це перший абзац екстракту.' },
								{ p: ['Тут є ', { b: 'жирний' }, ' і звичайний текст.'] },
							],
						}}
					>
						<Blocks.Excerpt
							page={{
								excerpt: [
									{ p: 'Це перший абзац екстракту.' },
									{ p: ['Тут є ', { b: 'жирний' }, ' і звичайний текст.'] },
								],
							}}
							{...sharedProps}
						/>
					</BlockShowcase>

					{/* Features Block */}
					<BlockShowcase
						id="block-features"
						title="Blocks.Features"
						description="Перелік переваг чи фіч з іконкою-галочкою."
						locale={locale}
						componentUsage={`<Blocks.Features \n  locale={locale} \n  page={{\n    features: [\n      "Абсолютна незалежність",\n      "Строга типізація (Model as Schema)",\n      { b: "Всі базові HTML-теги підтримуються" }\n    ]\n  }}\n/>`}
						schemaPayload={{
							$content: ['Features'],
							features: [
								'Абсолютна незалежність',
								'Строга типізація (Model as Schema)',
								{ b: 'Всі базові HTML-теги підтримуються' },
							],
						}}
					>
						<Blocks.Features
							page={{
								features: [
									'Абсолютна незалежність',
									'Строга типізація (Model as Schema)',
									{ b: 'Всі базові HTML-теги підтримуються' },
								],
							}}
							{...sharedProps}
						/>
					</BlockShowcase>

					{/* Content Block */}
					<BlockShowcase
						id="block-content"
						title="Blocks.Content"
						description="Основний контент сторінки. Здатний рендерити складну та багатовимірну структуру HTML-тегів."
						locale={locale}
						componentUsage={`<Blocks.Content \n  locale={locale} \n  page={{\n    content: [\n      { h3: "Основний контент" },\n      { p: "Тут знаходиться масив основного контенту." },\n      { hr: true },\n      { table: { tbody: [{ tr: [{ td: "Ключ" }, { td: "Значення" }] }] } }\n    ]\n  }}\n/>`}
						schemaPayload={{
							$content: ['Content'],
							content: [
								{ h3: 'Основний контент' },
								{ p: 'Тут знаходиться масив основного контенту.' },
								{ hr: true },
								{
									table: {
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
						id="block-accordion"
						title="Blocks.Accordion"
						description="Інтерактивний компонент 'акордеон' з питаннями-відповідями (Bootstrap JS collapse)."
						locale={locale}
						componentUsage={`<Blocks.Accordion \n  page={{\n    accordion: [\n      { q: "Що це таке?", a: "Це нова система універсальних блоків." },\n      { title: "Як це працює?", content: "Через єдиний Renderer та Model as Schema." }\n    ]\n  }}\n/>`}
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
						id="block-files"
						title="Blocks.Files"
						description="Секція документів (іконку скріпки додає сам компонент). Можна задати свій заголовок через filesTitle."
						locale={locale}
						componentUsage={`<Blocks.Files \n  locale={locale}\n  page={{\n    filesTitle: "Договори та документи",\n    files: [\n      { href: "/test.pdf", name: "Документація (PDF)" },\n      { href: "https://example.com", title: "Зовнішнє посилання" }\n    ]\n  }}\n/>`}
						schemaPayload={{
							$content: ['Files'],
							filesTitle: 'Договори та документи',
							files: [
								{ href: '/test.pdf', name: 'Документація (PDF)' },
								{ href: 'https://example.com', title: 'Зовнішнє посилання' },
							],
						}}
					>
						<Blocks.Files
							locale={locale}
							page={{
								filesTitle: 'Договори та документи',
								files: [
									{ href: '/test.pdf', name: 'Документація (PDF)' },
									{ href: 'https://example.com', title: 'Зовнішнє посилання' },
								],
							}}
						/>
					</BlockShowcase>

					{/* Price Block */}
					<BlockShowcase
						id="block-price"
						title="Blocks.Price"
						description="Блок для відображення ціни. Підтримує локалізацію (UK/EN 'Ціна' vs 'Price'). Тут наведено велике число як приклад."
						locale={locale}
						componentUsage={`<Blocks.Price \n  locale={locale} \n  page={{ price: "1 500 000.00 ₴" }} \n/>`}
						schemaPayload={{
							$content: ['Price'],
							price: '1 500 000.00 ₴',
						}}
					>
						<Blocks.Price page={{ price: '1 500 000.00 ₴' }} locale={locale} />
					</BlockShowcase>

					{/* Contract Block */}
					<BlockShowcase
						id="block-contract"
						title="Blocks.Contract"
						description="Кнопка для друку і секції регламенту з навігатором (dropdown)."
						locale={locale}
						componentUsage={`<Blocks.Contract \n  locale={locale}\n  page={{\n    $pageNavigator: { text: "Навігація по контракту" },\n    contract: [\n      { id: "section-1", title: "1. Загальні положення", content: [{ p: "Текст положення 1." }] },\n      { id: "section-2", title: "2. Права та обов'язки", content: [{ p: "Текст обов'язків." }] }\n    ]\n  }}\n/>`}
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
		</div>
	)
}
