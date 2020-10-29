import StandardFormatParsersRefiner from './StandardFormatParsersRefiner';
import TimeFormatRefiner from './TimeFormatRefiner';

const timeFormatRefiner = new TimeFormatRefiner('TimeFormatRefiner');
const standardFormatParsersRefiner = new StandardFormatParsersRefiner('StandardFormatParsersRefiner');

const refiners = [
	standardFormatParsersRefiner,
	timeFormatRefiner,
];

export default refiners;
