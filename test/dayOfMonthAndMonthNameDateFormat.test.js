const guessFormat = require('../dist/bundle.js');

describe('Day of month followed by month name type dates', () => {
	test('# D Mon', () => {
		expect(guessFormat('1 Jan')).toBe('D MMM');
		expect(guessFormat('1 Jan', 'strftime')).toBe('%-e %b');
	});

	test('# D Mon, hh:mm am|pm', () => {
		expect(guessFormat('1 Jan, 10:00 am')).toBe('D MMM, hh:mm a');
		expect(guessFormat('1 Jan, 10:00 am', 'strftime')).toBe('%-e %b, %I:%M %P');
	});

	test('# D Mon, h am|pm', () => {
		expect(guessFormat('1 Jan, 1 am')).toBe('D MMM, h a');
		expect(guessFormat('1 Jan, 1 am', 'strftime')).toBe('%-e %b, %-l %P');
	});

	test('# D Mon, ham|pm', () => {
		expect(guessFormat('1 Jan, 1am')).toBe('D MMM, ha');
		expect(guessFormat('1 Jan, 1am', 'strftime')).toBe('%-e %b, %-l%P');
	});

	test('# Mon D, HH:mm', () => {
		expect(guessFormat('1 Jan, 10:00')).toBe('D MMM, HH:mm');
		expect(guessFormat('1 Jan, 10:00', 'strftime')).toBe('%-e %b, %H:%M');
	});

	test('# Mon D, HH:mm, > 12 hours', () => {
		expect(guessFormat('1 Jan, 13:00')).toBe('D MMM, HH:mm');
		expect(guessFormat('1 Jan, 13:00', 'strftime')).toBe('%-e %b, %H:%M');
	});

	test('# D Mon, hh:mm:ss AM|PM', () => {
		expect(guessFormat('1 Jan, 10:00:59 AM')).toBe('D MMM, hh:mm:ss A');
		expect(guessFormat('1 Jan, 10:00:59 AM', 'strftime')).toBe('%-e %b, %I:%M:%S %p');
	});

	test('# Mon D, HH:mm:ss', () => {
		expect(guessFormat('1 Jan, 10:00:59')).toBe('D MMM, HH:mm:ss');
		expect(guessFormat('1 Jan, 10:00:59', 'strftime')).toBe('%-e %b, %H:%M:%S');
	});

	test('# DD Mon', () => {
		expect(guessFormat('01 Jan')).toBe('DD MMM');
		expect(guessFormat('01 Jan', 'strftime')).toBe('%d %b');
	});

	test('# parse valid day of month', () => {
		expect(() => {
			guessFormat('32 Jan');
		}).toThrow(Error("Couldn't parse date"));
	});

	test('# day of month with ordinal', () => {
		expect(guessFormat('1st Jan')).toBe('Do MMM');
		expect(guessFormat('1st Jan', 'strftime')).toBe('%o %b');
	});

	test('# full month name with D', () => {
		expect(guessFormat('1 January')).toBe('D MMMM');
		expect(guessFormat('1 January', 'strftime')).toBe('%-e %B');
	});

	test('# full month name with DD', () => {
		expect(guessFormat('31 January')).toBe('DD MMMM');
		expect(guessFormat('31 January', 'strftime')).toBe('%d %B');
	});

	test('# full month name, day of month with ordinal', () => {
		expect(guessFormat('31st January')).toBe('Do MMMM');
		expect(guessFormat('31st January', 'strftime')).toBe('%o %B');
	});

	test('# full month name, day of month with ordinal, hhAM|PM', () => {
		expect(guessFormat('31st January, 10AM')).toBe('Do MMMM, hhA');
		expect(guessFormat('31st January, 10AM', 'strftime')).toBe('%o %B, %I%p');
	});

	test('# full month name, day of month with ordinal, hAM|PM', () => {
		expect(guessFormat('31st January, 1AM')).toBe('Do MMMM, hA');
		expect(guessFormat('31st January, 1AM', 'strftime')).toBe('%o %B, %-l%p');
	});

	test('# appended delimiter(s)', () => {
		expect(guessFormat('31st January, ')).toBe('Do MMMM, ');
		expect(guessFormat('31st January, ', 'strftime')).toBe('%o %B, ');
	});

	test('# prepend day of week (shortest)', () => {
		expect(guessFormat('Su, 31st January')).toBe('dd, Do MMMM');
		expect(() => {
			guessFormat('Su, 31st January', 'strftime');
		}).toThrow();
	});

	test('# prepend day of week (short)', () => {
		expect(guessFormat('Sun, 31st January')).toBe('ddd, Do MMMM');
		expect(guessFormat('Sun, 31st January', 'strftime')).toBe('%a, %o %B');
	});

	test('# prepend day of week (full)', () => {
		expect(guessFormat('Sunday, 31st January')).toBe('dddd, Do MMMM');
		expect(guessFormat('Sunday, 31st January', 'strftime')).toBe('%A, %o %B');
	});

	test('# append year (short)', () => {
		expect(guessFormat('31st January, 20')).toBe('Do MMMM, YY');
		expect(guessFormat('31st January, 20', 'strftime')).toBe('%o %B, %y');
	});

	test('# append year (short), hh:mm am|pm', () => {
		expect(guessFormat('31st January, 20 10:00 am')).toBe('Do MMMM, YY hh:mm a');
		expect(guessFormat('31st January, 20 10:00 am', 'strftime')).toBe('%o %B, %y %I:%M %P');
	});

	test('# append year (short), HH:mm', () => {
		expect(guessFormat('31st January, 20 10:00')).toBe('Do MMMM, YY HH:mm');
		expect(guessFormat('31st January, 20 10:00', 'strftime')).toBe('%o %B, %y %H:%M');
	});

	test('# append year', () => {
		expect(guessFormat('31st January, 2020')).toBe('Do MMMM, YYYY');
		expect(guessFormat('31st January, 2020', 'strftime')).toBe('%o %B, %Y');
	});

	test('# full date', () => {
		expect(guessFormat('Sunday, 31st January 2020')).toBe('dddd, Do MMMM YYYY');
		expect(guessFormat('Sunday, 31st January 2020', 'strftime')).toBe('%A, %o %B %Y');
	});

	test('# full date, hhAM|PM', () => {
		expect(guessFormat('Sunday, 31st January 2020, 09:00AM')).toBe('dddd, Do MMMM YYYY, hh:mmA');
		expect(guessFormat('Sunday, 31st January 2020, 09:00AM', 'strftime')).toBe('%A, %o %B %Y, %I:%M%p');
	});

	test('# full date, hhAM|PM', () => {
		expect(guessFormat('Sunday, 31st January 2020, 9AM')).toBe('dddd, Do MMMM YYYY, hA');
		expect(guessFormat('Sunday, 31st January 2020, 9AM', 'strftime')).toBe('%A, %o %B %Y, %-l%p');
	});

	test('# full date, HH:mm', () => {
		expect(guessFormat('Sunday, 31st January 2020, 09:00')).toBe('dddd, Do MMMM YYYY, HH:mm');
		expect(guessFormat('Sunday, 31st January 2020, 09:00', 'strftime')).toBe('%A, %o %B %Y, %H:%M');
	});

	test('# full date with abbreviated timezone', () => {
		expect(guessFormat('Sunday, 31st January 2020, 09:00 IST')).toBe('dddd, Do MMMM YYYY, HH:mm z');
		expect(guessFormat('Sunday, 31st January 2020, 09:00 IST', 'strftime')).toBe('%A, %o %B %Y, %H:%M %Z');
	})
});
