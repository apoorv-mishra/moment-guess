import {
	IParser,
	Date,
	ParsedResult,
} from '../types';

import Token from './Token';

class Parser implements IParser {
	public readonly name: string;
	public readonly pattern: RegExp;

	constructor(name: string, pattern: RegExp) {
		this.name = name;
		this.pattern = pattern;
	}

	parse(date: Date): ParsedResult | undefined {
		const match = this.pattern.exec(date);
		if (!match || !match.groups) {
			return;
		}

		let tokens: Array<Token> = [];
		for (const [key, val] of Object.entries(match.groups)) {
			if (val) {
				tokens.push(new Token(
					val,
					/delim\d+/.test(key) ? 'delimiter' : key,
				));
			}
		}

		return {
			tokens: tokens,
			index: match.index,
			parser: this.name,
		};
	}
}

export default Parser;
