import Token from './Token.js';

const DayOfMonthAndMonthNameDateFormatParser = (function() {

	/**
	 * Date only
	 *
	 * - 1 Jan
	 * - 1 January 
	 * - 1st Jan 
	 * - 1st January 
	 * - 01 Jan 
	 * - 01 January
	 *
	 * Date with time
	 *
	 * - 1 Jan, 10:00 AM
	 * - Sunday, 1st January, 23:00
	 */
	const Parser: any = {};

	// Parser name
	Parser.name = 'DayOfMonthAndMonthNameDateFormatParser';

	Parser.pattern = new RegExp('^'
		+ '(?<dayOfWeek>(?:Sun?|Mon?|Tu(?:es)?|We(?:dnes)?|Th(?:urs)?|Fri?|Sa(?:tur)?)(?:day)?)?'
		+ '(?<delim1>,)?'
		+ '(?<delim2>\\s)?'
		+ '(?<dayOfMonth>(?:3[0-1]|[1-2]\\d|0?[1-9])(?:st|nd|rd|th)?)'
		+ '(?<delim3>\\s)'
		+ '(?<month>Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?'
		+ '|'
		+ 'July?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
		+ '(?<delim4>,)?'
		+ '(?<delim5>\\s)?'
		+ '(?<year>\\d{4}|\\d{2})?'
		+ '(?:'
			+ '(?<delim6>,)?'
			+ '(?<delim7>\\s)'
			+ '(?:(?<twentyFourHour>2[0-3]|[0-1]\\d)|(?<twelveHour>0\\d|1[0-2]))'
			+ '(?:'
				+ '(?<delim8>[:.])'
				+ '(?<minute>[0-5]\\d)'
			+ ')?'
			+ '(?:'
				+ '(?<delim9>[:.])'
				+ '(?<second>[0-5]\\d)'
			+ ')?'
			+ '(?:'
				+ '(?<delim10>.)'
				+ '(?<millisecond>\\d{3})'
			+ ')?'
			+ '(?<delim11>\\s)?'
			+ '(?<meridiem>am|pm|AM|PM)?'
			+ '(?:'
				+ '(?<delim12>\\s)'
				+ '(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z)'
			+ ')?'
		+ ')?'
		+ '$'
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
