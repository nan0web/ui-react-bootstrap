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
