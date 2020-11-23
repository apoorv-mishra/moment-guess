import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class YearFormatTokenAssigner implements IAssigner {
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
			this._map.set(/\d{2}/, 'YY');
			this._map.set(/\d{4}/, 'YYYY');
			this._map.set(/[+-]\d{6}/, 'YYYYYY');
		} else {
			this._map.set(/\d{2}/, '%y');
			this._map.set(/\d{4}/, '%Y');
			this._map.set(/[+-]\d{6}/, 'NA');
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

export default YearFormatTokenAssigner;
