const guessFormat = require('../dist/bundle.js');

describe('Month followed by day of month type dates', () => {
	test('# Mon D', () => {
		expect(guessFormat('Jan 1')).toBe('MMM D');
	});

	test('# Mon D, hh:mm am|pm', () => {
		expect(guessFormat('Jan 1, 10:00 am')).toBe('MMM D, hh:mm a');
	});

	test('# Mon D, HH:mm', () => {
		expect(guessFormat('Jan 1, 10:00')).toBe('MMM D, HH:mm');
	});

	test('# Mon D, HH:mm, > 12 hours', () => {
		expect(guessFormat('Jan 1, 13:00')).toBe('MMM D, HH:mm');
	});

	test('# Mon D, hh:mm:ss AM|PM', () => {
		expect(guessFormat('Jan 1, 10:00:59 AM')).toBe('MMM D, hh:mm:ss A');
	});

	test('# Mon D, HH:mm:ss', () => {
		expect(guessFormat('Jan 1, 10:00:59')).toBe('MMM D, HH:mm:ss');
	});

	test('# Mon DD', () => {
		expect(guessFormat('Jan 01')).toBe('MMM DD');
	});

	test('# parse valid day of month', () => {
		expect(() => {
			guessFormat('Jan 32')
		}).toThrow(Error("Couldn't parse date"));
	});

	test('# day of month with ordinal', () => {
		expect(guessFormat('Jan 1st')).toBe('MMM Do');
	});

	test('# full month name with D', () => {
		expect(guessFormat('January 1')).toBe('MMMM D');
	});

	test('# full month name with DD', () => {
		expect(guessFormat('January 31')).toBe('MMMM DD');
	});

	test('# full month name, day of month with ordinal', () => {
		expect(guessFormat('January 31st')).toBe('MMMM Do');
	});

	test('# full month name, day of month with ordinal, hhAM|PM', () => {
		expect(guessFormat('January 31st, 10AM')).toBe('MMMM Do, hhA');
	});

	test('# appended delimiter(s)', () => {
		expect(guessFormat('January 31st, ')).toBe('MMMM Do, ');
	});

	test('# prepend day of week (shortest)', () => {
		expect(guessFormat('Su, January 31st')).toBe('dd, MMMM Do');
	});

	test('# prepend day of week (short)', () => {
		expect(guessFormat('Sun, January 31st')).toBe('ddd, MMMM Do');
	});

	test('# prepend day of week (full)', () => {
		expect(guessFormat('Sunday, January 31st')).toBe('dddd, MMMM Do');
	});

	test('# append year (short)', () => {
		expect(guessFormat('January 31st, 20')).toBe('MMMM Do, YY');
	});

	test('# append year (short), hh:mm am|pm', () => {
		expect(guessFormat('January 31st, 20 10:00 am')).toBe('MMMM Do, YY hh:mm a');
	});

	test('# append year (short), HH:mm', () => {
		expect(guessFormat('January 31st, 20 10:00')).toBe('MMMM Do, YY HH:mm');
	});

	test('# append year', () => {
		expect(guessFormat('January 31st, 2020')).toBe('MMMM Do, YYYY');
	});

	test('# full date', () => {
		expect(guessFormat('Sunday, January 31st 2020')).toBe('dddd, MMMM Do YYYY');
	});

	test('# full date, hh:mmAM|PM', () => {
		expect(guessFormat('Sunday, January 31st 2020, 09:00AM')).toBe('dddd, MMMM Do YYYY, hh:mmA');
	});

	test('# full date, HH:mm', () => {
		expect(guessFormat('Sunday, January 31st 2020, 09:00')).toBe('dddd, MMMM Do YYYY, HH:mm');
	});

	test('# full date with abbreviated timezone', () => {
		expect(guessFormat('Sunday, January 31st 2020, 09:00 PDT')).toBe('dddd, MMMM Do YYYY, HH:mm z');
	});
});
