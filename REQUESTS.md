# Requests

## SortableList — Bootstrap Sortable List Component

**Target**: `src/components/SortableList.jsx`
**Status**: DONE
**Date**: 2026-02-16
**Depends on**: `@nan0web/ui-react` — `useSortableList()` hook
**Origin**: `@industrialbank/branches` — AI Chat model selector (v2.1.1)

**Problem**:
The branches app has a model reorder component with Bootstrap styling (rounded borders, badges, ↑↓ buttons).
This visual pattern should be a standard Bootstrap component for any sortable list use case.

**Required Component** (`<SortableList>`):

```jsx
import { SortableList } from '@nan0web/ui-react-bootstrap'
;<SortableList
  items={models}
  renderItem={(item, idx) => (
    <>
      <span className="font-monospace">{item.id}</span>
      {item.deprecated && <Badge bg="warning">deprecated</Badge>}
      <span className="text-muted small">{item.size}</span>
    </>
  )}
  onReorder={(newOrder) => setModels(newOrder)}
  persist="cerebras_model_order"
/>
```

**Features**:

- Uses `useSortableList()` from `@nan0web/ui-react` internally
- Bootstrap-styled list items with `rounded`, `border`, `bg-body` classes
- ↑↓ arrow buttons (`FaArrowUp`/`FaArrowDown` from react-icons)
- Numbered items (1., 2., 3.)
- `renderItem` prop for custom content per item
- `persist` prop for localStorage auto-save
- Smooth `animate-in` transitions
- Disabled state for edge items (first ↑, last ↓)

**Visual Reference**: Screenshot from `@industrialbank/branches` chat settings:

```
┌──────────────────────────────────────────────┐
│ ⚙ Моделі (послідовність)                    │
│                                              │
│  1. qwen-3-32b              32B    ↑  ↓     │
│  2. llama-3.3-70b [deprecated] 70B  ↑  ↓     │
│  3. gpt-oss-120b            120B   ↑  ↓     │
│  4. zai-glm-4.7             ~10B   ↑  ↓     │
│  5. llama3.1-8b             8B     ↑  ↓     │
└──────────────────────────────────────────────┘
```

**Reference Implementation**: `apps/@/industrialbank/branches/src/ui-react-bootstrap/App.jsx` (lines ~520-550, chat settings panel model reorder block).

---

## Фаза 2: Макетні та Універсальні Блоки

Згідно з `UNIVERSAL_BLOCKS_SPEC.md`, наступні стандартні компоненти не мають банківської специфіки і повинні бути реалізовані в `@nan0web/ui-react-bootstrap`.

### Blocks.SearchWidget — Універсальний Пошук

**Target**: `src/components/SearchWidget.jsx` (або `src/Blocks/Search.jsx`)
**Status**: DONE
**Date**: 2026-02-21
**Origin**: Legacy Bank Shell (`themes/industrialbank/views/_/modal/search.ejs`, `src/components/SearchModal.jsx`)
**Problem**:
Історично банк мав пошук з результатами. Необхідно зробити універсальний `SearchWidget` (виклик модального вікна з результатами або inline пошук), який рендериться стандартно в Bootstrap і отримує результати пошуку через `props`.

### Layout.Nav — Верхня Навігація

**Target**: `src/Blocks/Nav.jsx`
**Status**: DONE
**Problem**:
Рендерить меню (navbar) на основі AST дерева `$nav`. Підтримує випадаючі списки та мобільний "гамбургер". Має замінити монолітний `ShellHeader`.

### Layout.Sidebar — Бокове Меню

**Target**: `src/Blocks/Sidebar.jsx`
**Status**: DONE
**Problem**:
Рендерить деревоподібне бокове меню (наприклад, для документації або складних розділів) на основі `$sidebar`.

### Blocks.Callout — Блоки Уваги (Alerts)

**Target**: `src/Blocks/Callout.jsx`
**Status**: DONE
**Problem**:
Блок для Warning, Info, Tip. Мапиться на Bootstrap `Alert` (`alert-info`, `alert-warning` тощо) на основі `$callout.type`.

### Blocks.Markdown — Рендер Прози

**Target**: `src/Blocks/Markdown.jsx`
**Status**: DONE
**Problem**:
Очищений контейнер для виводу Markdown-контенту, який був попередньо згенерований (або генерується на льоту) у HTML.

### Control.ThemeToggle та Control.LangSelect — Перемикачі

**Target**: `src/Blocks/ThemeToggle.jsx`, `src/Blocks/LangSelect.jsx`
**Status**: DONE
**Problem**:
Стандартизовані віджети для зміни `data-bs-theme` (День/Ніч) та зміни локалі `$locale`.

### Layout.Page — Головний Макет (Layout)

**Target**: `src/Blocks/Page.jsx`
**Status**: DONE
**Problem**:
Структурний макет (Skeleton), який може включати `Nav`, `Sidebar` та обгортати основний `$content` (Main). Виконує роль контейнера для складної верстки аркуша.

