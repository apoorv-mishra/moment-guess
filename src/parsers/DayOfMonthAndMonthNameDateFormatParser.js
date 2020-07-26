import Token from './Token.js';

const DayOfMonthAndMonthNameDateFormatParser = (function() {

	/**
	 * 1 Jan
	 * 1 January 
	 * 1st Jan 
	 * 1st January 
	 * 01 Jan 
	 * 01 January 
	 */
	const Parser = {};

	// Parser name
	Parser.name = 'DayOfMonthAndMonthNameDateFormatParser';

	Parser.pattern = new RegExp(
		'(?<dayOfMonth>(?:3[0-1]|[1-2]\\d|0?[1-9])(?:st|nd|rd|th)?)'
		+ '(?<delim1>\\s)'
		+ '(?<month>Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?'
		+ '|'
		+ 'July?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
		+ '(?<delim2>,)?'
		+ '(?<delim3>\\s)?'
	);

	/**
	 * Parses the input in accordance
	 * with the specified regexp
	 *
	 * @returns parsedResult(Object)
	 */
	Parser.parse = function(input) {
		const match = this.pattern.exec(input);
		if (!match) {
			return;
		}

		let tokens = [];
		for (const [key, val] of Object.entries(match.groups)) {
			if (val) {
				tokens.push(new Token({
					value: val,
					type: /delim\d+/.test(key) ? 'delimiter' : key,
				}));
			}
		}

		return {
			tokens: tokens,
			index: match.index,
			parser: this.name,
		};
	};

	return Parser;
})();


export default DayOfMonthAndMonthNameDateFormatParser; 
