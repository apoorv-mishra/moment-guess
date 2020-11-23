import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class DayOfWeekFormatTokenAssigner implements IAssigner {
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
			this._map.set(/[0-6]/, 'd');
			this._map.set(/[0-6](?:st|nd|rd|th)/, 'do');
			this._map.set(/(?:Su|Mo|Tu|We|Th|Fr|Sa)/, 'dd');
			this._map.set(/(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)/, 'ddd');
			this._map.set(/(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/, 'dddd');
		} else {
			this._map.set(/[0-6]/, '%w');
			this._map.set(/[0-6](?:st|nd|rd|th)/, 'NA');
			this._map.set(/(?:Su|Mo|Tu|We|Th|Fr|Sa)/, 'NA');
			this._map.set(/(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)/, '%a');
			this._map.set(/(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/, '%A');
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

export default DayOfWeekFormatTokenAssigner; 
