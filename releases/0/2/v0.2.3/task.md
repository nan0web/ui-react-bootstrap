# Реліз v0.2.3

[English](./task.en.md) | [Українська](./task.md)

## Місія
- Видалити всі залежності `workspace:*` з `package.json`.
- Замінити їх на актуальні npm версії.

## Acceptance Criteria
- Об'єкти `dependencies`, `devDependencies` та `peerDependencies` в `package.json` більше не містять `workspace:*`.

## Architecture Audit (Чекліст)
- [x] Чи прочитано Індекси екосистеми? 
- [x] Чи існують аналоги в пакетах? 
- [x] Джерела даних: json (package.json)
- [x] Чи відповідає UI-стандарту (Deep Linking)? 
