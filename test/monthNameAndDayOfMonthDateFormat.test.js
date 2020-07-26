const guessFormat = require('../dist/bundle.js');

describe('Month followed by day of month type dates', () => {
	test('# Mon D', () => {
		expect(guessFormat('Jan 1')).toBe('MMM D');
	});

	test('# Mon DD', () => {
		expect(guessFormat('Jan 01')).toBe('MMM DD');
	});

	test('# parse valid day of month', () => {
		expect(guessFormat('Jan 32')).toBe('MMM D');
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

	test('# append year', () => {
		expect(guessFormat('January 31st, 2020')).toBe('MMMM Do, YYYY');
	});

	test('# full date', () => {
		expect(guessFormat('Sunday, January 31st 2020')).toBe('dddd, MMMM Do YYYY');
	});
});
