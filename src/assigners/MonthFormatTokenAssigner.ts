import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class MonthFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;

	private _map: Map<RegExp, string>;

	constructor(name, type) {
		this.name = name;
		this.type = type;
		this._map = new Map();

		this._map.set(/\d{1,2}/, 'M');
		this._map.set(/\d{2}/, 'MM');
		this._map.set(/\d{1,2}(?:st|nd|rd|th)/, 'Mo');
		this._map.set(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/, 'MMM');
		this._map.set(/^(January|February|March|April|May|June|July|August|September|October|November|December)$/, 'MMMM');
	}

	private _testTokenType(token: Token): boolean {
		return token.getType() === this.type;
	}

	public assign(token: Token): void {
		this._map.forEach((formatToken, pattern) => {
			if (this._testTokenType(token) && pattern.test(token.getValue())) {
				token.setFormat(formatToken);
			}
		});
	}
}

export default MonthFormatTokenAssigner;
