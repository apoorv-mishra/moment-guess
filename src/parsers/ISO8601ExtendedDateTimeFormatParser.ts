import Token from './Token.js';

const ISO8601ExtendedDateTimeFormatParser = (function() {

	/**
	 * ISO 8601
	 * https://en.wikipedia.org/wiki/ISO_8601
	 */
	const Parser: any = {};

	// Parser name
	Parser.name = 'ISO8601ExtendedDateTimeFormatParser';

	Parser.pattern = new RegExp('^'
		+ '(?<year>[+-]\\d{6}|\\d{4})'
		+ '(?<delim1>\\-)'
		+ '(?:'
			+ '(?<month>\\d{2})(?:(?<delim2>\\-)(?<dayOfMonth>\\d{2}))?'
			+ '|'
			+ '(?<escapeText>W)(?<isoWeekOfYear>\\d{2})(?:(?<delim3>\\-)(?<isoDayOfWeek>\\d))?'
			+ '|'
			+ '(?<dayOfYear>\\d{3})'
		+ ')'
		+ '(?:'
			+ '(?<delim4>T| )'
			+ '(?:(?<twentyFourHour>\\d{2})(?:(?<delim5>:)(?<minute>\\d{2})(?:(?<delim6>:)(?<second>\\d{2})(?:(?<delim7>[.,])(?<millisecond>\\d{1,9}))?)?)?)'
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


export default ISO8601ExtendedDateTimeFormatParser; 
