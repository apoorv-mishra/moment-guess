export default class Token {

	private _value: string;
	private _type: string;
	private _format: string;

	/**
	 * Constructor.
	 */
	constructor(value: string, type: string) {
		this._value = value;
		this._type = type;
		this._format = '';
	}

	/**
	 * Gets token value.
	 *
	 * @returns String
	 */
	get value() {
		return this._value;
	}

	/**
	 * Sets token value.
	 *
	 * @param String
	 */
	set value(value: string) {
		this._value = value;
	}

	/**
	 * Gets token type.
	 *
	 * @returns String
	 */
	get type() {
		return this._type;
	}

	/**
	 * Sets token type.
	 *
	 * @param String
	 */
	set type(type: string) {
		this._type = type;
	}

	/**
	 * Gets token format.
	 *
	 * @returns String
	 */
	get format() {
		return this._format;
	}

	/**
	 * Sets token format.
	 *
	 * @param String
	 */
	set format(format: string) {
		this._format = format;
	}
}
