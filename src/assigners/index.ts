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

const assigners = [
	YearFormatTokenAssigner,
	MonthFormatTokenAssigner,
	DayOfMonthFormatTokenAssigner,
	DelimiterFormatTokenAssigner,
	MinuteFormatTokenAssigner,
	SecondFormatTokenAssigner,
	MillisecondFormatTokenAssigner,
	TimezoneFormatTokenAssigner,
	DayOfYearFormatTokenAssigner,
	EscapeTextFormatTokenAssigner,
	ISODayOfWeekFormatTokenAssigner,
	ISOWeekOfYearFormatTokenAssigner,
	TwentyFourHourFormatTokenAssigner,
	TwelveHourFormatTokenAssigner,
	DayOfWeekFormatTokenAssigner,
	MeridiemFormatTokenAssigner,
];

export default assigners;
