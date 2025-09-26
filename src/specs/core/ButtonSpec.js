import Spec from './Spec.js'

/**
 * @class ButtonSpec
 * @description Bootstrap Button spec with variants and sizes
 * @property {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'} variant - Button color variant @default 'primary'
 * @property {'sm' | 'md' | 'lg'} size - Button size @default 'md'
 * @property {boolean} outline - Outline style @default false
 * @property {boolean} disabled - Disable button @default false
 */
export default class ButtonSpec extends Spec {
	constructor() {
		super()
		this.variant = 'primary'
		this.size = 'md'
		this.outline = false
		this.disabled = false
	}

	static from(input) {
		const spec = new this()
		Object.entries(input).forEach(([key, value]) => {
			if (key in spec) spec[key] = value
		})
		return spec
	}
}
