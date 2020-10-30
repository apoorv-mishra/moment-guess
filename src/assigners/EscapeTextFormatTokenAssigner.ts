import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class EscapeTextFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;

	constructor(name: string, type: string) {
		this.name = name;
		this.type = type;
	}

	private _testTokenType(token: Token): boolean {
		return token.type === this.type;
	}

	public assign(token: Token): void {
		if (this._testTokenType(token)) {
			token.format = `[${token.value}]`;
		}
	}
}

export default EscapeTextFormatTokenAssigner;
