# План для наступного контексту (OlmuiInspector Phase 6)

## ✅ Опубліковано v0.2.0 (npm) — 2026-02-24

### Досягнення Phase 5

1. **Dual CSS `<style>` block**: Інспектор генерує `<style>` з двома скоупами (`.olmui-preview-{id}` для light і `[data-bs-theme="dark"] .olmui-preview-{id}` для dark). Тема працює нативно.
2. **`defaultDark`** поля додані до `HeaderStyles.js` (bg, shadow, navLinkColor, activeColor, langBg, langBorder, langShadow, subnavBg, subnavLinkColor, dropdownBg, dropdownShadow).
3. **`onUpdate` prop**: Інспектор експортує `onUpdate` callback для зовнішнього збереження (Share App / db-browser).
4. **SpacingControl**: unit selector (rem/px/em/%) для кожного side-інпуту (T/R/B/L).
5. **Reset**: Inline підтвердження «Скинути? ✓ Так / ✕» — без `window.confirm()` мерехтіння. Undo-лічильник обнулюється.
6. **Undo sync**: Всі контролі мають `useEffect(() => {...}, [value])` для синхронізації state ↔ props під час Undo.
7. **Dark theme fix**: `.logo-brand`, `.search-btn` → `var(--header-nav-link-color)` замість хардкодженого `$dark`.
8. **SelectControl layout**: `flex-column` — label зверху, контрол знизу; текст не обрізується.
9. **BorderControl**: Комплексний контроль для `border` (width + unit, style, ColorAlphaPicker). Використовується через `control: 'border'` у мета.
10. **Subnav Offset**: `--header-subnav-offset` + `calc()` у SCSS для позиціонування підменю.
11. **Export Modal**: Bootstrap Modal з перемикачем 🎨 CSS Variables / 📦 JSON State. Dark-блок містить лише змінні, що відрізняються від light.
12. **Секція "Кнопка входу"**: Видалена зі схеми HeaderStyles (btn\* поля). Стилі кнопки залишаються через Bootstrap `variant="outline-primary"`.
13. **README.md**: Повна документація всіх компонентів (EN + UK в `docs/uk/README.md`). DocsParser: `expect(` додано до stops.
14. **Якість**: CHANGELOG.md, knip.json, `test:all` скрипт (test + build + e2e + knip). 13 тестових помилок виправлено.
15. **npm**: `files` оптимізовано (86KB → 62KB packed). SortableList: прибрано дублікат default export.

## Наступні кроки (Phase 6)

1. **Рефакторинг сітки інспектора**:
   - `flex-basis` / `min-width` на кожен контрол для кращого розподілу простору.

2. **Інтеграція Inspector State у Share App**:
   - Пов'язати `onUpdate` з `update()` API або `db-browser`.

3. **Typography Control**:
   - `TypographyControl` для `font-family` (Google Fonts: Inter, Roboto, Poppins, system-ui), `font-weight`, `letter-spacing`, `line-height`.
   - Окрема секція або окрема `TypographyStyles` класа.

4. **Import стилів**:
   - Імпорт JSON назад у інспектор через Upload або Paste.

5. **Header SCSS міграція**:
   - Завершити об'єднання `bank/_header.scss` → `Header.v2.scss` (єдине джерело правди). Див. REQUESTS.md.

**Інструкція для старту:**
Зверніть увагу на `OlmuiInspector.jsx` у `play/components` та `HeaderStyles.js` як на джерела істини (Source of Truth).
