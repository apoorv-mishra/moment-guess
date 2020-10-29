import Refiner from './Refiner';

const timeFormatRefiner = new Refiner('TimeFormatRefiner', (parsedResults) => {
	parsedResults.forEach(r => {
		let meridiemExists = false;
		r.tokens.forEach(t => {
			if (t.type === 'meridiem') {
				meridiemExists = true;
			}
		});
		if (meridiemExists) {
			r.tokens.forEach(t => {
				if (t.type === 'twentyFourHour') {
					t.setType('twelveHour');
				}
			});
		}
	});

	return parsedResults;
});

const standardFormatParsersRefiner = new Refiner('StandardFormatParsersRefiner', (parsedResults) => {
	const res = parsedResults.filter(r => {
		return r.parser === 'ISO8601ExtendedDateTimeFormatParser' ||
			r.parser === 'ISO8601BasicDateTimeFormatParser' ||
			r.parser === 'RFC2822DateTimeFormatParser';
	});
	if (res.length === 0) {
		return parsedResults;
	}
	return res;
});

const refiners = [
	standardFormatParsersRefiner,
	timeFormatRefiner,
];

export default refiners;
