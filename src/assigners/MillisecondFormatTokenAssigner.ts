import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class MillisecondFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;

	private _map: Map<RegExp, string>;

	constructor(name: string, type: string) {
		this.name = name;
		this.type = type;
		this._map = new Map();

		this._map.set(/\d/, 'S');
		this._map.set(/\d{2}/, 'SS');
		this._map.set(/\d{3}/, 'SSS');
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
