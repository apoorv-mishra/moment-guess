import parsers from './parsers';
import refiners from './refiners';
import assigners from './assigners';

export default class Guesser {
	/**
	 * Constructor.
	 */
	constructor(input, options) {
		this.input = input;
		this.options = options;
		this.parsers = parsers;
		this.refiners = refiners;
		this.assigners = assigners;
	}

	/**
	 * Parses the input string
	 * using different parsers
	 * to find matches.
	 *
	 * @returns parsedResults(Array of objects)
	 */
	parseInput() {
		const input = this.input;
		const parsedResults = [];
		this.parsers.forEach(parser => {
			const parsedResult = parser.parse(input);
			if (parsedResult) {
				parsedResults.push({...parsedResult});
			}
		});
		return parsedResults;
	}

	/**
	 * Refines results if multiple
	 * parsers were able to parse
	 * the input.
	 *
	 * @params parsedResults(Object)
	 *
	 * @returns tokens(Array of Objects)
	 */
	refineParsedResults(parsedResults) {
		if (parsedResults.length <= 1) {
			return parsedResults;
		}

		let refinedParsedResults = [...parsedResults];
		this.refiners.forEach(refiner => {
			refinedParsedResults = [
				...refiner.refine(refinedParsedResults)
			];
		});

		return refinedParsedResults;
	}

	/**
	 * Assigns corresponding format
	 * tokens to individual input tokens
	 * parsed.
	 *
	 * Details are at https://momentjs.com/docs/#/displaying/
	 *
	 * @params tokens(Array of Objects)
	 */
	assignFormatTokens(tokens) {
		this.assigners.forEach(assigner => {
			tokens.forEach(token => {
				assigner.assign(token);
			});
		});
	}

	/**
	 * Gets the expected format
	 * string for the giving input.
	 *
	 * @returns String
	 */
	getFormatString(tokens) {
		let formatString = '';
		tokens.forEach(token => {
			formatString += token.getFormat() ? token.getFormat() : token.getValue();
		});
		return formatString;
	}
}
