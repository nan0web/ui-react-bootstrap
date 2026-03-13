# Release v0.2.3

## Scope
- Remove all `workspace:*` dependencies from `package.json`.
- Replace them with the actual latest npm versions.

## Acceptance Criteria
- `package.json` `dependencies`, `devDependencies`, and `peerDependencies` no longer mention `workspace:*`.

## Architecture Audit (Checklist)
- [x] Чи прочитано Індекси екосистеми? (N/A)
- [x] Чи існують аналоги в пакетах? (N/A)
- [x] Джерела даних: YAML, nano, md, json, csv? (package.json)
- [x] Чи відповідає UI-стандарту (Deep Linking)? (N/A)
