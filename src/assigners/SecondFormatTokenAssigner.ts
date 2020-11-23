import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class SecondFormatTokenAssigner implements IAssigner {
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
			this._map.set(/\d{1,2}/, 's');
			this._map.set(/\d{2}/, 'ss');
		} else {
			this._map.set(/\d{1,2}/, 'NA');
			this._map.set(/\d{2}/, '%S');
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

export default SecondFormatTokenAssigner;
