import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class TwelveHourFormatTokenAssigner implements IAssigner {
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
			this._map.set(/^([1-9]|1[0-2])$/, 'h');
			this._map.set(/^(0\d|1[0-2])$/, 'hh');
		} else {
			this._map.set(/^([1-9]|1[0-2])$/, '%-l');
			this._map.set(/^(0\d|1[0-2])$/, '%I');
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

export default TwelveHourFormatTokenAssigner;
