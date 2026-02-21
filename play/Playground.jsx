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
							jsxCode={`<Blocks.Description doc={{ description: locale === 'uk' ? "Короткий опис сторінки" : "Short page description" }} />`}
							yamlCode={{
								$content: ['Description'],
								description: locale === 'uk' ? 'Короткий опис сторінки' : 'Short page description',
							}}
						>
							<Blocks.Description
								doc={{
									description:
										locale === 'uk' ? 'Короткий опис сторінки' : 'Short page description',
								}}
							/>
						</Example>

						<Example
							label="Довгий підзаголовок (HTML & entities)"
							jsxCode={`<Blocks.Description doc={{ description: locale === 'uk' ? "Цей блок відображає опис або <br/> підзаголовок &amp; сторінки." : "This block displays the description or <br/> subtitle &amp; of the page." }} />`}
							yamlCode={{
								$content: ['Description'],
								description:
									locale === 'uk'
										? 'Цей блок відображає опис або <br/> підзаголовок &amp; сторінки.'
										: 'This block displays the description or <br/> subtitle &amp; of the page.',
							}}
						>
							<Blocks.Description
								doc={{
									description:
										locale === 'uk'
											? 'Цей блок відображає опис або <br/> підзаголовок &amp; сторінки.'
											: 'This block displays the description or <br/> subtitle &amp; of the page.',
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
						description="Вступний текст (excerpt). Масив nano-вузлів. Форматування через nano2html підтримує теги a, span, b, i, тощо."
					>
						<Example
							label="Один абзац"
							jsxCode={`<Blocks.Excerpt doc={{\n  excerpt: [{ p: locale === 'uk' ? "Простий вступний абзац без форматування." : "Simple intro paragraph without formatting." }]\n}} />`}
							yamlCode={{
								$content: ['Excerpt'],
								excerpt: [
									{
										p:
											locale === 'uk'
												? 'Простий вступний абзац без форматування.'
												: 'Simple intro paragraph without formatting.',
									},
								],
							}}
						>
							<Blocks.Excerpt
								doc={{
									excerpt: [
										{
											p:
												locale === 'uk'
													? 'Простий вступний абзац без форматування.'
													: 'Simple intro paragraph without formatting.',
										},
									],
								}}
								{...sharedProps}
							/>
						</Example>

						<Example
							label="Форматований текст (Bold, Italic, Спрощені Посилання)"
							jsxCode={`<Blocks.Excerpt doc={{\n  excerpt: [\n    { p: [\n      locale === 'uk' ? "Цей текст містить " : "This text contains ",\n      { b: locale === 'uk' ? "жирний" : "bold" },\n      ", ",\n      { i: locale === 'uk' ? "курсив" : "italic" },\n      locale === 'uk' ? " та " : " and ",\n      /* ЗВЕРНИ УВАГУ: атрибути передаються плоским ключем $ */\n      { a: locale === 'uk' ? "посилання" : "link", $href: "#" },\n      "."\n    ] }\n  ]\n}} />`}
							yamlCode={{
								$content: ['Excerpt'],
								excerpt: [
									{
										p: [
											locale === 'uk' ? 'Цей текст містить ' : 'This text contains ',
											{ b: locale === 'uk' ? 'жирний' : 'bold' },
											', ',
											{ i: locale === 'uk' ? 'курсив' : 'italic' },
											locale === 'uk' ? ' та ' : ' and ',
											{ a: locale === 'uk' ? 'посилання' : 'link', $href: '#' },
											'.',
										],
									},
								],
							}}
						>
							<Blocks.Excerpt
								doc={{
									excerpt: [
										{
											p: [
												locale === 'uk' ? 'Цей текст містить ' : 'This text contains ',
												{ b: locale === 'uk' ? 'жирний' : 'bold' },
												', ',
												{ i: locale === 'uk' ? 'курсив' : 'italic' },
												locale === 'uk' ? ' та ' : ' and ',
												{ a: locale === 'uk' ? 'посилання' : 'link', $href: '#' },
												'.',
											],
										},
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
							jsxCode={`<Blocks.Features doc={{\n  features: [\n    locale === 'uk' ? "Безкоштовне обслуговування" : "Free maintenance",\n    locale === 'uk' ? "Онлайн-підтримка 24/7" : "24/7 online support"\n  ]\n}} />`}
							yamlCode={{
								$content: ['Features'],
								features: [
									locale === 'uk' ? 'Безкоштовне обслуговування' : 'Free maintenance',
									locale === 'uk' ? 'Онлайн-підтримка 24/7' : '24/7 online support',
								],
							}}
						>
							<Blocks.Features
								doc={{
									features: [
										locale === 'uk' ? 'Безкоштовне обслуговування' : 'Free maintenance',
										locale === 'uk' ? 'Онлайн-підтримка 24/7' : '24/7 online support',
									],
								}}
								{...sharedProps}
							/>
						</Example>

						<Example
							label="З HTML-форматуванням"
							jsxCode={`<Blocks.Features doc={{\n  features: [\n    { b: locale === 'uk' ? "Гарантована безпека" : "Guaranteed security" },\n    { span: [locale === 'uk' ? "Підтримка " : "Support for ", { b: locale === 'uk' ? "двох мов" : "two languages" }, " (UK/EN)"] }\n  ]\n}} />`}
							yamlCode={{
								$content: ['Features'],
								features: [
									{ b: locale === 'uk' ? 'Гарантована безпека' : 'Guaranteed security' },
									{
										span: [
											locale === 'uk' ? 'Підтримка ' : 'Support for ',
											{ b: locale === 'uk' ? 'двох мов' : 'two languages' },
											' (UK/EN)',
										],
									},
								],
							}}
						>
							<Blocks.Features
								doc={{
									features: [
										{ b: locale === 'uk' ? 'Гарантована безпека' : 'Guaranteed security' },
										{
											span: [
												locale === 'uk' ? 'Підтримка ' : 'Support for ',
												{ b: locale === 'uk' ? 'двох мов' : 'two languages' },
												' (UK/EN)',
											],
										},
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
							label="Списки з автоформатом (ul/ol автоматично обгортають рядки у li)"
							jsxCode={`<Blocks.Content doc={{\n  content: [\n    { h5: locale === 'uk' ? "Вимоги до позичальника:" : "Requirements:" },\n    { ul: [\n      locale === 'uk' ? "Вік від 21 до 65 років" : "Age 21 to 65",\n      locale === 'uk' ? "Стаж роботи від 6 місяців" : "Work experience 6+ months"\n    ]}\n  ]\n}} />`}
							yamlCode={{
								$content: ['Content'],
								content: [
									{ h5: locale === 'uk' ? 'Вимоги до позичальника:' : 'Requirements:' },
									{
										ul: [
											locale === 'uk' ? 'Вік від 21 до 65 років' : 'Age 21 to 65',
											locale === 'uk' ? 'Стаж роботи від 6 місяців' : 'Work experience 6+ months',
										],
									},
									{ h5: locale === 'uk' ? 'Порядок оформлення:' : 'Procedure:' },
									{
										ol: [
											locale === 'uk' ? 'Подати заявку онлайн' : 'Apply online',
											locale === 'uk' ? 'Отримати рішення' : 'Get decision',
										],
									},
								],
							}}
						>
							<Blocks.Content
								doc={{
									content: [
										{ h5: locale === 'uk' ? 'Вимоги до позичальника:' : 'Requirements:' },
										{
											ul: [
												locale === 'uk' ? 'Вік від 21 до 65 років' : 'Age 21 to 65',
												locale === 'uk' ? 'Стаж роботи від 6 місяців' : 'Work experience 6+ months',
											],
										},
										{ h5: locale === 'uk' ? 'Порядок оформлення:' : 'Procedure:' },
										{
											ol: [
												locale === 'uk' ? 'Подати заявку онлайн' : 'Apply online',
												locale === 'uk' ? 'Отримати рішення' : 'Get decision',
											],
										},
									],
								}}
								{...sharedProps}
							/>
						</Example>

						<Example
							label="Таблиця за замовчуванням (клас таблиці автоматично table-striped table-hover)"
							jsxCode={`<Blocks.Content doc={{\n  content: [\n    { \n      table: {\n        thead: [{ tr: [locale === 'uk' ? "Назва" : "Name", locale === 'uk' ? "Тариф" : "Rate"] }],\n        tbody: [\n          { tr: [locale === 'uk' ? "Стандарт" : "Standard", "10%"] }\n        ]\n      }\n    }\n  ]\n}} />`}
							yamlCode={{
								$content: ['Content'],
								content: [
									{
										table: {
											thead: [
												{
													tr: [
														locale === 'uk' ? 'Назва' : 'Name',
														locale === 'uk' ? 'Тариф' : 'Rate',
													],
												},
											],
											tbody: [{ tr: [locale === 'uk' ? 'Стандарт' : 'Standard', '10%'] }],
										},
									},
								],
							}}
						>
							<Blocks.Content
								doc={{
									content: [
										{
											table: {
												thead: [
													{
														tr: [
															{ th: locale === 'uk' ? 'Назва' : 'Name' },
															{ th: locale === 'uk' ? 'Тариф' : 'Rate' },
														],
													},
												],
												tbody: [{ tr: [locale === 'uk' ? 'Стандарт' : 'Standard', '10%'] }],
											},
										},
									],
								}}
								{...sharedProps}
							/>
						</Example>

						<Example
							label="Складна таблиця з кастомним класом"
							jsxCode={`<Blocks.Content doc={{\n  content: [\n    { h5: locale === 'uk' ? "Таблиця з кастомним класом" : "Table with custom class" },\n    { \n      table: {\n        thead: [{ tr: [locale === 'uk' ? "Назва" : "Name", locale === 'uk' ? "Тариф" : "Rate"] }],\n        tbody: [\n          { tr: [locale === 'uk' ? "Ощадний" : "Savings", "12%"] },\n          { tr: [locale === 'uk' ? "Накопичувальний" : "Accumulative", "14%"] }\n        ]\n      },\n      $class: "table table-dark table-striped mt-3"\n    }\n  ]\n}} />`}
							yamlCode={{
								$content: ['Content'],
								content: [
									{
										h5: locale === 'uk' ? 'Таблиця з кастомним класом' : 'Table with custom class',
									},
									{
										table: {
											thead: [
												{
													tr: [
														locale === 'uk' ? 'Назва' : 'Name',
														locale === 'uk' ? 'Тариф' : 'Rate',
													],
												},
											],
											tbody: [
												{ tr: [locale === 'uk' ? 'Ощадний' : 'Savings', '12%'] },
												{ tr: [locale === 'uk' ? 'Накопичувальний' : 'Accumulative', '14%'] },
											],
										},
										$class: 'table table-dark table-striped mt-3',
									},
								],
							}}
						>
							<Blocks.Content
								doc={{
									content: [
										{
											h5:
												locale === 'uk' ? 'Таблиця з кастомним класом' : 'Table with custom class',
										},
										{
											table: {
												thead: [
													{
														tr: [
															{ th: locale === 'uk' ? 'Назва' : 'Name' },
															{ th: locale === 'uk' ? 'Тариф' : 'Rate' },
														],
													},
												],
												tbody: [
													// We can either pass objects {td: ...} or simply strings because we implemented auto wrapper!
													{ tr: [locale === 'uk' ? 'Ощадний' : 'Savings', '12%'] },
													{ tr: [locale === 'uk' ? 'Накопичувальний' : 'Accumulative', '14%'] },
												],
											},
											$class: 'table table-dark table-striped mt-3',
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
							jsxCode={`<Blocks.Accordion doc={{\n  accordion: [\n    { q: locale === 'uk' ? "Як відкрити рахунок?" : "How to open an account?", a: locale === 'uk' ? "Звертайтесь у відділення." : "Please visit a branch." },\n    { q: locale === 'uk' ? "Чи є додаток?" : "Is there an app?", a: locale === 'uk' ? "Так, для iOS." : "Yes, for iOS." }\n  ]\n}} />`}
							yamlCode={{
								$content: ['Accordion'],
								accordion: [
									{
										q: locale === 'uk' ? 'Як відкрити рахунок?' : 'How to open an account?',
										a: locale === 'uk' ? 'Звертайтесь у відділення.' : 'Please visit a branch.',
									},
									{
										q: locale === 'uk' ? 'Чи є додаток?' : 'Is there an app?',
										a: locale === 'uk' ? 'Так, для iOS.' : 'Yes, for iOS.',
									},
								],
							}}
						>
							<Blocks.Accordion
								doc={{
									accordion: [
										{
											q: locale === 'uk' ? 'Як відкрити рахунок?' : 'How to open an account?',
											a: locale === 'uk' ? 'Звертайтесь у відділення.' : 'Please visit a branch.',
										},
										{
											q: locale === 'uk' ? 'Чи є додаток?' : 'Is there an app?',
											a: locale === 'uk' ? 'Так, для iOS.' : 'Yes, for iOS.',
										},
									],
								}}
							/>
						</Example>

						<Example
							label="Акордеон з HTML"
							jsxCode={`<Blocks.Accordion doc={{\n  accordion: [\n    { \n      title: locale === 'uk' ? "Комісії та тарифи" : "Fees and limits", \n      content: locale === 'uk' ? "Комісія становить <strong class='text-danger'>5%</strong> без ліміту." : "Fee is <strong class='text-danger'>5%</strong> no limits." \n    }\n  ]\n}} />`}
							yamlCode={{
								$content: ['Accordion'],
								accordion: [
									{
										title: locale === 'uk' ? 'Комісії та тарифи' : 'Fees and limits',
										content:
											locale === 'uk'
												? "Комісія становить <strong class='text-danger'>5%</strong> без ліміту."
												: "Fee is <strong class='text-danger'>5%</strong> no limits.",
									},
								],
							}}
						>
							<Blocks.Accordion
								doc={{
									accordion: [
										{
											title: locale === 'uk' ? 'Комісії та тарифи' : 'Fees and limits',
											content:
												locale === 'uk'
													? "Комісія становить <strong class='text-danger'>5%</strong> без ліміту."
													: "Fee is <strong class='text-danger'>5%</strong> no limits.",
										},
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
						description={`Блок завантаження контенту (Files). Беремо baseName для голих URL.`}
					>
						<Example
							label="Markdown посилання та голі URL (BaseName)"
							jsxCode={`<Blocks.Files \n  locale={locale}\n  doc={{\n    files: [\n      locale === 'uk' ? "[Тарифи банку (PDF)](/tariffs.pdf)" : "[Bank Tariffs (PDF)](/tariffs.pdf)",\n      "https://example.com/legal_document_v2.pdf"\n    ]\n  }}\n/>`}
							yamlCode={{
								$content: ['Files'],
								files: [
									locale === 'uk'
										? '[Тарифи банку (PDF)](/tariffs.pdf)'
										: '[Bank Tariffs (PDF)](/tariffs.pdf)',
									'https://example.com/legal_document_v2.pdf',
								],
							}}
						>
							<Blocks.Files
								locale={locale}
								doc={{
									files: [
										locale === 'uk'
											? '[Тарифи банку (PDF)](/tariffs.pdf)'
											: '[Bank Tariffs (PDF)](/tariffs.pdf)',
										'https://example.com/legal_document_v2.pdf',
									],
								}}
							/>
						</Example>

						<Example
							label="Як об'єкт (перевизначення назви блоку через filesTitle)"
							jsxCode={`<Blocks.Files \n  locale={locale}\n  doc={{\n    filesTitle: locale === 'uk' ? "Договори" : "Contracts",\n    files: [\n      { href: "/contract.pdf", name: locale === 'uk' ? "Типовий договір" : "Standard contract" }\n    ]\n  }}\n/>`}
							yamlCode={{
								$content: ['Files'],
								filesTitle: locale === 'uk' ? 'Договори' : 'Contracts',
								files: [
									{
										href: '/contract.pdf',
										name: locale === 'uk' ? 'Типовий договір' : 'Standard contract',
									},
								],
							}}
						>
							<Blocks.Files
								locale={locale}
								doc={{
									filesTitle: locale === 'uk' ? 'Договори' : 'Contracts',
									files: [
										{
											href: '/contract.pdf',
											name: locale === 'uk' ? 'Типовий договір' : 'Standard contract',
										},
									],
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
						description={`Блок ціни. Рендерить текстові значення або об'єкти (з value/currency).`}
					>
						<Example
							label="Текстовий формат (Безкоштовно)"
							jsxCode={`<Blocks.Price locale={locale} doc={{ price: locale === 'uk' ? 'Безкоштовно' : 'Free of charge' }} />`}
							yamlCode={{
								$content: ['Price'],
								price: locale === 'uk' ? 'Безкоштовно' : 'Free of charge',
							}}
						>
							<Blocks.Price
								locale={locale}
								doc={{ price: locale === 'uk' ? 'Безкоштовно' : 'Free of charge' }}
							/>
						</Example>

						<Example
							label="В об'єкті з літерним кодом (USD, EUR...)"
							jsxCode={`<Blocks.Price \n  locale={locale} \n  doc={{\n    price: { value: "1 500", currency: "USD" }\n  }} \n/>`}
							yamlCode={{ $content: ['Price'], price: { value: '1 500', currency: 'USD' } }}
						>
							<Blocks.Price locale={locale} doc={{ price: { value: '1 500', currency: 'USD' } }} />
						</Example>

						<Example
							label="В об'єкті з символом валюти ($)"
							jsxCode={`<Blocks.Price \n  locale={locale} \n  doc={{\n    price: { value: "1 500", currency: "$" }\n  }} \n/>`}
							yamlCode={{ $content: ['Price'], price: { value: '1 500', currency: '$' } }}
						>
							<Blocks.Price locale={locale} doc={{ price: { value: '1 500', currency: '$' } }} />
						</Example>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  CONTRACT                                          */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-contract"
						title="Blocks.Contract"
						description={`Документ-регламент з навігацією (якщо передано $docNavigator) або без навігації.`}
					>
						<Example
							label="Повний регламент (з навігатором)"
							jsxCode={`<Blocks.Contract \n  locale={locale}\n  doc={{\n    $docNavigator: { text: locale === 'uk' ? "Перейти до розділу" : "Jump to section" },\n    contract: [\n      { id: "general", title: locale === 'uk' ? "1. Загальні положення" : "1. General terms", content: [{ p: locale === 'uk' ? "Текст положення 1." : "Term text 1." }] },\n      { id: "rights", title: locale === 'uk' ? "2. Права та обов'язки" : "2. Rights & Duties", content: [{ p: locale === 'uk' ? "Текст обов'язків." : "Duties text." }] },\n    ]\n  }}\n/>`}
							yamlCode={{
								$content: ['Contract'],
								$docNavigator: { text: locale === 'uk' ? 'Перейти до розділу' : 'Jump to section' },
								contract: [
									{
										id: 'general',
										title: locale === 'uk' ? '1. Загальні положення' : '1. General terms',
										content: [{ p: locale === 'uk' ? 'Текст положення 1.' : 'Term text 1.' }],
									},
									{
										id: 'rights',
										title: locale === 'uk' ? "2. Права та обов'язки" : '2. Rights & Duties',
										content: [{ p: locale === 'uk' ? "Текст обов'язків." : 'Duties text.' }],
									},
								],
							}}
						>
							<Blocks.Contract
								locale={locale}
								doc={{
									$docNavigator: {
										text: locale === 'uk' ? 'Перейти до розділу' : 'Jump to section',
									},
									contract: [
										{
											id: 'general',
											title: locale === 'uk' ? '1. Загальні положення' : '1. General terms',
											content: [{ p: locale === 'uk' ? 'Текст положення 1.' : 'Term text 1.' }],
										},
										{
											id: 'rights',
											title: locale === 'uk' ? "2. Права та обов'язки" : '2. Rights & Duties',
											content: [{ p: locale === 'uk' ? "Текст обов'язків." : 'Duties text.' }],
										},
									],
								}}
								{...sharedProps}
							/>
						</Example>

						<Example
							label="Без навігатора (Загальні положення)"
							jsxCode={`<Blocks.Contract \n  locale={locale}\n  doc={{\n    contract: [\n      { id: "simple", title: locale === 'uk' ? "Цей договір не має меню навігації" : "This contract has no navigation menu", content: [{ p: "..." }] }\n    ]\n  }}\n/>`}
							yamlCode={{
								$content: ['Contract'],
								contract: [
									{
										id: 'simple',
										title:
											locale === 'uk'
												? 'Цей договір не має меню навігації'
												: 'This contract has no navigation menu',
										content: [{ p: '...' }],
									},
								],
							}}
						>
							<Blocks.Contract
								locale={locale}
								doc={{
									contract: [
										{
											id: 'simple',
											title:
												locale === 'uk'
													? 'Цей договір не має меню навігації'
													: 'This contract has no navigation menu',
											content: [{ p: '...' }],
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
