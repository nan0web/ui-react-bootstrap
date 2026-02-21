# Requests

## SortableList — Bootstrap Sortable List Component

**Target**: `src/components/SortableList.jsx`
**Status**: NEW
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
**Status**: NEW
**Date**: 2026-02-21
**Origin**: Legacy Bank Shell (`themes/industrialbank/views/_/modal/search.ejs`, `src/components/SearchModal.jsx`)
**Problem**:
Історично банк мав пошук з результатами. Необхідно зробити універсальний `SearchWidget` (виклик модального вікна з результатами або inline пошук), який рендериться стандартно в Bootstrap і отримує результати пошуку через `props`.

### Blocks.Nav — Верхня Навігація

**Target**: `src/Blocks/Nav.jsx`
**Status**: NEW
**Problem**:
Рендерить меню (navbar) на основі AST дерева `$nav`. Підтримує випадаючі списки та мобільний "гамбургер". Має замінити монолітний `ShellHeader`.

### Blocks.Sidebar — Бокове Меню

**Target**: `src/Blocks/Sidebar.jsx`
**Status**: NEW
**Problem**:
Рендерить деревоподібне бокове меню (наприклад, для документації або складних розділів) на основі `$sidebar`.

### Blocks.Callout — Блоки Уваги (Alerts)

**Target**: `src/Blocks/Callout.jsx`
**Status**: NEW
**Problem**:
Блок для Warning, Info, Tip. Мапиться на Bootstrap `Alert` (`alert-info`, `alert-warning` тощо) на основі `$callout.type`.

### Blocks.Markdown — Рендер Прози

**Target**: `src/Blocks/Markdown.jsx`
**Status**: NEW
**Problem**:
Очищений контейнер для виводу Markdown-контенту, який був попередньо згенерований (або генерується на льоту) у HTML.

### Blocks.ThemeToggle та Blocks.LangSelect — Перемикачі

**Target**: `src/Blocks/ThemeToggle.jsx`, `src/Blocks/LangSelect.jsx`
**Status**: NEW
**Problem**:
Стандартизовані віджети для зміни `data-bs-theme` (День/Ніч) та зміни локалі `$locale`.

### Blocks.Page — Головний Макет (Layout)

**Target**: `src/Blocks/Page.jsx`
**Status**: NEW
**Problem**:
Структурний макет (Skeleton), який може включати `Nav`, `Sidebar` та обгортати основний `$content` (Main). Виконує роль контейнера для складної верстки аркуша.