---

## Фаза 3: Інтеграція та Мобільна Адаптація (Next Actions)

Наступні кроки для подальшої роботи:

1. **Mobile Navigation (`Playground.jsx`)**
   **Status**: DONE
   **Target**: `apps/@/industrialbank/shared` (or UI Playground)
   **Problem**: Бокове меню (Sidebar) зараз зникає на мобільних пристроях, унеможливлюючи навігацію та зміну теми. Необхідно реалізувати повноцінну мобільну версію (наприклад, використовуючи `Offcanvas` меню `Bootstrap` або togglable overlay).

2. **SearchWidget Оптимізація**
   **Target**: `src/Blocks/Search.jsx`
   **Problem**: Подальша оптимізація та вдосконалення компонента пошуку в реальному часі (якщо потрібно для продуктиву).

3. **Інтеграція Мікро-додатків (Micro-apps Integration)**
   **Target**: `apps/@/industrialbank/*`
   **Problem**: Почати інтеграцію цих фіналізованих OLMUI блоків (Фази 2) у реальні додатки (наприклад, `SandboxApp`, `branches`). Замінити кастомні компоненти в додатках на стандартизовані `Blocks` з `ui-react-bootstrap`.

> **З чого почати наступний чат (Корінь MonoRepo):**
>
> 1. Зайти в корінь `nan.web`
> 2. Запустити AI з промптом: _"Починаємо Фазу 3 з REQUESTS.md (пакет ui-react-bootstrap): потрібно реалізувати мобільний Sidebar для Playground."_

---

## Header SCSS — Архітектурна Міграція (Єдине Джерело Правди)

**Target**: `src/components/organisms/Header/Header.v2.scss`
**Status**: IN PROGRESS
**Date**: 2026-02-24
**Priority**: HIGH
**Origin**: Рада Мудреців — аналіз двовладдя стилів (bank session 23.02.2026)
**Depends on**: `@industrialbank/bank/src/styles/scss/_/_header.scss`

### Проблема

Стилі навігації розкидані по **двох пакетах**:

```
bank/src/styles/scss/_/_header.scss          ← ~580 рядків SCSS
  └─ subnav position, arrow ▼, .active, overlap fix, auto-show

ui-react-bootstrap/Header/Header.v2.scss     ← ~244 рядки SCSS
  └─ subnav position (інші класи!), .show, search modal
```

Результат:

- **Мерехтіння** при наведенні (конфлікт `:hover` та `:has(.show)`)
- **Стрілка ▼** працює лише при кліку (`.show`), не для `.active` (activePath)
- **Дублювання**: `top: 85px` vs `top: 4.375rem`, `height: 45px` vs `height: 2.5rem`
- Зміна у одному місці **ламає** інше

### Принцип (Рада Мудреців)

> **Один компонент = один SCSS.**
> `Header.v2.scss` володіє структурою.
> Тема лише фарбує через CSS Custom Properties.

### Поточна архітектура (двовладдя ❌)

```
[bank/_header.scss] ──position:absolute──┐
                                          ├──▶ DOM: header.root ──▶ Конфлікт!
[Header.v2.scss]   ──position:absolute──┘
```

### Цільова архітектура (один правитель ✅)

```
[Header.v2.scss]   ──структура + var(--header-*)──▶ DOM: header.root
                          ▲
[bank/_vars.scss]  ──────┘ (лише кольори/розміри)
```

### CSS Custom Properties Interface

`Header.v2.scss` має використовувати змінні з fallback на дефолтні значення:

```scss
// Header.v2.scss — СТРУКТУРА (master)
header.root {
  nav.navbar {
    min-height: var(--header-nav-height, 85px);

    &::after {
      height: var(--header-subnav-height, 45px);
      background-color: var(--header-subnav-bg, #{$primary});
    }
  }

  // Arrow ▼ for BOTH .show (click) and .active (activePath)
  ul.navbar-nav > li {
    > a.dropdown-toggle.show,
    &.active > a.dropdown-toggle {
      position: relative;
      color: var(--header-active-color, #{$primary});
      border-bottom-color: var(--header-active-color, #{$primary});

      &::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-top: 0.5rem solid var(--header-active-color, #{$primary});
        transform: translateX(-50%);
        pointer-events: none;
      }
    }

    // Auto-show subnav for active section
    &.active > ul.dropdown-menu {
      display: flex !important;
      margin-top: 0;
    }
  }

  // Overlap fix: hide auto-active subnav when another is opened
  ul.navbar-nav:has(> li > ul.show) > li.active > ul.dropdown-menu:not(.show) {
    display: none !important;
  }

  // Subnav items styling
  ul.navbar-nav > li > ul > li {
    > a.active,
    &.active > a {
      background-color: var(--header-subnav-active-bg, rgba(255, 255, 255, 0.22));
      font-weight: bold;
      border-radius: 0.25rem;
    }
  }
}
```

Банківська тема лише визначає значення:

