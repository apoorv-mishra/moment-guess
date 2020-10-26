import Token from './Token.js';

const ISO8601BasicDateTimeFormatParser = (function() {

	/**
	 * ISO 8601
	 * https://en.wikipedia.org/wiki/ISO_8601
	 */
	const Parser: any = {};

	// Parser name
	Parser.name = 'ISO8601BasicDateTimeFormatParser';

	Parser.pattern = new RegExp('^'
		+ '(?<year>[+-]\\d{6}|\\d{4})'
		+ '(?:'
			+ '(?<month>\\d{2})(?:(?<dayOfMonth>\\d{2}))?'
			+ '|'
			+ '(?<escapeText>W)(?<isoWeekOfYear>\\d{2})(?:(?<isoDayOfWeek>\\d))?'
			+ '|'
			+ '(?<dayOfYear>\\d{3})'
		+ ')?'
		+ '(?:'
			+ '(?<delim1>T| )'
			+ '(?:(?<twentyFourHour>\\d{2})(?:(?<minute>\\d{2})(?:(?<second>\\d{2})(?:(?<delim2>[.,])(?<millisecond>\\d{1,9}))?)?)?)'
			+ '(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z)?'
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


export default ISO8601BasicDateTimeFormatParser; 
