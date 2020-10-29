import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class YearFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;

	private _map: Map<RegExp, string>;

	constructor(name, type) {
		this.name = name;
		this.type = type;
		this._map = new Map();

		this._map.set(/\d{2}/, 'YY');
		this._map.set(/\d{4}/, 'YYYY');
		this._map.set(/[+-]\d{6}/, 'YYYYYY');
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

export default YearFormatTokenAssigner;
