import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class TwentyFourHourFormatTokenAssigner implements IAssigner {
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
			this._map.set(/^(\d|1\d|2[0-3])$/, 'H');
			this._map.set(/^([0-1]\d|2[0-3])$/, 'HH');
		} else {
			this._map.set(/^(\d|1\d|2[0-3])$/, '%-k');
			this._map.set(/^([0-1]\d|2[0-3])$/, '%H');
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

export default TwentyFourHourFormatTokenAssigner;
