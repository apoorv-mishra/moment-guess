import parsers from './parsers';
import refiners from './refiners';
import assigners from './assigners';
import Token from './parsers/Token';

import {
	Date,
	Format,
	ParsedResult,
} from './types';

export default class Guesser {

	constructor() {}

	static parse(date: Date): Array<ParsedResult> {
		const parsedResults: Array<ParsedResult> = [];
		parsers.forEach(parser => {
			const parsedResult = parser.parse(date);
			if (parsedResult) {
				parsedResults.push({...parsedResult});
			}
		});
		return parsedResults;
	}

	static refine(parsedResults: Array<ParsedResult>): Array<ParsedResult> {
		let refinedParsedResults: Array<ParsedResult> = [...parsedResults];
		refiners.forEach(refiner => {
			refinedParsedResults = [
				...refiner.refine(refinedParsedResults)
			];
		});
		return refinedParsedResults;
	}

	static assign(tokens: Array<Token>): void {
		assigners.forEach(assigner => {
			tokens.forEach(token => {
				assigner.assign(token);
			});
		});
	}

	static getFormatString(tokens: Array<Token>): Format {
		let formatString: Format = '';
		tokens.forEach(token => {
			formatString += token.getFormat() ? token.getFormat() : token.getValue();
		});
		return formatString;
	}
}
