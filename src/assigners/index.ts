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

const assigners = [
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

export default assigners;
