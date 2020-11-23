import YearFormatTokenAssigner from './YearFormatTokenAssigner';
import MonthFormatTokenAssigner from './MonthFormatTokenAssigner';
import DayOfMonthFormatTokenAssigner from './DayOfMonthFormatTokenAssigner';
import DelimiterFormatTokenAssigner from './DelimiterFormatTokenAssigner';
import MinuteFormatTokenAssigner from './MinuteFormatTokenAssigner';
import SecondFormatTokenAssigner from './SecondFormatTokenAssigner';
import MillisecondFormatTokenAssigner from './MillisecondFormatTokenAssigner';
import TimezoneFormatTokenAssigner from './TimezoneFormatTokenAssigner';
import DayOfYearFormatTokenAssigner from './DayOfYearFormatTokenAssigner';
import EscapeTextFormatTokenAssigner from './EscapeTextFormatTokenAssigner';
import ISODayOfWeekFormatTokenAssigner from './ISODayOfWeekFormatTokenAssigner';
import ISOWeekOfYearFormatTokenAssigner from './ISOWeekOfYearFormatTokenAssigner';
import TwentyFourHourFormatTokenAssigner from './TwentyFourHourFormatTokenAssigner';
import TwelveHourFormatTokenAssigner from './TwelveHourFormatTokenAssigner';
import DayOfWeekFormatTokenAssigner from './DayOfWeekFormatTokenAssigner';
import MeridiemFormatTokenAssigner from './MeridiemFormatTokenAssigner';

const dayOfMonthFormatTokenAssigner = new DayOfMonthFormatTokenAssigner('DelimiterFormatTokenAssigner', 'dayOfMonth');
const dayOfWeekFormatTokenAssigner = new DayOfWeekFormatTokenAssigner('DayOfWeekFormatTokenAssigner', 'dayOfWeek');
const dayOfYearFormatTokenAssigner  = new DayOfYearFormatTokenAssigner('DayOfYearFormatTokenAssigner', 'dayOfYear');
const delimiterFormatTokenAssigner = new DelimiterFormatTokenAssigner('DelimiterFormatTokenAssigner', 'delimiter');
const escapeTextFormatTokenAssigner = new EscapeTextFormatTokenAssigner('EscapeTextFormatTokenAssigner', 'escapeText');
const iSODayOfWeekFormatTokenAssigner = new ISODayOfWeekFormatTokenAssigner('ISODayOfWeekFormatTokenAssigner', 'isoDayOfWeek');
const iSOWeekOfYearFormatTokenAssigner = new ISOWeekOfYearFormatTokenAssigner('ISOWeekOfYearFormatTokenAssigner', 'isoWeekOfYear');
const meridiemFormatTokenAssigner = new MeridiemFormatTokenAssigner('MeridiemFormatTokenAssigner', 'meridiem');
const millisecondFormatTokenAssigner = new MillisecondFormatTokenAssigner('MillisecondFormatTokenAssigner', 'millisecond');
const minuteFormatTokenAssigner = new MinuteFormatTokenAssigner('MinuteFormatTokenAssigner', 'minute');
const monthFormatTokenAssigner = new MonthFormatTokenAssigner('MonthFormatTokenAssigner', 'month');
const secondFormatTokenAssigner = new SecondFormatTokenAssigner('SecondFormatTokenAssigner', 'second');
const timezoneFormatTokenAssigner = new TimezoneFormatTokenAssigner('TimezoneFormatTokenAssigner', 'timezone');
const twelveHourFormatTokenAssigner = new TwelveHourFormatTokenAssigner('TwelveHourFormatTokenAssigner', 'twelveHour');
const twentyFourHourFormatTokenAssigner = new TwentyFourHourFormatTokenAssigner('TwentyFourHourFormatTokenAssigner', 'twentyFourHour');
const yearFormatTokenAssigner = new YearFormatTokenAssigner('YearFormatTokenAssigner', 'year');

