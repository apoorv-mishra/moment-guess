import ISO8601ExtendedDateTimeFormatParser from './ISO8601ExtendedDateTimeFormatParser';
import ISO8601BasicDateTimeFormatParser from './ISO8601BasicDateTimeFormatParser';
import RFC2822DateTimeFormatParser from './RFC2822DateTimeFormatParser';
import SlashDelimitedDateFormatParser from './SlashDelimitedDateFormatParser';

const parsers = [
	ISO8601ExtendedDateTimeFormatParser,
	ISO8601BasicDateTimeFormatParser,
	RFC2822DateTimeFormatParser,
	SlashDelimitedDateFormatParser,
];

export default parsers;
