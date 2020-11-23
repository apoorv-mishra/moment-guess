import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class MillisecondFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;
	public readonly format?: string;

	private _map: Map<RegExp, string>;

	constructor(name: string, type: string, format?: string) {
		this.name = name;
		this.type = type;
		this.format = format;
		this._map = new Map();

		if (!format || format === 'default') {
			this._map.set(/\d/, 'S');
			this._map.set(/\d{2}/, 'SS');
			this._map.set(/\d{3}/, 'SSS');
		} else {
			this._map.set(/\d/, 'NA');
			this._map.set(/\d{2}/, 'NA');
			this._map.set(/\d{3}/, '%L');
		}
	}

	private _testTokenType(token: Token): boolean {
		return token.type === this.type;
	}

	public assign(token: Token): void {
		this._map.forEach((formatToken, pattern) => {
			if (this._testTokenType(token) && pattern.test(token.value)) {
				token.format = formatToken;
			}
		});
	}
}

export default MillisecondFormatTokenAssigner;
