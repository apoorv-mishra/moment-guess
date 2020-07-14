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
		+ '(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun)(,)?(\\s))?'
		+ '(\\d{1,2})(\\s)(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\\s)(\\d{2,4})'
		+ '(\\s)'
		+ '(\\d{2})(:)(\\d{2})(?:(:)(\\d{2}))?'
		// Include space char as part of timezone group here
		// to avoid timezone assigner
		// to be confused with 'Z for timezone from ISO 8601'
		// and 'Z for timezone from RFC 2822'
		+ '(\\s(?:(?:UT|GMT|[ECMP][SD]T)|[Zz]|[+-]\\d{4}))'
		+ '$'
	);

	/**
	 * Parses the input in accordance
	 * with the specified regexp
	 *
	 * @returns tokens(Array of objects)
	 */
	Parser.parse = function(input) {
		const DAY_OF_WEEK_GROUP = 1;
		const COMMA_GROUP = 2;
		const SPACE_1 = 3;
		const DAY_OF_MONTH_GROUP = 4;
		const SPACE_2 = 5;
		const MONTH_GROUP = 6;
		const SPACE_3 = 7;
		const YEAR_GROUP = 8;
		const SPACE_4 = 9;
		const HOUR_GROUP = 10;
		const COLON_GROUP_1 = 11;
		const MINUTE_GROUP = 12;
		const COLON_GROUP_2 = 13;
		const SECOND_GROUP = 14;
		const TIMEZONE_GROUP = 15;

		const match = this.pattern.exec(input);

		if (!match) {
			return;
		}

		let tokens = [];
		if (match[DAY_OF_WEEK_GROUP]) {
			tokens.push(new Token({
				value: match[DAY_OF_WEEK_GROUP],
				type: 'dayOfWeek', // add assigner
			}));

			if (match[COMMA_GROUP]) {
				tokens.push(new Token({
					value: match[COMMA_GROUP],
					type: 'delimiter',
				}));
			}

			tokens.push(new Token({
				value: match[SPACE_1],
				type: 'delimiter',
			}));
		}

		tokens.push(new Token({
			value: match[DAY_OF_MONTH_GROUP],
			type: 'dayOfMonth',
		}));

		tokens.push(new Token({
			value: match[SPACE_2],
			type: 'delimiter',
		}));

		tokens.push(new Token({
			value: match[MONTH_GROUP],
			type: 'month',
		}));

		tokens.push(new Token({
			value: match[SPACE_3],
			type: 'delimiter',
		}));

		tokens.push(new Token({
			value: match[YEAR_GROUP],
			type: 'year',
		}));

		tokens.push(new Token({
			value: match[SPACE_4],
			type: 'delimiter',
		}));

		tokens.push(new Token({
			value: match[HOUR_GROUP],
			type: 'twentyFourHour',
		}));

		tokens.push(new Token({
			value: match[COLON_GROUP_1],
			type: 'delimiter',
		}));

		tokens.push(new Token({
			value: match[MINUTE_GROUP],
			type: 'minute',
		}));

		if (match[SECOND_GROUP]) {
			tokens.push(new Token({
				value: match[COLON_GROUP_2],
				type: 'delimiter',
			}));

			tokens.push(new Token({
				value: match[SECOND_GROUP],
				type: 'second',
			}));
		}

		if (match[TIMEZONE_GROUP]) {
			tokens.push(new Token({
				value: match[TIMEZONE_GROUP],
				type: 'timezone',
			}));
		}

		return {
			tokens: tokens,
			index: match.index,
			parser: this.name,
		};
	}

	return Parser;
})();

export default RFC2822DateTimeFormatParser; 
