import Parser from './Parser';

const abbreviatedTimezones = 'UT|'
	// https://www.timeanddate.com/time/zones/africa
	+ 'CAT|CET|CVT|EAT|EET|GMT|MUT|RET|SAST|SCT|WAST|WAT|WEST|WET|WST|WT|'

	// https://www.timeanddate.com/time/zones/asia
	+ 'ADT|AFT|ALMT|AMST|AMT|ANAST|ANAT|AQTT|AST|AZST|AZT|BNT|BST|BTT|CHOST|CHOT|'
	+ 'CST|EEST|EET|GET|GST|HKT|HOVST|HOVT|ICT|IDT|IRDT|IRKST|IRKT|IST|JST|KGT|KRAST|'
	+ 'KRAT|KST|MAGST|MAGT|MMT|MSK|MVT|NOVST|NOVT|NPT|OMSST|OMST|ORAT|PETST|PETT|PHT|'
	+ 'PKT|PYT|QYZT|SAKT|SGT|SRET|TJT|TLT|TMT|TRT|ULAST|ULAT|UZT|VLAST|VLAT|WIB|WIT|'
	+ 'YAKST|YAKT|YEKST|YEKT|'

	// https://www.timeanddate.com/time/zones/antarctica
	+ 'ART|CAST|CEST|CLST|CLT|DAVT|DDUT|GMT|MAWT|NZDT|NZST|ROTT|SYOT|VOST|'

	// https://www.timeanddate.com/time/zones/atlantic
	+ 'ADT|AST|AT|AZOST|AZOT|'

	// https://www.timeanddate.com/time/zones/au
	+ 'ACDT|ACST|ACT|ACWST|AEDT|AEST|AET|AWDT|AWST|CXT|LHDT|LHST|NFDT|NFT|'

	// https://www.timeanddate.com/time/zones/caribbean
	+ 'AST|AT|CDT|CIDST|CIST|CST|EDT|EST|ET|'

	// https://www.timeanddate.com/time/zones/ca
	+ 'CST|CT|EST|ET|'

	// https://www.timeanddate.com/time/zones/eu
	+ 'BST|CEST|CET|EEST|EET|FET|GET|GMT|IST|KUYT|MSD|MSK|SAMT|TRT|WEST|WET|'

	// https://www.timeanddate.com/time/zones/indian-ocean
	+ 'CCT|EAT|IOT|TFT|'

	// https://www.timeanddate.com/time/zones/na
	+ 'ADT|AKDT|AKST|AST|AT|CDT|CST|CT|EDT|EGST|EGT|ET|GMT|HDT|HST|MDT|MST|MT|NDT|NST|PDT|PMDT|PMST|PST|PT|WGST|WGT|'

	// https://www.timeanddate.com/time/zones/pacific
	+ 'AoE|BST|CHADT|CHAST|CHUT|CKT|ChST|EASST|EAST|FJST|FJT|GALT|GAMT|GILT|HST|KOST|LINT|MART|'
	+ 'MHT|NCT|NRT|NUT|NZDT|NZST|PGT|PHOT|PONT|PST|PWT|SBT|SST|TAHT|TKT|TOST|TOT|TVT|VUT|WAKT|WFT|WST|YAPT|'

	// https://www.timeanddate.com/time/zones/sa
	+ 'ACT|AMST|AMT|ART|BOT|BRST|BRT|CLST|CLT|COT|ECT|FKST|FKT|FNT|GFT|GST|GYT|PET|PYST|PYT|SRT|UYST|UYT|VET|WARST';

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
const dayOfMonthAndMonthNameDateFormatParser = new Parser(
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
			+ '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
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
				+ `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
			+ ')?'
		+ ')?'
		+ '$'
	)
);

/**
 * ISO 8601
 * https://en.wikipedia.org/wiki/ISO_8601
 */
const iSO8601BasicDateTimeFormatParser = new Parser(
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
const iSO8601ExtendedDateTimeFormatParser = new Parser(
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
 * - Sunday, January 1st, 23:00 PDT
 */
const monthNameAndDayOfMonthDateFormatParser = new Parser(
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
				+ '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
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
					+ `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
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
const rFC2822DateTimeFormatParser = new Parser(
	'RFC2822DateTimeFormatParser',
	new RegExp('^'
		+ '(?:(?<dayOfWeek>Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?<delim1>,)?(?<delim2>\\s))?'
		+ '(?<dayOfMonth>\\d{1,2})(?<delim3>\\s)(?<month>Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?<delim4>\\s)(?<year>\\d{2,4})'
		+ '(?<delim5>\\s)'
		+ '(?<twentyFourHour>\\d{2})(?<delim6>:)(?<minute>\\d{2})(?:(?<delim7>:)(?<second>\\d{2}))?'
		+ '(?<delim8>\\s)'
		+ '(?<timezone>(?:(?:UT|GMT|[ECMP][SD]T)|[Zz]|[+-]\\d{4}))'
		+ '$'
	)
);

/*
 * YYYY/MM/DD [hh:mm a|A [abbr-tz]]
 * YYYY/M/D
 * YYYY/MM
 * YYYY/M
 */
const slashDelimitedDateTimeFormatParser = new Parser(
	'SlashDelimitedDateFormatParser',
	new RegExp('^'
		+ '(?<year>\\d{4}|\\d{2})'
		+ '(?<delim1>[/.-])'
		+ '(?<month>0?[1-9]|1[0-2])'
		+ '(?:'
			+ '(?<delim2>[/.-])'
			+ '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
		+ ')?'
		+ '(?:'
			+ '(?:'
				+ '(?<delim3>,)?'
				+ '(?<delim4>\\s)'
				+ '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
				+ '(?:'
					+ '(?<delim5>[:.])'
					+ '(?<minute>[0-5]\\d)'
				+ ')?'
				+ '(?:'
					+ '(?<delim6>[:.])'
					+ '(?<second>[0-5]\\d)'
				+ ')?'
				+ '(?:'
					+ '(?<delim7>.)'
					+ '(?<millisecond>\\d{3})'
				+ ')?'
				+ '(?<delim8>\\s)?'
				+ '(?<meridiem>am|pm|AM|PM)?'
				+ '(?:'
					+ '(?<delim9>\\s)'
					+ `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
				+ ')?'
			+ ')?'
		+ ')?'
		+ '$'
	)
);


/**
 * hh:mm[AP]M
 * hh:mm[AP]M [abbr-tz]
 * hh[AP]M
 */
const twelveHourTimeFormatParser = new Parser(
	'TwelveHourTimeFormatParser',
	new RegExp('^'
		+ '(?<twelveHour>0?[1-9]|1[0-2])'
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
			+ `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
		+ ')?'
		+ '$'
	)
);

/**
 * HH:mm:ss[.ddd]
 * HH:mm
 * HH.mm.ss Z
 */
const twentyFourHourTimeFormatParser = new Parser(
	'TwentyFourHourTimeFormatParser',
	new RegExp('^'
		+ '(?<twentyFourHour>2[0-3]|0?\\d|1\\d)'
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
			+ `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
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
const uKStyleSlashDelimitedDateTimeFormatParser = new Parser(
	'UKStyleSlashDelimitedDateFormatParser',
	new RegExp('^'
		+ '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
		+ '(?<delim1>[/.-])'
		+ '(?<month>0?[1-9]|1[0-2])'
		+ '(?:'
			+ '(?<delim2>[/.-])'
			+ '(?<year>\\d{4}|\\d{2})'
		+ ')?'
		+ '(?:'
			+ '(?:'
				+ '(?<delim3>,)?'
				+ '(?<delim4>\\s)'
				+ '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
				+ '(?:'
					+ '(?<delim5>[:.])'
					+ '(?<minute>[0-5]\\d)'
				+ ')?'
				+ '(?:'
					+ '(?<delim6>[:.])'
					+ '(?<second>[0-5]\\d)'
				+ ')?'
				+ '(?:'
					+ '(?<delim7>.)'
					+ '(?<millisecond>\\d{3})'
				+ ')?'
				+ '(?<delim8>\\s)?'
				+ '(?<meridiem>am|pm|AM|PM)?'
				+ '(?:'
					+ '(?<delim9>\\s)'
					+ `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
				+ ')?'
			+ ')?'
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
const uSStyleSlashDelimitedDateTimeFormatParser = new Parser(
	'USStyleSlashDelimitedDateFormatParser',
	new RegExp('^'
		+ '(?<month>0?[1-9]|1[0-2])'
		+ '(?<delim1>[/.-])'
		+ '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
		+ '(?:'
			+ '(?<delim2>[/.-])'
			+ '(?<year>\\d{4}|\\d{2})'
		+ ')?'
		+ '(?:'
			+ '(?:'
				+ '(?<delim3>,)?'
				+ '(?<delim4>\\s)'
				+ '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
				+ '(?:'
					+ '(?<delim5>[:.])'
					+ '(?<minute>[0-5]\\d)'
				+ ')?'
				+ '(?:'
					+ '(?<delim6>[:.])'
					+ '(?<second>[0-5]\\d)'
				+ ')?'
				+ '(?:'
					+ '(?<delim7>.)'
					+ '(?<millisecond>\\d{3})'
				+ ')?'
				+ '(?<delim8>\\s)?'
				+ '(?<meridiem>am|pm|AM|PM)?'
				+ '(?:'
					+ '(?<delim9>\\s)'
					+ `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
				+ ')?'
			+ ')?'
		+ ')?'
		+ '$'
	)
);

const dashDelimitedWithMonthNameDateTimeFormatParser = new Parser(
	'DashDelimitedWithMonthNameDateTimeFormatParser',
	new RegExp('^'
		+ '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
		+ '(?<delim1>-)'
		+ '(?<month>Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?'
		+ '|'
		+ 'July?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
		+ '(?<delim2>-)?'
		+ '(?<year>\\d{4}|\\d{2})?'
		+ '(?:'
			+ '(?:'
				+ '(?<delim3>,)?'
				+ '(?<delim4>\\s)'
				+ '(?:(?<twentyFourHour>2[0-3]|0?\\d|1\\d)|(?<twelveHour>0?[1-9]|1[0-2]))'
				+ '(?:'
					+ '(?<delim5>[:.])'
					+ '(?<minute>[0-5]\\d)'
				+ ')?'
				+ '(?:'
					+ '(?<delim6>[:.])'
					+ '(?<second>[0-5]\\d)'
				+ ')?'
				+ '(?:'
					+ '(?<delim7>.)'
					+ '(?<millisecond>\\d{3})'
				+ ')?'
				+ '(?<delim8>\\s)?'
				+ '(?<meridiem>am|pm|AM|PM)?'
				+ '(?:'
					+ '(?<delim9>\\s)'
					+ `(?<timezone>[+-]\\d{2}(?::?\\d{2})?|Z|${abbreviatedTimezones})`
				+ ')?'
			+ ')?'
		+ ')?'
		+ '$'
	)
);

const parsers = [
	iSO8601ExtendedDateTimeFormatParser,
	iSO8601BasicDateTimeFormatParser,
	rFC2822DateTimeFormatParser,
	slashDelimitedDateTimeFormatParser,
	uKStyleSlashDelimitedDateTimeFormatParser,
	uSStyleSlashDelimitedDateTimeFormatParser,
	monthNameAndDayOfMonthDateFormatParser,
	dayOfMonthAndMonthNameDateFormatParser,
	twentyFourHourTimeFormatParser,
	twelveHourTimeFormatParser,
	dashDelimitedWithMonthNameDateTimeFormatParser,
];

export default parsers;
