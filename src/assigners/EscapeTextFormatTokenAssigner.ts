import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class EscapeTextFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;

	constructor(name, type) {
		this.name = name;
		this.type = type;
	}

	private _testTokenType(token: Token): boolean {
		return token.getType() === this.type;
	}

	public assign(token: Token): void {
		if (this._testTokenType(token)) {
			token.setFormat(`[${token.getValue()}]`);
		}
	}
}

export default EscapeTextFormatTokenAssigner;
