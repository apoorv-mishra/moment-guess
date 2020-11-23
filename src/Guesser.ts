import parsers from './parsers';
import refiners from './refiners';
import { strftimeAssigners, defaultAssigners } from './assigners';
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

	static assign(tokens: Array<Token>, format?: string): void {
		let assigners = (!format || format === 'default') ? defaultAssigners : strftimeAssigners;
		assigners.forEach(assigner => {
			tokens.forEach(token => {
				assigner.assign(token);
			});
		});
	}

	static getFormatString(tokens: Array<Token>): Format {
		let formatString: Format = '';
		tokens.forEach(token => {
			if (token.format === 'NA') {
				throw Error(`Couldn't find strftime modifier for "${token.value}"`);
			}
			formatString += token.format ? token.format : token.value;
		});
		return formatString;
	}
}
