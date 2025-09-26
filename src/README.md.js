import { describe, it, before } from "node:test"
import assert from "node:assert/strict"
import FS from "@nan0web/db-fs"
import { NoConsole } from "@nan0web/log"
import { DatasetParser, DocsParser } from "@nan0web/test"
import { components, UIReact, BootstrapTheme } from "./index.js"

const fs = new FS()
let pkg

before(async () => {
  const doc = await fs.loadDocument("package.json", {})
  pkg = doc || {}
})

function docs() {
  /**
   * @docs
   * # @nan0web/ui-react-bootstrap
   *
   * Bootstrap integration for declarative UI.
   *
   * ## Installation
   */
  it("How to install?", () => {
    /**
     * ```bash
     * pnpm add @nan0web/ui-react-bootstrap react-bootstrap bootstrap
     * ```
     */
    assert.equal(pkg.name, "@nan0web/ui-react-bootstrap")
  })

  /**
   * @docs
   * ## Usage
   */
  it("How to use Bootstrap Button?", () => {
    //import { Button } from '@nan0web/ui-react-bootstrap'
    const button = <Button variant="primary">Click</Button>
    assert.ok(button)
  })

  /**
   * @docs
   * ## API
   */
  it("Bootstrap theme integration", () => {
    //import { getUserTheme, BootstrapTheme } from '@nan0web/ui-react-bootstrap'
    const theme = getUserTheme('bootstrap')
    assert.equal(theme, BootstrapTheme)
  })
}

describe("README.md testing", docs)

describe("Rendering README.md", async () => {
  const parser = new DocsParser()
  const text = String(parser.decode(docs))
  await fs.saveDocument("README.md", text)
  const dataset = DatasetParser.parse(text, pkg.name)
  await fs.saveDocument(".datasets/README.dataset.jsonl", dataset)

  it("document is rendered", async () => {
    const saved = await fs.loadDocument("README.md")
    assert.ok(saved.includes("## API"))
  })
})