import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class ISOWeekOfYearFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;

	private _map: Map<RegExp, string>;

	constructor(name: string, type: string) {
		this.name = name;
		this.type = type;
		this._map = new Map();

		this._map.set(/\d{1,2}/, 'W');
		this._map.set(/\d{2}/, 'WW');
		this._map.set(/\d{1,2}(?:st|nd|rd|th)/, 'Wo');
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
