import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class TimezoneFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;

	private _map: Map<RegExp, string>;

	constructor(name: string, type: string) {
		this.name = name;
		this.type = type;
		this._map = new Map();

		this._map.set(/[+-]\d{2}(?::\d{2})?/, 'Z');
		this._map.set(/[+-]\d{4}/, 'ZZ');
		this._map.set(/Z/, 'Z');

		// Specifically for timezone in RFC 2822 compliant dates
		this._map.set(/\s(?:(?:UT|GMT|[ECMP][SD]T)|[Zz]|[+-]\d{4})/, ' ZZ');
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

export default TimezoneFormatTokenAssigner;
