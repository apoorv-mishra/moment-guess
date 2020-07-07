export default class Token {
	/**
	 * Constructor.
	 */
	constructor({ value, type, index, format }) {
		this.value = value;
		this.type = type;
		this.format = format
	}

	/**
	 * Gets token value.
	 *
	 * @returns String
	 */
	getValue() {
		return this.value;
	}

	/**
	 * Sets token value.
	 *
	 * @params String
	 */
	setValue(value) {
		this.value = value;
	}

	/**
	 * Gets token type.
	 *
	 * @returns String
	 */
	getType() {
		return this.type;
	}

	/**
	 * Sets token type.
	 *
	 * @params String
	 */
	setType(type) {
		this.type = type;
	}

	/**
	 * Gets token format.
	 *
	 * @returns String
	 */
	getFormat() {
		return this.format;
	}

	/**
	 * Sets token format.
	 *
	 * @params String
	 */
	setFormat(format) {
		this.format = format;
	}
}
