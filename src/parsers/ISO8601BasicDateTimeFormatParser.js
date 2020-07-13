import Token from './Token.js';

const ISO8601BasicDateTimeFormatParser = (function() {

	/**
	 * ISO 8601
	 * https://en.wikipedia.org/wiki/ISO_8601
	 */
	const Parser = {};

	// Parser name
	Parser.name = 'ISO8601BasicDateTimeFormatParser';

	Parser.pattern = new RegExp('^'
		+ '([+-]\\d{6}|\\d{4})'
		+ '(?:'
			+ '(\\d{2})(?:(\\d{2}))?'
			+ '|'
			+ '(W)(\\d{2})(?:(\\d))?'
			+ '|'
			+ '(\\d{3})'
		+ ')?'
		+ '(?:'
			+ '(T| )'
			+ '(?:(\\d{2})(?:(\\d{2})(?:(\\d{2})(?:([.,])(\\d{1,9}))?)?)?)'
			+ '([+-]\\d{2}(?::?\\d{2})?|Z)?'
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
		const YEAR_NUMBER_GROUP = 1;
		const MONTH_NUMBER_GROUP = 2;
		const DAY_NUMBER_GROUP  = 3;
		const ESCAPE_TEXT_GROUP = 4;
		const WEEK_NUMBER_GROUP = 5;
		const WEEKDAY_NUMBER_GROUP = 6;
		const DAY_OF_YEAR = 7;
		const DELIM_1 = 8;
		const HOUR_NUMBER_GROUP = 9;
		const MINUTE_NUMBER_GROUP = 10;
		const SECOND_NUMBER_GROUP = 11;
		const DELIM_2 = 12;
		const MILLISECOND_NUMBER_GROUP = 13;
		const TIMEZONE_OFFSET_GROUP = 14;

		const match = this.pattern.exec(input);

		if (!match) {
			return;
		}

		let tokens = [];
		tokens.push(new Token({
			value: match[YEAR_NUMBER_GROUP],
			type: 'year',
		}));
		if (match[MONTH_NUMBER_GROUP]) {
			tokens.push(new Token({
				value: match[MONTH_NUMBER_GROUP],
				type: 'month',
			}));

			if (match[DAY_NUMBER_GROUP]) {
				tokens.push(new Token({
					value: match[DAY_NUMBER_GROUP],
					type: 'dayOfMonth',
				}));
			}
		} else if (match[WEEK_NUMBER_GROUP]) {
			tokens.push(new Token({
				value: match[ESCAPE_TEXT_GROUP],
				type: 'escapeText',
			}));
			tokens.push(new Token({
				value: match[WEEK_NUMBER_GROUP], 
				type: 'isoWeekOfYear',
			}));

			if (match[WEEKDAY_NUMBER_GROUP]) {
				tokens.push(new Token({
					value: match[WEEKDAY_NUMBER_GROUP],
					type: 'isoDayOfWeek',
				}));
			} 
		} else if (match[DAY_OF_YEAR]) {
			tokens.push(new Token({
				value: match[DAY_OF_YEAR],
				type: 'dayOfYear',
			}));
		}

		if (match[HOUR_NUMBER_GROUP]) {
			tokens.push(new Token({
				value: match[DELIM_1],
				type: 'delimiter',
			}));
			tokens.push(new Token({
				value: match[HOUR_NUMBER_GROUP],
				type: 'twentyFourHour',
			}));
			if (match[MINUTE_NUMBER_GROUP]) {
				tokens.push(new Token({
					value: match[MINUTE_NUMBER_GROUP],
					type: 'minute',
				}));
				if (match[SECOND_NUMBER_GROUP]) {
					tokens.push(new Token({
						value: match[SECOND_NUMBER_GROUP],
						type: 'second',
					}));
					if (match[MILLISECOND_NUMBER_GROUP]) {
						tokens.push(new Token({
							value: match[DELIM_2],
							type: 'delimiter',
						}));
						tokens.push(new Token({
							value: match[MILLISECOND_NUMBER_GROUP],
							type: 'millisecond',
						}));
					}
				}
			}
		}

		if (match[TIMEZONE_OFFSET_GROUP]) {
			tokens.push(new Token({
				value: match[TIMEZONE_OFFSET_GROUP],
				type: 'timezone',
			}));
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
