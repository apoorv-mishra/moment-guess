import Token from './Token.js';

/**
    ISO 8601
    http://www.w3.org/TR/NOTE-datetime
    - YYYY-MM-DD
    - YYYY-MM-DDThh:mmTZD
    - YYYY-MM-DDThh:mm:ssTZD
    - YYYY-MM-DDThh:mm:ss.sTZD 
    - TZD = (Z or +hh:mm or -hh:mm)
*/
const Parser = {};

// Parser name
Parser.name = 'ISO8601DateTimeFormatParser';

// Regexp for parser
Parser.pattern = new RegExp('^' 
	+ '([0-9]{4})(\\-)([0-9]{1,2})(\\-)([0-9]{1,2})'
	+ '(?:(T)' //..
	+ '([0-9]{1,2})(:)([0-9]{1,2})' // hh:mm
	+ '(?:(:)([0-9]{1,2})(?:(\\.)(\\d{1,4}))?)?' // :ss.s
	+ '(Z|[+-]\\d{2}:?(?:\\d{2})?)?' // TZD (Z or ±hh:mm or ±hhmm or ±hh)
	+ ')?'  //..
	+ '$');

/**
 * Parses the input in accordance
 * with the specified regexp
 *
 * @returns parsedResult(Object)
 */
Parser.parse = function(input) {
	let YEAR_NUMBER_GROUP = 1;
	let DELIM_1 = 2;
	let MONTH_NUMBER_GROUP = 3;
	let DELIM_2 = 4;
	let DAY_NUMBER_GROUP  = 5;
	let DELIM_3 = 6;
	let HOUR_NUMBER_GROUP  = 7;
	let DELIM_4 = 8;
	let MINUTE_NUMBER_GROUP = 9;
	let DELIM_5 = 10;
	let SECOND_NUMBER_GROUP = 11;
	let DELIM_6 = 12;
	let MILLISECOND_NUMBER_GROUP = 13;
	let TZD_OFFSET_GROUP = 14;

	const match = this.pattern.exec(input);

	if (!match) {
		return;
	}

	let tokens = [];
	tokens.push(new Token({
		value: match[YEAR_NUMBER_GROUP],
		type: 'year',
	}));
	tokens.push(new Token({
		value: match[DELIM_1],
		type: 'delimiter',
	}));
	tokens.push(new Token({
		value: match[MONTH_NUMBER_GROUP],
		type: 'month',
	}));
	tokens.push(new Token({
		value: match[DELIM_2],
		type: 'delimiter',
	}));
	tokens.push(new Token({
		value: match[DAY_NUMBER_GROUP],
		type: 'dayOfMonth',
	}));

	if (match[HOUR_NUMBER_GROUP]) {
		tokens.push(new Token({
			value: match[DELIM_3],
			type: 'delimiter',
		}));
		tokens.push(new Token({
			value: match[HOUR_NUMBER_GROUP],
			type: 'hour',
		}));
		tokens.push(new Token({
			value: match[DELIM_4],
			type: 'delimiter',
		}));
		tokens.push(new Token({
			value: match[MINUTE_NUMBER_GROUP],
			type: 'minute',
		}));
	}

	if (match[SECOND_NUMBER_GROUP]) {
		tokens.push(new Token({
			value: match[DELIM_5],
			type: 'delimiter',
		}));
		tokens.push(new Token({
			value: match[SECOND_NUMBER_GROUP],
			type: 'second',
		}));
	}

	if (match[MILLISECOND_NUMBER_GROUP]) {
		tokens.push(new Token({
			value: match[DELIM_6],
			type: 'delimiter',
		}));
		tokens.push(new Token({
			value: match[MILLISECOND_NUMBER_GROUP],
			type: 'millisecond',
		}));
	} 

	if (match[TZD_OFFSET_GROUP]) {
		tokens.push(new Token({
			value: match[TZD_OFFSET_GROUP],
			type: 'timezone',
		}));
	}

	return {
		tokens: tokens,
		index: match.index,
		parser: this.name,
	};

	return tokens;
}

export default Parser;
