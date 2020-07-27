import Token from './Token.js';

const TwelveHourTimeFormatParser = (function() {

	/**
	 * hh:mm[AP]M
	 * hh[AP]M
	 */
	const Parser = {};

	// Parser name
	Parser.name = 'TwelveHourTimeFormatParser';

	Parser.pattern = new RegExp('^'
		+ '(?<twelveHour>0\\d|1[0-2])'
		+ '(?:'
			+ '(?<delim1>[:.])'
			+ '(?<minute>[0-5]\\d)'
		+ ')?'
		+ '(?:'
			+ '(?<delim2>[:.])'
			+ '(?<second>[0-5]\\d)'
		+ ')?'
		+ '(?:'
			+ '(?<delim3>.)'
			+ '(?<millisecond>\\d{3})'
		+ ')?'
		+ '(?<delim4>\\s)?'
		+ '(?<meridiem>am|pm|AM|PM)'
		+ '(?:'
			+ '(?<delim5>\\s)'
			+ '(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z)'
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


export default TwelveHourTimeFormatParser; 