```scss
// bank/scss/_vars.scss — ТЕМА (slave)
:root {
  --header-nav-height: 4.375rem;
  --header-subnav-height: 2.5rem;
  --header-subnav-bg: #{$primary}; // #1471d1
  --header-active-color: #{$primary};
  --header-subnav-active-bg: rgba(255, 255, 255, 0.22);
}
```

### Правила міграції

`bank/_header.scss` **ЗАЛИШАЄ** (банк-специфічне):

- `.signin` (авторизація)
- `.info`, `.contacts`, `.social` (контакти в мобільному меню)
- `.search` (кнопка/форма пошуку)
- `#headerNavbar > ul.navbar-nav > li > div.dropdown-menu` (React fix для div-обгортки)
- Mobile collapse стилі

`bank/_header.scss` **ВИДАЛЯЄ** (переноситься в Header.v2.scss):

- `nav.navbar::after` (синя плашка)
- `ul.navbar-nav > li > .nav-link` (стилі 1-го рівня)
- `a.dropdown-toggle.show::before` (стрілка ▼)
- `&.active > a.dropdown-toggle` (active стрілка)
- `> ul` (2-й рівень позиціонування)
- `> ul > li > a` (2-й рівень пункти)
- Auto-show for `.active`
- Overlap fix (`:has(.show)`)

### Етапи виконання

1. [x] Оновити `Header.v2.scss` — додати CSS Custom Properties + active/overlap логіку
2. [x] OlmuiInspector: HeaderStyles.js з `defaultDark` + Export Modal
3. [ ] Оновити `bank/scss/_vars.scss` — додати `--header-*` змінні
4. [ ] Прибрати дубльовані правила з `bank/scss/_/_header.scss`
5. [ ] Перевірити Playground (`localhost:3000/play/index.html#comp-shell-header`)
6. [ ] Перевірити production site (`localhost:3000/uk/`)
7. [ ] E2E тести: `pnpm run test:e2e`
8. [ ] Видалити legacy файли:
   - `bank/src/styles/nav-overrides.css`
   - `bank/src/styles/industrialbank/index.css` (необов'язково, як backup)

### Тести для валідації

```
✓ Active arrow visible for programmatic .active (via activePath)
✓ Active arrow visible on manual .show (click)
✓ Subnav auto-shows for active section
✓ Subnav hidden when another dropdown opened
✓ No flickering on hover between nav items
✓ 2nd-level active item highlighted
✓ Mobile: collapse works, subnav accessible
✓ Dark mode: bar and items styled correctly
```

---

## OlmuiInspector — Universal Visual Style Inspector

**Target**: `play/components/OlmuiInspector.jsx`
**Status**: DONE (Phase 5)
**Date**: 2026-02-24
**Origin**: OLMUI (One Logic, Many UI) — visual debugging & theme customization

### Problem

Developers and designers need a way to visually tweak CSS Custom Properties in real-time
without editing SCSS/CSS files manually. The inspector should support any component
via a schema class (Model as Schema pattern).

### Implemented Features

- **StylesClass Schema**: Static class properties define CSS variables with metadata (`help`, `alias`, `default`, `defaultDark`, `units`, `options`, `min`, `max`, `step`, `control`)
- **Auto-detected controls**: SizeControl, SelectControl, ColorAlphaPicker, SpacingControl, ShadowControl, BorderControl
- **Dual theme CSS**: Generates `<style>` block with `:root` and `[data-bs-theme="dark"]` scopes; dark block includes only variables that differ from light
- **Undo/Reset**: Up to 50 history steps with `useEffect` sync on all controls; inline Reset confirmation
- **Export Modal**: Copy-to-clipboard with CSS Variables or JSON format toggle
- **onUpdate prop**: External state integration callback for Share App / db-browser
- **localStorage persistence**: State saved per StylesClass name

---

## 🚨 Оптимізація та Zero Hardcode (Від credits)

**Target**: `src/components/organisms/Header`, `src/components/molecules/Blog`, `play/Playground.jsx`
**Status**: DONE
**Date**: 2026-03-10

**Problem**:
Згідно з архітектурними принципами (Model-as-Schema, Zero Hardcode, Data-Driven UI):

1. В таких компонентах як `Header` або `Blog` були зашиті "fallback" URL-шляхи для логотипів (наприклад, `/img/logo.png` чи `/img/logo-uk.svg`). Всі подібні активи повинні надходити виключно через `props` або схему (`data`), інакше додатки без цих файлів отримують 404 руйнуючи UI. Вимагається прибрати внутрішній хардкод банківських активів з універсального пакету `ui-react-bootstrap`.
2. Playground повинен споживати виключно оброблені дані у форматі JSON (`Data-Driven UI`), а не сирі YAML файли (бо фронтенд не має залежати від `js-yaml` в production/dev серверах). Це було частково адаптовано, але треба уникати регресії та підтримувати fallback для `parseComponentYaml` у тестах (якщо треба). Оновити архітектуру.
