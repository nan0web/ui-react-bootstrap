import React, { useState } from 'react'
import { Renderer, Blocks } from '../src/index.jsx'
import yaml from 'js-yaml'

function Example({ label, children, jsxCode, yamlCode }) {
	const formattedYaml = yamlCode
		? yaml.dump(yamlCode, { indent: 2, noRefs: true, flowLevel: -1 })
		: null

	return (
		<div className="mb-4">
			{label && <h6 className="text-muted text-uppercase small fw-semibold mb-2">{label}</h6>}
			<div className="card border-0 shadow-sm mb-3">
				<div className="card-body bg-white py-4">{children}</div>
			</div>

			<div className="row g-2">
				{jsxCode && (
					<div className="col-12 col-xl-6">
						<div className="card border-0 shadow-sm h-100">
							<div
								className="card-header bg-primary text-white py-2 px-3 fw-bold"
								style={{ fontSize: '0.8rem' }}
							>
								JSX
							</div>
							<div
								className="card-body bg-dark p-3"
								style={{ borderBottomLeftRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
							>
								<pre
									className="mb-0 text-white"
									style={{ fontSize: '0.8rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}
								>
									{jsxCode}
								</pre>
							</div>
						</div>
					</div>
				)}
				{yamlCode && (
					<div className="col-12 col-xl-6">
						<div className="card border-0 shadow-sm h-100">
							<div
								className="card-header bg-success text-white py-2 px-3 fw-bold"
								style={{ fontSize: '0.8rem' }}
							>
								Meta Data (YAML)
							</div>
							<div
								className="card-body bg-dark p-3"
								style={{ borderBottomLeftRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
							>
								<pre
									className="mb-0 text-white"
									style={{ fontSize: '0.8rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}
								>
									{formattedYaml}
								</pre>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

function BlockSection({ id, title, description, children }) {
	return (
		<div id={id} className="mb-5 pb-5 border-bottom">
			<h2 className="mb-2 text-primary">📦 {title}</h2>
			{description && <p className="text-muted mb-4">{description}</p>}
			{children}
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
			style={{ minHeight: '100vh', backgroundColor: '#eef2f6', paddingBottom: '70px' }}
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
					<ul className="nav flex-column gap-1">
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
				<div className="bg-white shadow-sm border-bottom py-3 px-3 px-md-4 mb-5 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
					<div>
						<h1 className="fw-bold mb-0 h3">Каталог Блоків OLMUI</h1>
						<p className="text-muted small mb-0 mt-1">
							Інтерактивна Пісочниця: <code>Renderer</code>, та <code>Blocks.*</code>.
						</p>
					</div>
					<button className="btn btn-outline-primary fw-bold px-4 shadow-sm" onClick={toggleLocale}>
						{locale === 'uk' ? '🇺🇦 UK → EN' : '🇬🇧 EN → UK'}
					</button>
				</div>

				<div className="container-fluid px-3 px-md-4 pb-5">
					{/* ═══════════════════════════════════════════════════ */}
					{/*  DESCRIPTION                                       */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-description"
						title="Blocks.Description"
						description="Підзаголовок або короткий опис сторінки. Рядкове значення. Рендериться як <h2>."
					>
						<Example
							label="Простий текст"
							jsxCode={`<Blocks.Description doc={{ description: "Короткий опис сторінки" }} />`}
							yamlCode={{ $content: ['Description'], description: 'Короткий опис сторінки' }}
						>
							<Blocks.Description doc={{ description: 'Короткий опис сторінки' }} />
						</Example>

						<Example
							label="Довгий підзаголовок"
							jsxCode={`<Blocks.Description doc={{ description: "Цей блок відображає опис або підзаголовок сторінки. Він підтримує довгі описи з різними символами та & HTML entities." }} />`}
							yamlCode={{
								$content: ['Description'],
								description:
									'Цей блок відображає опис або підзаголовок сторінки. Він підтримує довгі описи з різними символами та & HTML entities.',
							}}
						>
							<Blocks.Description
								doc={{
									description:
										'Цей блок відображає опис або підзаголовок сторінки. Він підтримує довгі описи з різними символами та & HTML entities.',
								}}
							/>
						</Example>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  EXCERPT                                           */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-excerpt"
						title="Blocks.Excerpt"
						description="Вступний текст (excerpt). Масив nano-вузлів. Підтримує форматування через вбудований renderItem."
					>
						<Example
							label="Один абзац"
							jsxCode={`<Blocks.Excerpt doc={{\n  excerpt: [{ p: "Простий вступний абзац без форматування." }]\n}} />`}
							yamlCode={{
								$content: ['Excerpt'],
								excerpt: [{ p: 'Простий вступний абзац без форматування.' }],
							}}
						>
							<Blocks.Excerpt
								doc={{ excerpt: [{ p: 'Простий вступний абзац без форматування.' }] }}
								{...sharedProps}
							/>
						</Example>

						<Example
							label="Форматований текст (Bold, Italic, Link)"
							jsxCode={`<Blocks.Excerpt doc={{\n  excerpt: [\n    { p: ["Цей текст містить ", { b: "жирний" }, ", ", { i: "курсив" }, " та ", { a: { $href: "#", _: "посилання" } }, "."] },\n    { p: "Другий абзац для демонстрації відступів." }\n  ]\n}} />`}
							yamlCode={{
								$content: ['Excerpt'],
								excerpt: [
									{
										p: [
											'Цей текст містить ',
											{ b: 'жирний' },
											', ',
											{ i: 'курсив' },
											' та ',
											{ a: { $href: '#', _: 'посилання' } },
											'.',
										],
									},
									{ p: 'Другий абзац для демонстрації відступів.' },
								],
							}}
						>
							<Blocks.Excerpt
								doc={{
									excerpt: [
										{
											p: [
												'Цей текст містить ',
												{ b: 'жирний' },
												', ',
												{ i: 'курсив' },
												' та ',
												{ a: { $href: '#', _: 'посилання' } },
												'.',
											],
										},
										{ p: 'Другий абзац для демонстрації відступів.' },
									],
								}}
								{...sharedProps}
							/>
						</Example>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  FEATURES                                          */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-features"
						title="Blocks.Features"
						description="Список переваг/фіч з іконками-галочками. Елементи: рядки або масиви форматованого тексту."
					>
						<Example
							label="Прості рядки"
							jsxCode={`<Blocks.Features doc={{\n  features: [\n    "Безкоштовне обслуговування",\n    "Онлайн-підтримка 24/7",\n    "Без комісії за переказ"\n  ]\n}} />`}
							yamlCode={{
								$content: ['Features'],
								features: [
									'Безкоштовне обслуговування',
									'Онлайн-підтримка 24/7',
									'Без комісії за переказ',
								],
							}}
						>
							<Blocks.Features
								doc={{
									features: [
										'Безкоштовне обслуговування',
										'Онлайн-підтримка 24/7',
										'Без комісії за переказ',
									],
								}}
								{...sharedProps}
							/>
						</Example>

						<Example
							label="З HTML-форматуванням (SPAN)"
							jsxCode={`<Blocks.Features doc={{\n  features: [\n    { b: "Гарантована безпека" },\n    { span: ["Підтримка ", { b: "двох мов" }, " (UK/EN)"] },\n    { i: "Роботизований аналіз ризиків" }\n  ]\n}} />`}
							yamlCode={{
								$content: ['Features'],
								features: [
									{ b: 'Гарантована безпека' },
									{ span: ['Підтримка ', { b: 'двох мов' }, ' (UK/EN)'] },
									{ i: 'Роботизований аналіз ризиків' },
								],
							}}
						>
							<Blocks.Features
								doc={{
									features: [
										{ b: 'Гарантована безпека' },
										{ span: ['Підтримка ', { b: 'двох мов' }, ' (UK/EN)'] },
										{ i: 'Роботизований аналіз ризиків' },
									],
								}}
								{...sharedProps}
							/>
						</Example>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  CONTENT                                           */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-content"
						title="Blocks.Content"
						description="Основний контент. Підтримує всі HTML-теги через nano2html: заголовки, параграфи, таблиці, списки."
					>
						<Example
							label="Списки з автоформатом (ul/ol)"
							jsxCode={`<Blocks.Content doc={{\n  content: [\n    { h5: "Вимоги до позичальника:" },\n    { ul: [\n      "Вік від 21 до 65 років",\n      "Громадянство України",\n      "Стаж роботи від 6 місяців"\n    ]},\n    { h5: "Порядок оформлення:" },\n    { ol: [\n      "Подати заявку онлайн",\n      "Отримати рішення",\n      "Підписати договір"\n    ]}\n  ]\n}} />`}
							yamlCode={{
								$content: ['Content'],
								content: [
									{ h5: 'Вимоги до позичальника:' },
									{
										ul: [
											'Вік від 21 до 65 років',
											'Громадянство України',
											'Стаж роботи від 6 місяців',
										],
									},
									{ h5: 'Порядок оформлення:' },
									{ ol: ['Подати заявку онлайн', 'Отримати рішення', 'Підписати договір'] },
								],
							}}
						>
							<Blocks.Content
								doc={{
									content: [
										{ h5: 'Вимоги до позичальника:' },
										{
											ul: [
												'Вік від 21 до 65 років',
												'Громадянство України',
												'Стаж роботи від 6 місяців',
											],
										},
										{ h5: 'Порядок оформлення:' },
										{
											ol: ['Подати заявку онлайн', 'Отримати рішення', 'Підписати договір'],
										},
									],
								}}
								{...sharedProps}
							/>
						</Example>

						<Example
							label="Заголовки, таблиці та форматування"
							jsxCode={`<Blocks.Content doc={{\n  content: [\n    { h5: "Заголовок H5" },\n    { table: [\n      { thead: [{ tr: [{ th: "Назва" }, { th: "Тариф" }, { th: "Строк" }] }] },\n      { tbody: [\n        { tr: [{ td: "Ощадний" }, { td: "12%" }, { td: "12 міс" }] },\n        { tr: [{ td: "Накопичувальний" }, { td: "14%" }, { td: "24 міс" }] }\n      ] }\n    ]}\n  ]\n}} />`}
							yamlCode={{
								$content: ['Content'],
								content: [
									{ h5: 'Заголовок H5' },
									{
										table: [
											{ thead: [{ tr: [{ th: 'Назва' }, { th: 'Тариф' }, { th: 'Строк' }] }] },
											{
												tbody: [
													{ tr: [{ td: 'Ощадний' }, { td: '12%' }, { td: '12 міс' }] },
													{ tr: [{ td: 'Накопичувальний' }, { td: '14%' }, { td: '24 міс' }] },
												],
											},
										],
									},
								],
							}}
						>
							<Blocks.Content
								doc={{
									content: [
										{ h5: 'Заголовок H5' },
										{
											table: [
												{ thead: [{ tr: [{ th: 'Назва' }, { th: 'Тариф' }, { th: 'Строк' }] }] },
												{
													tbody: [
														{ tr: [{ td: 'Ощадний' }, { td: '12%' }, { td: '12 міс' }] },
														{ tr: [{ td: 'Накопичувальний' }, { td: '14%' }, { td: '24 міс' }] },
													],
												},
											],
										},
									],
								}}
								{...sharedProps}
							/>
						</Example>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  ACCORDION                                         */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-accordion"
						title="Blocks.Accordion"
						description="Інтерактивний акордеон (Bootstrap JS collapse). Два формати: { q, a } або { title, content }."
					>
						<Example
							label="Акордеон Q&A"
							jsxCode={`<Blocks.Accordion doc={{\n  accordion: [\n    { q: "Як відкрити рахунок?", a: "Звертайтесь у відділення." },\n    { q: "Чи є додаток?", a: "Так, для iOS." }\n  ]\n}} />`}
							yamlCode={{
								$content: ['Accordion'],
								accordion: [
									{ q: 'Як відкрити рахунок?', a: 'Звертайтесь у відділення.' },
									{ q: 'Чи є додаток?', a: 'Так, для iOS.' },
								],
							}}
						>
							<Blocks.Accordion
								doc={{
									accordion: [
										{ q: 'Як відкрити рахунок?', a: 'Звертайтесь у відділення.' },
										{ q: 'Чи є додаток?', a: 'Так, для iOS.' },
									],
								}}
							/>
						</Example>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  FILES                                             */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-files"
						title="Blocks.Files"
						description={`Блок завантаження контенту (Files). Можна передавати масив рядків: Markdown-формат "[Назва](URL)" або просто URL.`}
					>
						<Example
							label="Прості рядки Markdown та звичайні посилання"
							jsxCode={`<Blocks.Files \n  locale={locale}\n  doc={{\n    files: [\n      "[Тарифи банку (PDF)](/tariffs.pdf)",\n      "https://example.com/document.pdf"\n    ]\n  }}\n/>`}
							yamlCode={{
								$content: ['Files'],
								files: ['[Тарифи банку (PDF)](/tariffs.pdf)', 'https://example.com/document.pdf'],
							}}
						>
							<Blocks.Files
								locale={locale}
								doc={{
									files: ['[Тарифи банку (PDF)](/tariffs.pdf)', 'https://example.com/document.pdf'],
								}}
							/>
						</Example>

						<Example
							label="Як об'єкт (href/name/src/title)"
							jsxCode={`<Blocks.Files \n  locale={locale}\n  title="Договори"\n  doc={{\n    files: [\n      { href: "/contract.pdf", name: "Типовий договір" }\n    ]\n  }}\n/>`}
							yamlCode={{
								$content: ['Files'],
								files: [{ href: '/contract.pdf', name: 'Типовий договір' }],
							}}
						>
							<Blocks.Files
								locale={locale}
								title="Договори"
								doc={{
									files: [{ href: '/contract.pdf', name: 'Типовий договір' }],
								}}
							/>
						</Example>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  PRICE                                             */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-price"
						title="Blocks.Price"
						description={`Блок ціни. Лейбл локалізовано ("${locale === 'uk' ? 'Ціна' : 'Price'}").`}
					>
						<Example
							label="Грошова сума"
							jsxCode={`<Blocks.Price locale={locale} doc={{ price: "1 500 000.00 ₴" }} />`}
							yamlCode={{ $content: ['Price'], price: '1 500 000.00 ₴' }}
						>
							<Blocks.Price locale={locale} doc={{ price: '1 500 000.00 ₴' }} />
						</Example>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  CONTRACT                                          */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-contract"
						title="Blocks.Contract"
						description={`Документ-регламент з навігацією. Використовуй 'id' для генерації меню.`}
					>
						<Example
							label="Повний регламент (3 розділи + навігатор)"
							jsxCode={`<Blocks.Contract \n  locale={locale}\n  doc={{\n    $docNavigator: { text: "Перейти до розділу" },\n    contract: [\n      { id: "general", title: "1. Загальні положення", content: [{ p: "Текст положення 1." }] },\n      { id: "rights", title: "2. Права та обов'язки", content: [{ p: "Текст обов'язків." }] },\n      { id: "terms", title: "3. Строки та умови", content: [{ p: "Договір на 12 місяців." }] }\n    ]\n  }}\n/>`}
							yamlCode={{
								$content: ['Contract'],
								$docNavigator: { text: 'Перейти до розділу' },
								contract: [
									{
										id: 'general',
										title: '1. Загальні положення',
										content: [{ p: 'Текст положення 1.' }],
									},
									{
										id: 'rights',
										title: "2. Права та обов'язки",
										content: [{ p: "Текст обов'язків." }],
									},
									{
										id: 'terms',
										title: '3. Строки та умови',
										content: [{ p: 'Договір на 12 місяців.' }],
									},
								],
							}}
						>
							<Blocks.Contract
								locale={locale}
								doc={{
									$docNavigator: { text: 'Перейти до розділу' },
									contract: [
										{
											id: 'general',
											title: '1. Загальні положення',
											content: [{ p: 'Текст положення 1.' }],
										},
										{
											id: 'rights',
											title: "2. Права та обов'язки",
											content: [{ p: "Текст обов'язків." }],
										},
										{
											id: 'terms',
											title: '3. Строки та умови',
											content: [{ p: 'Договір на 12 місяців.' }],
										},
									],
								}}
								{...sharedProps}
							/>
						</Example>

						<Example
							label="Без навігатора (тільки друк)"
							jsxCode={`<Blocks.Contract \n  locale={locale}\n  doc={{\n    contract: [\n      { id: "general", title: "1. Загальні положення", content: [{ p: "Текст положення 1." }] },\n      { id: "rights", title: "2. Права та обов'язки", content: [{ p: "Текст обов'язків." }] },\n      { id: "terms", title: "3. Строки та умови", content: [{ p: "Договір на 12 місяців." }] }\n    ]\n  }}\n/>`}
							yamlCode={{
								$content: ['Contract'],
								contract: [
									{
										id: 'general',
										title: '1. Загальні положення',
										content: [{ p: 'Текст положення 1.' }],
									},
									{
										id: 'rights',
										title: "2. Права та обов'язки",
										content: [{ p: "Текст обов'язків." }],
									},
									{
										id: 'terms',
										title: '3. Строки та умови',
										content: [{ p: 'Договір на 12 місяців.' }],
									},
								],
							}}
						>
							<Blocks.Contract
								locale={locale}
								doc={{
									contract: [
										{
											id: 'general',
											title: '1. Загальні положення',
											content: [{ p: 'Текст положення 1.' }],
										},
										{
											id: 'rights',
											title: "2. Права та обов'язки",
											content: [{ p: "Текст обов'язків." }],
										},
										{
											id: 'terms',
											title: '3. Строки та умови',
											content: [{ p: 'Договір на 12 місяців.' }],
										},
									],
								}}
								{...sharedProps}
							/>
						</Example>
					</BlockSection>
				</div>
			</div>
		</div>
	)
}
