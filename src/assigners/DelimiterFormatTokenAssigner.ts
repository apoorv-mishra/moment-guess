import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class DelimiterFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;
	public readonly format?: string;

	constructor(name: string, type: string, format?: string) {
		this.name = name;
		this.format = format;
		this.type = type;
	}

	public assign(token: Token): void { /* noop */ }
}

export default DelimiterFormatTokenAssigner;
