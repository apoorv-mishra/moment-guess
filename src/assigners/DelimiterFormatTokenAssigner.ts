import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class DelimiterFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;

	constructor(name, type) {
		this.name = name;
		this.type = type;
	}

	public assign(token: Token): void { /* noop */ }
}

export default DelimiterFormatTokenAssigner;
