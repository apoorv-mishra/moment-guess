import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class EscapeTextFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;
	public readonly format?: string;

	constructor(name: string, type: string, format?: string) {
		this.name = name;
		this.type = type;
		this.format = format;
	}

	private _testTokenType(token: Token): boolean {
		return token.type === this.type;
	}

	public assign(token: Token): void {
		if (this._testTokenType(token)) {
			token.format = (!this.format || this.format === 'default') ? `[${token.value}]` : token.value;
		}
	}
}

export default EscapeTextFormatTokenAssigner;
