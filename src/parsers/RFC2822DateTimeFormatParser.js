import Token from './Token.js';

const RFC2822DateTimeFormatParser = (function() {

	/**
	 * RFC 2822
	 * https://tools.ietf.org/html/rfc2822#section-3.3
	 */
	const Parser = {};

	// Parser name
	Parser.name = 'RFC2822DateTimeFormatParser';

	// Regexp for parser
	Parser.pattern = new RegExp('^'
		+ '(?:(?<dayOfWeek>Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?<delim1>,)?(?<delim2>\\s))?'
		+ '(?<dayOfMonth>\\d{1,2})(?<delim3>\\s)(?<month>Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?<delim4>\\s)(?<year>\\d{2,4})'
		+ '(?<delim5>\\s)'
		+ '(?<twentyFourHour>\\d{2})(?<delim6>:)(?<minute>\\d{2})(?:(?<delim7>:)(?<second>\\d{2}))?'
		// Include space char as part of timezone group here
		// to avoid timezone assigner
		// to be confused with 'Z for timezone from ISO 8601'
		// and 'Z for timezone from RFC 2822'
		+ '(?<timezone>\\s(?:(?:UT|GMT|[ECMP][SD]T)|[Zz]|[+-]\\d{4}))'
		+ '$'
	);

	/**
	 * Parses the input in accordance
	 * with the specified regexp
	 *
	 * @returns tokens(Array of objects)
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
			name: this.name,
		};

	}

	return Parser;
})();

export default RFC2822DateTimeFormatParser; 
