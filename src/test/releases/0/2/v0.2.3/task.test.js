import { describe, it } from 'node:test';
import { equal, deepEqual } from 'node:assert/strict';
import fs from 'node:fs';

describe('package.json', () => {
    it('не повинен містити workspace:*', () => {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
        
        const allDeps = {
            ...pkg.dependencies,
            ...pkg.devDependencies,
            ...pkg.peerDependencies
        };

        const workspaceDeps = Object.entries(allDeps).filter(([_, version]) => version === 'workspace:*');

        deepEqual(workspaceDeps, []);
    });

    it('повинен мати актуальні версії для внутрішніх пакетів (@nan0web/*)', () => {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
        equal(pkg.devDependencies['@nan0web/core'], '^1.0.5');
        equal(pkg.dependencies['@nan0web/ui-core'], '^1.0.0');
    });
});
