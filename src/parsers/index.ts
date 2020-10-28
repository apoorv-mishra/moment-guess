import Parser from './Parser';

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
const DayOfMonthAndMonthNameDateFormatParser = new Parser(
	'DayOfMonthAndMonthNameDateFormatParser',
	new RegExp('^'
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
	)
);

/**
 * ISO 8601
 * https://en.wikipedia.org/wiki/ISO_8601
 */
const ISO8601BasicDateTimeFormatParser = new Parser(
	'ISO8601BasicDateTimeFormatParser',
	new RegExp('^'
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
	)
);

/**
 * ISO 8601
 * https://en.wikipedia.org/wiki/ISO_8601
 */
const ISO8601ExtendedDateTimeFormatParser = new Parser(
	'ISO8601ExtendedDateTimeFormatParser',
	new RegExp('^'
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
	)
);

/**
 * Date only
 *
 * - Jan 1
 * - January 1
 * - Jan 1st
 * - January 1st
 * - Jan 01
 * - January 01
 *
 * Date with time
 *
 * - Jan 1, 10:00 AM
 * - Sunday, January 1st, 23:00
 */
const MonthNameAndDayOfMonthDateFormatParser = new Parser(
	'MonthNameAndDayOfMonthDateFormatParser',
	new RegExp('^'
		+ '(?<dayOfWeek>(?:Sun?|Mon?|Tu(?:es)?|We(?:dnes)?|Th(?:urs)?|Fri?|Sa(?:tur)?)(?:day)?)?'
		+ '(?<delim1>,)?'
		+ '(?<delim2>\\s)?'
		+ '(?<month>Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?'
		+ '|'
		+ 'July?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
		+ '(?<delim3>\\s)'
		+ '(?<dayOfMonth>(?:3[0-1]|[1-2]\\d|0?[1-9])(?:st|nd|rd|th)?)'
		+ '(?<delim4>,)?'
		+ '(?<delim5>\\s)?'
		+ '(?<year>\\d{4}|\\d{2})?'
		+ '(?:'
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
		+ ')?'
		+ '$'
	)
);

/**
 * RFC 2822
 * https://tools.ietf.org/html/rfc2822#section-3.3
 */
const RFC2822DateTimeFormatParser = new Parser(
	'RFC2822DateTimeFormatParser',
	new RegExp('^'
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
	)
);

/*
 * YYYY/MM/DD
 * YYYY/M/D
 * YYYY/MM
 * YYYY/M
 */
const SlashDelimitedDateFormatParser = new Parser(
	'SlashDelimitedDateFormatParser',
	new RegExp('^'
		+ '(?<year>\\d{4}|\\d{2})'
		+ '(?<delim1>[/.-])'
		+ '(?<month>0?[1-9]|1[0-2])'
		+ '(?:'
			+ '(?<delim2>[/.-])'
			+ '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
		+ ')?'
		+ '$'
	)
);

/**
 * hh:mm[AP]M
 * hh[AP]M
 */
const TwelveHourTimeFormatParser = new Parser(
	'TwelveHourTimeFormatParser',
	new RegExp('^'
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
	)
);

/**
 * HH:mm:ss[.ddd]
 * HH:mm
 * HH.mm.ss Z
 */
const TwentyFourHourTimeFormatParser = new Parser(
	'TwentyFourHourTimeFormatParser',
	new RegExp('^'
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
	)
);

/*
 * UK style
 *
 * - DD/MM/YYYY
 * - D/M/YYYY
 * - DD/MM/YY
 * - DD/MM
 */
const UKStyleSlashDelimitedDateFormatParser = new Parser(
	'UKStyleSlashDelimitedDateFormatParser',
	new RegExp('^'
		+ '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
		+ '(?<delim1>[/.-])'
		+ '(?<month>0?[1-9]|1[0-2])'
		+ '(?:'
			+ '(?<delim2>[/.-])'
			+ '(?<year>\\d{4}|\\d{2})'
		+ ')?'
		+ '$'
	)
);

/*
 * US style
 *
 * - MM/DD/YYYY
 * - M/D/YYYY
 *
 * - MM/DD/YY
 * - M/D/YY
 *
 * - MM/DD
 * - M/D
 */
const USStyleSlashDelimitedDateFormatParser = new Parser(
	'USStyleSlashDelimitedDateFormatParser',
	new RegExp('^'
		+ '(?<month>0?[1-9]|1[0-2])'
		+ '(?<delim1>[/.-])'
		+ '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
		+ '(?:'
			+ '(?<delim2>[/.-])'
			+ '(?<year>\\d{4}|\\d{2})'
		+ ')?'
		+ '$'
	)
);

const parsers = [
	ISO8601ExtendedDateTimeFormatParser,
	ISO8601BasicDateTimeFormatParser,
	RFC2822DateTimeFormatParser,
	SlashDelimitedDateFormatParser,
	UKStyleSlashDelimitedDateFormatParser,
	USStyleSlashDelimitedDateFormatParser,
	MonthNameAndDayOfMonthDateFormatParser,
	DayOfMonthAndMonthNameDateFormatParser,
	TwentyFourHourTimeFormatParser,
	TwelveHourTimeFormatParser,
];

export default parsers;
