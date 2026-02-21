import React, { useState } from 'react'
import { Renderer, Blocks } from '../src/index.jsx'
import yaml from 'js-yaml'

function Example({ label, children, code, isYaml }) {
	const formatted = isYaml ? yaml.dump(code, { indent: 2, noRefs: true, flowLevel: -1 }) : code
	return (
		<div className="mb-4">
			{label && <h6 className="text-muted text-uppercase small fw-semibold mb-2">{label}</h6>}
			<div className="card border-0 shadow-sm">
				<div className="card-body bg-white">{children}</div>
				<div className="card-footer bg-dark border-0 p-3">
					<pre
						className="mb-0 text-white"
						style={{ fontSize: '0.8rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}
					>
						{formatted}
					</pre>
				</div>
			</div>
		</div>
	)
}

function BlockSection({ id, title, description, children }) {
	return (
		<div id={id} className="mb-5 pb-4 border-bottom">
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
			style={{ minHeight: '100vh', backgroundColor: '#f5f7fa', paddingBottom: '70px' }}
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
				<div className="bg-white shadow-sm border-bottom py-3 px-3 px-md-4 mb-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
					<div>
						<h1 className="fw-bold mb-0 h3">Каталог Блоків OLMUI</h1>
						<p className="text-muted small mb-0 mt-1">
							Інтерактивна Пісочниця: <code>Renderer</code>, <code>Blocks.*</code>, Model as Schema.
						</p>
					</div>
					<button className="btn btn-outline-primary fw-bold px-4" onClick={toggleLocale}>
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
						<div className="row g-4">
							<div className="col-lg-6">
								<Example
									label="Простий текст"
									code={`<Blocks.Description page={{ description: "Короткий опис сторінки" }} />`}
								>
									<Blocks.Description page={{ description: 'Короткий опис сторінки' }} />
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="Довгий підзаголовок"
									code={`<Blocks.Description page={{ description: "Цей блок відображає опис або підзаголовок сторінки. Він підтримує довгі описи з різними символами та &amp; HTML entities." }} />`}
								>
									<Blocks.Description
										page={{
											description:
												'Цей блок відображає опис або підзаголовок сторінки. Він підтримує довгі описи з різними символами та HTML entities.',
										}}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="Model as Schema (YAML)"
									isYaml
									code={{ $content: ['Description'], description: 'Підзаголовок через YAML-схему' }}
								>
									<Renderer
										page={{
											$content: ['Description'],
											description: 'Підзаголовок через YAML-схему',
										}}
										locale={locale}
									/>
								</Example>
							</div>
						</div>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  EXCERPT                                           */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-excerpt"
						title="Blocks.Excerpt"
						description="Вступний текст (excerpt). Масив nano-вузлів. Підтримує форматування через вбудований renderItem."
					>
						<div className="row g-4">
							<div className="col-lg-6">
								<Example
									label="Один абзац"
									code={`<Blocks.Excerpt page={{\n  excerpt: [{ p: "Простий вступний абзац без форматування." }]\n}} />`}
								>
									<Blocks.Excerpt
										page={{ excerpt: [{ p: 'Простий вступний абзац без форматування.' }] }}
										{...sharedProps}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="Форматований текст (Bold, Italic, Link)"
									code={`<Blocks.Excerpt page={{\n  excerpt: [\n    { p: ["Цей текст містить ", { b: "жирний" }, ", ", { i: "курсив" }, " та ", { a: { $href: "#", _: "посилання" } }, "."] },\n    { p: "Другий абзац для демонстрації відступів." }\n  ]\n}} />`}
								>
									<Blocks.Excerpt
										page={{
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
							</div>
							<div className="col-lg-6">
								<Example
									label="Model as Schema (YAML)"
									isYaml
									code={{
										$content: ['Excerpt'],
										excerpt: [
											{ p: ['Вступний текст з ', { b: 'жирним' }, ' через YAML.'] },
											{ p: 'Другий абзац.' },
										],
									}}
								>
									<Renderer
										page={{
											$content: ['Excerpt'],
											excerpt: [
												{ p: ['Вступний текст з ', { b: 'жирним' }, ' через YAML.'] },
												{ p: 'Другий абзац.' },
											],
										}}
										locale={locale}
									/>
								</Example>
							</div>
						</div>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  FEATURES                                          */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-features"
						title="Blocks.Features"
						description="Список переваг/фіч з іконками-галочками. Елементи: рядки або nano-вузли з форматуванням."
					>
						<div className="row g-4">
							<div className="col-lg-6">
								<Example
									label="Прості рядки"
									code={`<Blocks.Features page={{\n  features: [\n    "Безкоштовне обслуговування",\n    "Онлайн-підтримка 24/7",\n    "Без комісії за переказ"\n  ]\n}} />`}
								>
									<Blocks.Features
										page={{
											features: [
												'Безкоштовне обслуговування',
												'Онлайн-підтримка 24/7',
												'Без комісії за переказ',
											],
										}}
										{...sharedProps}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="З HTML-форматуванням"
									code={`<Blocks.Features page={{\n  features: [\n    { b: "Гарантована безпека" },\n    ["Підтримка ", { b: "двох мов" }, " (UK/EN)"],\n    { i: "Роботизований аналіз ризиків" }\n  ]\n}} />`}
								>
									<Blocks.Features
										page={{
											features: [
												{ b: 'Гарантована безпека' },
												['Підтримка ', { b: 'двох мов' }, ' (UK/EN)'],
												{ i: 'Роботизований аналіз ризиків' },
											],
										}}
										{...sharedProps}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="Довгий список (6 елементів)"
									code={`<Blocks.Features page={{\n  features: [\n    "Мобільний додаток",\n    "Apple Pay / Google Pay",\n    "Безконтактні платежі",\n    "P2P перекази",\n    "Кешбек до 5%",\n    "Преміальна підтримка"\n  ]\n}} />`}
								>
									<Blocks.Features
										page={{
											features: [
												'Мобільний додаток',
												'Apple Pay / Google Pay',
												'Безконтактні платежі',
												'P2P перекази',
												'Кешбек до 5%',
												'Преміальна підтримка',
											],
										}}
										{...sharedProps}
									/>
								</Example>
							</div>
						</div>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  CONTENT                                           */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-content"
						title="Blocks.Content"
						description="Основний контент. Підтримує всі HTML-теги через nano2html: заголовки, параграфи, таблиці, списки, розділювачі."
					>
						<div className="row g-4">
							<div className="col-lg-6">
								<Example
									label="Заголовки та параграфи"
									code={`<Blocks.Content page={{\n  content: [\n    { h3: "Заголовок H3" },\n    { p: "Параграф тексту під заголовком." },\n    { h4: "Підзаголовок H4" },\n    { p: "Ще один параграф." }\n  ]\n}} />`}
								>
									<Blocks.Content
										page={{
											content: [
												{ h3: 'Заголовок H3' },
												{ p: 'Параграф тексту під заголовком.' },
												{ h4: 'Підзаголовок H4' },
												{ p: 'Ще один параграф.' },
											],
										}}
										{...sharedProps}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="Таблиця (класи додаються автоматично)"
									code={`<Blocks.Content page={{\n  content: [\n    { table: {\n      thead: [{ tr: [{ th: "Назва" }, { th: "Тариф" }, { th: "Строк" }] }],\n      tbody: [\n        { tr: [{ td: "Ощадний" }, { td: "12%" }, { td: "12 міс" }] },\n        { tr: [{ td: "Накопичувальний" }, { td: "14%" }, { td: "24 міс" }] }\n      ]\n    }}\n  ]\n}} />`}
								>
									<Blocks.Content
										page={{
											content: [
												{
													table: {
														thead: [{ tr: [{ th: 'Назва' }, { th: 'Тариф' }, { th: 'Строк' }] }],
														tbody: [
															{ tr: [{ td: 'Ощадний' }, { td: '12%' }, { td: '12 міс' }] },
															{ tr: [{ td: 'Накопичувальний' }, { td: '14%' }, { td: '24 міс' }] },
														],
													},
												},
											],
										}}
										{...sharedProps}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="Списки (ul/ol)"
									code={`<Blocks.Content page={{\n  content: [\n    { h5: "Вимоги до позичальника:" },\n    { ul: [\n      { li: "Вік від 21 до 65 років" },\n      { li: "Громадянство України" },\n      { li: "Стаж роботи від 6 місяців" }\n    ]},\n    { h5: "Порядок оформлення:" },\n    { ol: [\n      { li: "Подати заявку онлайн" },\n      { li: "Отримати рішення (до 30 хвилин)" },\n      { li: "Підписати договір" }\n    ]}\n  ]\n}} />`}
								>
									<Blocks.Content
										page={{
											content: [
												{ h5: 'Вимоги до позичальника:' },
												{
													ul: [
														{ li: 'Вік від 21 до 65 років' },
														{ li: 'Громадянство України' },
														{ li: 'Стаж роботи від 6 місяців' },
													],
												},
												{ h5: 'Порядок оформлення:' },
												{
													ol: [
														{ li: 'Подати заявку онлайн' },
														{ li: 'Отримати рішення (до 30 хвилин)' },
														{ li: 'Підписати договір' },
													],
												},
											],
										}}
										{...sharedProps}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="Розділювач, посилання та жирний текст"
									code={`<Blocks.Content page={{\n  content: [\n    { p: ["Зверніться до ", { a: { $href: "tel:+380123456789", _: "+380 12 345 67 89" } }, " для консультації."] },\n    { hr: true },\n    { p: { $class: "alert alert-info", _: "ℹ️ Це повідомлення зі стилем Bootstrap alert." } }\n  ]\n}} />`}
								>
									<Blocks.Content
										page={{
											content: [
												{
													p: [
														'Зверніться до ',
														{ a: { $href: 'tel:+380123456789', _: '+380 12 345 67 89' } },
														' для консультації.',
													],
												},
												{ hr: true },
												{
													p: {
														$class: 'alert alert-info',
														_: 'ℹ️ Це повідомлення зі стилем Bootstrap alert.',
													},
												},
											],
										}}
										{...sharedProps}
									/>
								</Example>
							</div>
						</div>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  ACCORDION                                         */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-accordion"
						title="Blocks.Accordion"
						description="Інтерактивний акордеон (Bootstrap JS collapse). Два формати: { q, a } або { title, content }. Підтримує HTML в body."
					>
						<div className="row g-4">
							<div className="col-lg-6">
								<Example
									label="Формат Q&A (питання та відповіді)"
									code={`<Blocks.Accordion page={{\n  accordion: [\n    { q: "Як відкрити рахунок?", a: "Звертайтесь у найближче відділення з паспортом та ІПН." },\n    { q: "Який мінімальний вклад?", a: "Від 500 грн для ощадних і від 10 000 грн для депозитних програм." },\n    { q: "Чи є мобільний додаток?", a: "Так, доступний для iOS і Android." }\n  ]\n}} />`}
								>
									<Blocks.Accordion
										page={{
											accordion: [
												{
													q: 'Як відкрити рахунок?',
													a: 'Звертайтесь у найближче відділення з паспортом та ІПН.',
												},
												{
													q: 'Який мінімальний вклад?',
													a: 'Від 500 грн для ощадних і від 10 000 грн для депозитних програм.',
												},
												{ q: 'Чи є мобільний додаток?', a: 'Так, доступний для iOS і Android.' },
											],
										}}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="Формат title/content з HTML"
									code={`<Blocks.Accordion page={{\n  accordion: [\n    { title: "Умови кредитування", content: "<strong>Ставка:</strong> від 0.01% річних.<br/>Строк: від 1 до 60 місяців." },\n    { title: "Необхідні документи", content: "<ul><li>Паспорт</li><li>ІПН</li><li>Довідка про доходи</li></ul>" }\n  ]\n}} />`}
								>
									<Blocks.Accordion
										page={{
											accordion: [
												{
													title: 'Умови кредитування',
													content:
														'<strong>Ставка:</strong> від 0.01% річних.<br/>Строк: від 1 до 60 місяців.',
												},
												{
													title: 'Необхідні документи',
													content:
														'<ul><li>Паспорт</li><li>ІПН</li><li>Довідка про доходи</li></ul>',
												},
											],
										}}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="Model as Schema (YAML)"
									isYaml
									code={{
										$content: ['Accordion'],
										accordion: [
											{ q: 'Як це працює?', a: 'Через єдиний Renderer та Model as Schema.' },
											{ title: 'Чи це безкоштовно?', content: 'Так, повністю.' },
										],
									}}
								>
									<Renderer
										page={{
											$content: ['Accordion'],
											accordion: [
												{ q: 'Як це працює?', a: 'Через єдиний Renderer та Model as Schema.' },
												{ title: 'Чи це безкоштовно?', content: 'Так, повністю.' },
											],
										}}
										locale={locale}
									/>
								</Example>
							</div>
						</div>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  FILES                                             */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-files"
						title="Blocks.Files"
						description={`Секція документів. Заголовок задається через проп title (по замовчуванню: "${locale === 'uk' ? 'Документи' : 'Documents'}"). Зовнішні посилання та .pdf відкриваються в новій вкладці.`}
					>
						<div className="row g-4">
							<div className="col-lg-6">
								<Example
									label="Стандартне використання (без title)"
									code={`<Blocks.Files \n  locale={locale}\n  page={{\n    files: [\n      { href: "/tariffs.pdf", name: "Тарифи банку (PDF)" },\n      { href: "/license.pdf", name: "Ліцензія НБУ" }\n    ]\n  }}\n/>`}
								>
									<Blocks.Files
										locale={locale}
										page={{
											files: [
												{ href: '/tariffs.pdf', name: 'Тарифи банку (PDF)' },
												{ href: '/license.pdf', name: 'Ліцензія НБУ' },
											],
										}}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="З кастомним заголовком (title prop)"
									code={`<Blocks.Files \n  locale={locale}\n  title="${locale === 'uk' ? 'Договори та регламенти' : 'Agreements & Regulations'}"\n  page={{\n    files: [\n      { href: "/contract.pdf", name: "${locale === 'uk' ? 'Типовий договір' : 'Standard Contract'}" },\n      { href: "https://bank.gov.ua", title: "${locale === 'uk' ? 'Регулятор (НБУ)' : 'Regulator (NBU)'}" },\n      { href: "/rules.pdf", name: "${locale === 'uk' ? 'Правила обслуговування' : 'Service Rules'}" }\n    ]\n  }}\n/>`}
								>
									<Blocks.Files
										locale={locale}
										title={locale === 'uk' ? 'Договори та регламенти' : 'Agreements & Regulations'}
										page={{
											files: [
												{
													href: '/contract.pdf',
													name: locale === 'uk' ? 'Типовий договір' : 'Standard Contract',
												},
												{
													href: 'https://bank.gov.ua',
													title: locale === 'uk' ? 'Регулятор (НБУ)' : 'Regulator (NBU)',
												},
												{
													href: '/rules.pdf',
													name: locale === 'uk' ? 'Правила обслуговування' : 'Service Rules',
												},
											],
										}}
									/>
								</Example>
							</div>
						</div>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  PRICE                                             */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-price"
						title="Blocks.Price"
						description={`Блок ціни. Лейбл локалізовано ("${locale === 'uk' ? 'Ціна' : 'Price'}"). Натисни кнопку мови зверху, щоб перевірити.`}
					>
						<div className="row g-4">
							<div className="col-lg-4">
								<Example
									label="Безкоштовно"
									code={`<Blocks.Price locale="${locale}" page={{ price: "${locale === 'uk' ? 'Безкоштовно' : 'Free'}" }} />`}
								>
									<Blocks.Price
										locale={locale}
										page={{ price: locale === 'uk' ? 'Безкоштовно' : 'Free' }}
									/>
								</Example>
							</div>
							<div className="col-lg-4">
								<Example
									label="Грошова сума"
									code={`<Blocks.Price locale="${locale}" page={{ price: "1 500 000.00 ₴" }} />`}
								>
									<Blocks.Price locale={locale} page={{ price: '1 500 000.00 ₴' }} />
								</Example>
							</div>
							<div className="col-lg-4">
								<Example
									label="Валюта (USD)"
									code={`<Blocks.Price locale="${locale}" page={{ price: "$99.99 / ${locale === 'uk' ? 'міс' : 'mo'}" }} />`}
								>
									<Blocks.Price
										locale={locale}
										page={{ price: `$99.99 / ${locale === 'uk' ? 'міс' : 'mo'}` }}
									/>
								</Example>
							</div>
						</div>
					</BlockSection>

					{/* ═══════════════════════════════════════════════════ */}
					{/*  CONTRACT                                          */}
					{/* ═══════════════════════════════════════════════════ */}
					<BlockSection
						id="block-contract"
						title="Blocks.Contract"
						description={`Документ-регламент з навігацією по розділах (dropdown) та кнопкою друку ("${locale === 'uk' ? 'Друкувати документ' : 'Print document'}"). Перемкни мову для перевірки.`}
					>
						<div className="row g-4">
							<div className="col-12">
								<Example
									label="Повний приклад з 3 розділами"
									code={`<Blocks.Contract \n  locale="${locale}"\n  page={{\n    $pageNavigator: { text: "${locale === 'uk' ? 'Перейти до розділу' : 'Go to section'}" },\n    contract: [\n      { id: "general", title: "1. ${locale === 'uk' ? 'Загальні положення' : 'General Provisions'}", content: [{ p: "${locale === 'uk' ? 'Цей договір регулює відносини між Банком та Клієнтом.' : 'This agreement governs relations between the Bank and the Client.'}" }] },\n      { id: "rights", title: "2. ${locale === 'uk' ? "Права та обов'язки" : 'Rights and Obligations'}", content: [{ p: "${locale === 'uk' ? "Банк зобов'язується надавати послуги відповідно до умов договору." : 'The Bank commits to providing services according to the terms.'}" }] },\n      { id: "terms", title: "3. ${locale === 'uk' ? 'Строки та умови' : 'Terms and Conditions'}", content: [{ p: "${locale === 'uk' ? 'Договір укладається строком на 12 місяців з дати підписання.' : 'The agreement is concluded for 12 months from the date of signing.'}" }] }\n    ]\n  }}\n/>`}
								>
									<Blocks.Contract
										locale={locale}
										page={{
											$pageNavigator: {
												text: locale === 'uk' ? 'Перейти до розділу' : 'Go to section',
											},
											contract: [
												{
													id: 'general',
													title:
														locale === 'uk' ? '1. Загальні положення' : '1. General Provisions',
													content: [
														{
															p:
																locale === 'uk'
																	? 'Цей договір регулює відносини між Банком та Клієнтом.'
																	: 'This agreement governs relations between the Bank and the Client.',
														},
													],
												},
												{
													id: 'rights',
													title:
														locale === 'uk' ? "2. Права та обов'язки" : '2. Rights and Obligations',
													content: [
														{
															p:
																locale === 'uk'
																	? "Банк зобов'язується надавати послуги відповідно до умов договору."
																	: 'The Bank commits to providing services according to the terms.',
														},
													],
												},
												{
													id: 'terms',
													title: locale === 'uk' ? '3. Строки та умови' : '3. Terms and Conditions',
													content: [
														{
															p:
																locale === 'uk'
																	? 'Договір укладається строком на 12 місяців з дати підписання.'
																	: 'The agreement is concluded for 12 months from the date of signing.',
														},
													],
												},
											],
										}}
										{...sharedProps}
									/>
								</Example>
							</div>
							<div className="col-lg-6">
								<Example
									label="Без навігатора (тільки друк)"
									code={`<Blocks.Contract locale="${locale}" page={{\n  contract: [\n    { id: "s1", title: "${locale === 'uk' ? 'Умови' : 'Terms'}", content: [{ p: "${locale === 'uk' ? 'Текст розділу.' : 'Section text.'}" }] }\n  ]\n}} />`}
								>
									<Blocks.Contract
										locale={locale}
										page={{
											contract: [
												{
													id: 's1',
													title: locale === 'uk' ? 'Умови' : 'Terms',
													content: [{ p: locale === 'uk' ? 'Текст розділу.' : 'Section text.' }],
												},
											],
										}}
										{...sharedProps}
									/>
								</Example>
							</div>
						</div>
					</BlockSection>
				</div>
			</div>
		</div>
	)
}
