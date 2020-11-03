const guessFormat = require('../dist/bundle.js');

describe('Day of month followed by month name type dates', () => {
	test('# D Mon', () => {
		expect(guessFormat('1 Jan')).toBe('D MMM');
	});

	test('# D Mon, hh:mm am|pm', () => {
		expect(guessFormat('1 Jan, 10:00 am')).toBe('D MMM, hh:mm a');
	});

	test('# Mon D, HH:mm', () => {
		expect(guessFormat('1 Jan, 10:00')).toBe('D MMM, HH:mm');
	});

	test('# Mon D, HH:mm, > 12 hours', () => {
		expect(guessFormat('1 Jan, 13:00')).toBe('D MMM, HH:mm');
	});

	test('# D Mon, hh:mm:ss AM|PM', () => {
		expect(guessFormat('1 Jan, 10:00:59 AM')).toBe('D MMM, hh:mm:ss A');
	});

	test('# Mon D, HH:mm:ss', () => {
		expect(guessFormat('1 Jan, 10:00:59')).toBe('D MMM, HH:mm:ss');
	});

	test('# DD Mon', () => {
		expect(guessFormat('01 Jan')).toBe('DD MMM');
	});

	test('# parse valid day of month', () => {
		expect(() => {
			guessFormat('32 Jan');
		}).toThrow(Error("Couldn't parse date"));
	});

	test('# day of month with ordinal', () => {
		expect(guessFormat('1st Jan')).toBe('Do MMM');
	});

	test('# full month name with D', () => {
		expect(guessFormat('1 January')).toBe('D MMMM');
	});

	test('# full month name with DD', () => {
		expect(guessFormat('31 January')).toBe('DD MMMM');
	});

	test('# full month name, day of month with ordinal', () => {
		expect(guessFormat('31st January')).toBe('Do MMMM');
	});

	test('# full month name, day of month with ordinal, hhAM|PM', () => {
		expect(guessFormat('31st January, 10AM')).toBe('Do MMMM, hhA');
	});

	test('# appended delimiter(s)', () => {
		expect(guessFormat('31st January, ')).toBe('Do MMMM, ');
	});

	test('# prepend day of week (shortest)', () => {
		expect(guessFormat('Su, 31st January')).toBe('dd, Do MMMM');
	});

	test('# prepend day of week (short)', () => {
		expect(guessFormat('Sun, 31st January')).toBe('ddd, Do MMMM');
	});

	test('# prepend day of week (full)', () => {
		expect(guessFormat('Sunday, 31st January')).toBe('dddd, Do MMMM');
	});

	test('# append year (short)', () => {
		expect(guessFormat('31st January, 20')).toBe('Do MMMM, YY');
	});

	test('# append year (short), hh:mm am|pm', () => {
		expect(guessFormat('31st January, 20 10:00 am')).toBe('Do MMMM, YY hh:mm a');
	});

	test('# append year (short), HH:mm', () => {
		expect(guessFormat('31st January, 20 10:00')).toBe('Do MMMM, YY HH:mm');
	});

	test('# append year', () => {
		expect(guessFormat('31st January, 2020')).toBe('Do MMMM, YYYY');
	});

	test('# full date', () => {
		expect(guessFormat('Sunday, 31st January 2020')).toBe('dddd, Do MMMM YYYY');
	});

	test('# full date, hhAM|PM', () => {
		expect(guessFormat('Sunday, 31st January 2020, 09:00AM')).toBe('dddd, Do MMMM YYYY, hh:mmA');
	});

	test('# full date, HH:mm', () => {
		expect(guessFormat('Sunday, 31st January 2020, 09:00')).toBe('dddd, Do MMMM YYYY, HH:mm');
	});

	test('# full date with abbreviated timezone', () => {
		expect(guessFormat('Sunday, 31st January 2020, 09:00 IST')).toBe('dddd, Do MMMM YYYY, HH:mm z');
	})
});
