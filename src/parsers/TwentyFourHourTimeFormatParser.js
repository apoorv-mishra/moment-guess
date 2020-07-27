import Token from './Token.js';

const TwentyFourHourTimeFormatParser = (function() {

	/**
	 * HH:mm:ss[.ddd]
	 * HH:mm
	 * HH.mm.ss Z
	 */
	const Parser = {};

	// Parser name
	Parser.name = 'TwentyFourHourTimeFormatParser';

	Parser.pattern = new RegExp('^'
		+ '(?<twentyFourHour>2[0-3]|[0-1]\\d)'
		+ '(?<delim1>[:.])'
		+ '(?<minute>[0-5]\\d)'
		+ '(?:'
			+ '(?<delim2>[:.])'
			+ '(?<second>[0-5]\\d)'
		+ ')?'
		+ '(?:'
			+ '(?<delim3>.)'
			+ '(?<millisecond>\\d{3})'
		+ ')?'
		+ '(?:'
			+ '(?<delim4>\\s)'
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


export default TwentyFourHourTimeFormatParser; 