const strftimeDayOfMonthFormatTokenAssigner = new DayOfMonthFormatTokenAssigner('DelimiterFormatTokenAssigner', 'dayOfMonth', 'strftime');
const strftimeDayOfWeekFormatTokenAssigner = new DayOfWeekFormatTokenAssigner('DayOfWeekFormatTokenAssigner', 'dayOfWeek', 'strftime');
const strftimeDayOfYearFormatTokenAssigner  = new DayOfYearFormatTokenAssigner('DayOfYearFormatTokenAssigner', 'dayOfYear', 'strftime');
const strftimeDelimiterFormatTokenAssigner = new DelimiterFormatTokenAssigner('DelimiterFormatTokenAssigner', 'delimiter', 'strftime');
const strftimeEscapeTextFormatTokenAssigner = new EscapeTextFormatTokenAssigner('EscapeTextFormatTokenAssigner', 'escapeText', 'strftime');
const strftimeISODayOfWeekFormatTokenAssigner = new ISODayOfWeekFormatTokenAssigner('ISODayOfWeekFormatTokenAssigner', 'isoDayOfWeek', 'strftime');
const strftimeISOWeekOfYearFormatTokenAssigner = new ISOWeekOfYearFormatTokenAssigner('ISOWeekOfYearFormatTokenAssigner', 'isoWeekOfYear', 'strftime');
const strftimeMeridiemFormatTokenAssigner = new MeridiemFormatTokenAssigner('MeridiemFormatTokenAssigner', 'meridiem', 'strftime');
const strftimeMillisecondFormatTokenAssigner = new MillisecondFormatTokenAssigner('MillisecondFormatTokenAssigner', 'millisecond', 'strftime');
const strftimeMinuteFormatTokenAssigner = new MinuteFormatTokenAssigner('MinuteFormatTokenAssigner', 'minute', 'strftime');
const strftimeMonthFormatTokenAssigner = new MonthFormatTokenAssigner('MonthFormatTokenAssigner', 'month', 'strftime');
const strftimeSecondFormatTokenAssigner = new SecondFormatTokenAssigner('SecondFormatTokenAssigner', 'second', 'strftime');
const strftimeTimezoneFormatTokenAssigner = new TimezoneFormatTokenAssigner('TimezoneFormatTokenAssigner', 'timezone', 'strftime');
const strftimeTwelveHourFormatTokenAssigner = new TwelveHourFormatTokenAssigner('TwelveHourFormatTokenAssigner', 'twelveHour', 'strftime');
const strftimeTwentyFourHourFormatTokenAssigner = new TwentyFourHourFormatTokenAssigner('TwentyFourHourFormatTokenAssigner', 'twentyFourHour', 'strftime');
const strftimeYearFormatTokenAssigner = new YearFormatTokenAssigner('YearFormatTokenAssigner', 'year', 'strftime');

export const defaultAssigners = [
	yearFormatTokenAssigner,
	monthFormatTokenAssigner,
	dayOfMonthFormatTokenAssigner,
	delimiterFormatTokenAssigner,
	minuteFormatTokenAssigner,
	secondFormatTokenAssigner,
	millisecondFormatTokenAssigner,
	timezoneFormatTokenAssigner,
	dayOfYearFormatTokenAssigner,
	escapeTextFormatTokenAssigner,
	iSODayOfWeekFormatTokenAssigner,
	iSOWeekOfYearFormatTokenAssigner,
	twentyFourHourFormatTokenAssigner,
	twelveHourFormatTokenAssigner,
	dayOfWeekFormatTokenAssigner,
	meridiemFormatTokenAssigner,
];

export const strftimeAssigners = [
	strftimeDayOfMonthFormatTokenAssigner,
	strftimeDayOfWeekFormatTokenAssigner,
	strftimeDayOfYearFormatTokenAssigner,
	strftimeDelimiterFormatTokenAssigner,
	strftimeEscapeTextFormatTokenAssigner,
	strftimeISODayOfWeekFormatTokenAssigner,
	strftimeISOWeekOfYearFormatTokenAssigner,
	strftimeMeridiemFormatTokenAssigner,
	strftimeMillisecondFormatTokenAssigner,
	strftimeMinuteFormatTokenAssigner,
	strftimeMonthFormatTokenAssigner,
	strftimeSecondFormatTokenAssigner,
	strftimeTimezoneFormatTokenAssigner,
	strftimeTwelveHourFormatTokenAssigner,
	strftimeTwentyFourHourFormatTokenAssigner,
	strftimeYearFormatTokenAssigner,
];
