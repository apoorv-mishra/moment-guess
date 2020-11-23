import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class ISOWeekOfYearFormatTokenAssigner implements IAssigner {
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
			this._map.set(/\d{1,2}/, 'W');
			this._map.set(/\d{2}/, 'WW');
			this._map.set(/\d{1,2}(?:st|nd|rd|th)/, 'Wo');
		} else {
			this._map.set(/\d{1,2}/, 'NA');
			this._map.set(/\d{2}/, '%U');
			this._map.set(/\d{1,2}(?:st|nd|rd|th)/, 'NA');
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

export default ISOWeekOfYearFormatTokenAssigner;
