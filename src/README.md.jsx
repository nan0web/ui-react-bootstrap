/* eslint-disable no-unused-vars */
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import FS from '@nan0web/db-fs'
import fsNative from 'node:fs'
import { fileURLToPath } from 'node:url'
import { DatasetParser, DocsParser } from '@nan0web/test'
import { NoConsole } from '@nan0web/log'
import { UIProvider, renderers, UIContextValue, BootstrapTheme } from './index.jsx'

/** @typedef {import('react').ComponentType<{ element?: any, context: any, [key: string]: any }>} Renderer */

/** @type {Renderer} */
const RenderButton = /** @type {any} */(renderers.get('button'))
/** @type {Renderer} */
const RenderTreeView = /** @type {any} */(renderers.get('tree'))
/** @type {Renderer} */
const RenderAutocomplete = /** @type {any} */(renderers.get('autocomplete'))

const testContext = new UIContextValue({ renderers, theme: BootstrapTheme })

const fs = new FS()
let pkg = {}

beforeAll(async () => {
    try {
        pkg = await fs.loadDocument('package.json', {})
    } catch { }
})

//
// documentation generation source.
//
function testRender() {
    /**
     * @docs
     * # @nan0web/ui-react-bootstrap
     *
     * Bootstrap integration for the Nan0web ecosystem.
     * Combines declarative UI logic with the power of React Bootstrap.
     *
     * ## Description
     *
     * This package provides a set of renderers and components that map the Nan0web UI standard
     * to Bootstrap classes and components.
     *
     * ## Installation
     *
     * ```bash
     * pnpm add @nan0web/ui-react-bootstrap
     * ```
     */
    it('Should have correct package name', () => {
        expect(pkg.name).toBe('@nan0web/ui-react-bootstrap')
    })

    /**
     * @docs
     * ## Components
     *
     * ### TreeView
     *
     * Hierarchical data visualization styled with Bootstrap ListGroup.
     */
    it('Should render Bootstrap TreeView', async () => {
        const data = [
            { name: 'Root', type: 'dir', children: [{ name: 'Child', type: 'file' }] }
        ]
        render(
            <UIProvider value={testContext}>
                <RenderTreeView element={{ tree: data }} context={testContext} />
            </UIProvider>
        )
        expect(screen.getByText('Root')).toBeDefined()
        fireEvent.click(screen.getByText('Root'))
        expect(screen.getByText('Child')).toBeDefined()

        // Collapse
        fireEvent.click(screen.getByText('Root'))
        expect(screen.queryByText('Child')).toBeNull()
    })

    it('Should support multi-selection in Bootstrap TreeView', async () => {
        const data = [{ name: 'file1', type: 'file' }, { name: 'file2', type: 'file' }]
        render(
            <UIProvider value={testContext}>
                <RenderTreeView element={{ tree: data, mode: 'multi' }} context={testContext} />
            </UIProvider>
        )
        const check = screen.getAllByRole('checkbox')[0]
        fireEvent.click(check)
        expect(check).toBeChecked()
    })

    /**
     * @docs
     * ### Autocomplete
     *
     * Searchable dropdown using Bootstrap Form controls.
     */
    it('Should render Bootstrap Autocomplete', async () => {
        const options = ['Red', 'Green', 'Blue']
        render(
            <UIProvider value={testContext}>
                <RenderAutocomplete element={{ options, placeholder: 'Pick color' }} context={testContext} />
            </UIProvider>
        )
        const input = screen.getByPlaceholderText('Pick color')
        expect(input).toBeDefined()
        fireEvent.change(input, { target: { value: 're' } })
        expect(await screen.findByText('Red')).toBeDefined()
    })
}

describe('README.md testing', testRender)

describe('Rendering README.md', async () => {
    const parser = new DocsParser()
    const __filename = fileURLToPath(import.meta.url)
    const fnString = fsNative.readFileSync(__filename, 'utf8')
    const text = String(parser.decode(fnString))

    it('Generated README title', async () => {
        expect(text).toContain('# @nan0web/ui-react-bootstrap')
    })

    it('Generate dataset and README.md', async () => {
        const dataset = DatasetParser.parse(text, pkg.name)
        await fs.saveDocument('.datasets/README.dataset.jsonl', dataset)
        await fs.saveDocument('README.md', text)
    })
})
