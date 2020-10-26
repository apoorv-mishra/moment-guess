import YearFormatTokenAssigner from './YearFormatTokenAssigner.js';
import MonthFormatTokenAssigner from './MonthFormatTokenAssigner.js';
import DayOfMonthFormatTokenAssigner from './DayOfMonthFormatTokenAssigner.js';
import DelimiterFormatTokenAssigner from './DelimiterFormatTokenAssigner.js';
import MinuteFormatTokenAssigner from './MinuteFormatTokenAssigner.js';
import SecondFormatTokenAssigner from './SecondFormatTokenAssigner.js';
import MillisecondFormatTokenAssigner from './MillisecondFormatTokenAssigner.js';
import TimezoneFormatTokenAssigner from './TimezoneFormatTokenAssigner.js';
import DayOfYearFormatTokenAssigner from './DayOfYearFormatTokenAssigner.js';
import EscapeTextFormatTokenAssigner from './EscapeTextFormatTokenAssigner.js';
import ISODayOfWeekFormatTokenAssigner from './ISODayOfWeekFormatTokenAssigner.js';
import ISOWeekOfYearFormatTokenAssigner from './ISOWeekOfYearFormatTokenAssigner.js';
import TwentyFourHourFormatTokenAssigner from './TwentyFourHourFormatTokenAssigner.js';
import TwelveHourFormatTokenAssigner from './TwelveHourFormatTokenAssigner.js';
import DayOfWeekFormatTokenAssigner from './DayOfWeekFormatTokenAssigner.js';
import MeridiemFormatTokenAssigner from './MeridiemFormatTokenAssigner.js';

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
