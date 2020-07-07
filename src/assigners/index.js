import YearFormatTokenAssigner from './YearFormatTokenAssigner.js';
import MonthFormatTokenAssigner from './MonthFormatTokenAssigner.js';
import DayOfMonthFormatTokenAssigner from './DayOfMonthFormatTokenAssigner.js';
import DelimiterFormatTokenAssigner from './DelimiterFormatTokenAssigner.js';
import HourFormatTokenAssigner from './HourFormatTokenAssigner.js';
import MinuteFormatTokenAssigner from './MinuteFormatTokenAssigner.js';
import SecondFormatTokenAssigner from './SecondFormatTokenAssigner.js';
import MillisecondFormatTokenAssigner from './MillisecondFormatTokenAssigner.js';
import TimezoneFormatTokenAssigner from './TimezoneFormatTokenAssigner.js';

const assigners = [
	YearFormatTokenAssigner,
	MonthFormatTokenAssigner,
	DayOfMonthFormatTokenAssigner,
	DelimiterFormatTokenAssigner,
	HourFormatTokenAssigner,
	MinuteFormatTokenAssigner,
	SecondFormatTokenAssigner,
	MillisecondFormatTokenAssigner,
	TimezoneFormatTokenAssigner,
];

export default assigners;
