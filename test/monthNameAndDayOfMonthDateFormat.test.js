const guessFormat = require('../dist/bundle.js');

describe('Month followed by day of month type dates', () => {
	test('# Mon D', () => {
		expect(guessFormat('Jan 1')).toBe('MMM D');
		expect(guessFormat('Jan 1', 'strftime')).toBe('%b %-e');
	});

	test('# Mon D, hh:mm am|pm', () => {
		expect(guessFormat('Jan 1, 10:00 am')).toBe('MMM D, hh:mm a');
		expect(guessFormat('Jan 1, 10:00 am', 'strftime')).toBe('%b %-e, %I:%M %P');
	});

	test('# Mon D, HH:mm', () => {
		expect(guessFormat('Jan 1, 10:00')).toBe('MMM D, HH:mm');
		expect(guessFormat('Jan 1, 10:00', 'strftime')).toBe('%b %-e, %H:%M');
	});

	test('# Mon D, HH:mm, > 12 hours', () => {
		expect(guessFormat('Jan 1, 13:00')).toBe('MMM D, HH:mm');
		expect(guessFormat('Jan 1, 13:00', 'strftime')).toBe('%b %-e, %H:%M');
	});

	test('# Mon D, hh:mm:ss AM|PM', () => {
		expect(guessFormat('Jan 1, 10:00:59 AM')).toBe('MMM D, hh:mm:ss A');
		expect(guessFormat('Jan 1, 10:00:59 AM', 'strftime')).toBe('%b %-e, %I:%M:%S %p');
	});

	test('# Mon D, HH:mm:ss', () => {
		expect(guessFormat('Jan 1, 10:00:59')).toBe('MMM D, HH:mm:ss');
		expect(guessFormat('Jan 1, 10:00:59', 'strftime')).toBe('%b %-e, %H:%M:%S');
	});

	test('# Mon DD', () => {
		expect(guessFormat('Jan 01')).toBe('MMM DD');
		expect(guessFormat('Jan 01', 'strftime')).toBe('%b %d');
	});

	test('# parse valid day of month', () => {
		expect(() => {
			guessFormat('Jan 32')
		}).toThrow(Error("Couldn't parse date"));
	});

	test('# day of month with ordinal', () => {
		expect(guessFormat('Jan 1st')).toBe('MMM Do');
		expect(guessFormat('Jan 1st', 'strftime')).toBe('%b %o');
	});

	test('# full month name with D', () => {
		expect(guessFormat('January 1')).toBe('MMMM D');
		expect(guessFormat('January 1', 'strftime')).toBe('%B %-e');
	});

	test('# full month name with DD', () => {
		expect(guessFormat('January 31')).toBe('MMMM DD');
		expect(guessFormat('January 31', 'strftime')).toBe('%B %d');
	});

	test('# full month name, day of month with ordinal', () => {
		expect(guessFormat('January 31st')).toBe('MMMM Do');
		expect(guessFormat('January 31st', 'strftime')).toBe('%B %o');
	});

	test('# full month name, day of month with ordinal, hhAM|PM', () => {
		expect(guessFormat('January 31st, 10AM')).toBe('MMMM Do, hhA');
		expect(guessFormat('January 31st, 10AM', 'strftime')).toBe('%B %o, %I%p');
	});

	test('# appended delimiter(s)', () => {
		expect(guessFormat('January 31st, ')).toBe('MMMM Do, ');
		expect(guessFormat('January 31st, ', 'strftime')).toBe('%B %o, ');
	});

	test('# prepend day of week (shortest)', () => {
		expect(guessFormat('Su, January 31st')).toBe('dd, MMMM Do');
		expect(() => guessFormat('Su, January 31st', 'strftime')).toThrow();
	});

	test('# prepend day of week (short)', () => {
		expect(guessFormat('Sun, January 31st')).toBe('ddd, MMMM Do');
		expect(guessFormat('Sun, January 31st', 'strftime')).toBe('%a, %B %o');
	});

	test('# prepend day of week (full)', () => {
		expect(guessFormat('Sunday, January 31st')).toBe('dddd, MMMM Do');
		expect(guessFormat('Sunday, January 31st', 'strftime')).toBe('%A, %B %o');
	});

	test('# append year (short)', () => {
		expect(guessFormat('January 31st, 20')).toBe('MMMM Do, YY');
		expect(guessFormat('January 31st, 20', 'strftime')).toBe('%B %o, %y');
	});

	test('# append year (short), hh:mm am|pm', () => {
		expect(guessFormat('January 31st, 20 10:00 am')).toBe('MMMM Do, YY hh:mm a');
		expect(guessFormat('January 31st, 20 10:00 am', 'strftime')).toBe('%B %o, %y %I:%M %P');
	});

	test('# append year (short), HH:mm', () => {
		expect(guessFormat('January 31st, 20 10:00')).toBe('MMMM Do, YY HH:mm');
		expect(guessFormat('January 31st, 20 10:00', 'strftime')).toBe('%B %o, %y %H:%M');
	});

	test('# append year', () => {
		expect(guessFormat('January 31st, 2020')).toBe('MMMM Do, YYYY');
		expect(guessFormat('January 31st, 2020', 'strftime')).toBe('%B %o, %Y');
	});

	test('# full date', () => {
		expect(guessFormat('Sunday, January 31st 2020')).toBe('dddd, MMMM Do YYYY');
		expect(guessFormat('Sunday, January 31st 2020', 'strftime')).toBe('%A, %B %o %Y');
	});

	test('# full date, hh:mmAM|PM', () => {
		expect(guessFormat('Sunday, January 31st 2020, 09:00AM')).toBe('dddd, MMMM Do YYYY, hh:mmA');
		expect(guessFormat('Sunday, January 31st 2020, 09:00AM', 'strftime')).toBe('%A, %B %o %Y, %I:%M%p');
	});

	test('# full date, HH:mm', () => {
		expect(guessFormat('Sunday, January 31st 2020, 09:00')).toBe('dddd, MMMM Do YYYY, HH:mm');
		expect(guessFormat('Sunday, January 31st 2020, 09:00', 'strftime')).toBe('%A, %B %o %Y, %H:%M');
	});

	test('# full date with abbreviated timezone', () => {
		expect(guessFormat('Sunday, January 31st 2020, 09:00 PDT')).toBe('dddd, MMMM Do YYYY, HH:mm z');
		expect(guessFormat('Sunday, January 31st 2020, 09:00 PDT', 'strftime')).toBe('%A, %B %o %Y, %H:%M %Z');
	});
});
