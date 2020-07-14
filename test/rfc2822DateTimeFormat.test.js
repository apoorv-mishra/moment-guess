const guessFormat = require('../dist/bundle.js');

describe('RFC 2822 date time formats', () => {
	test('# complete date and time', () => {
		expect(guessFormat('Mon, 06 Mar 2017 21:22:23 +0000')).toBe('ddd, DD MMM YYYY HH:mm:ss ZZ');
	});

	test('# omit comma after day of week', () => {
		expect(guessFormat('Mon 06 Mar 2017 21:22:23 z')).toBe('ddd DD MMM YYYY HH:mm:ss ZZ');
	});

	test('# omit day of week', () => {
		expect(guessFormat('06 Mar 2017 21:22:23 Z')).toBe('DD MMM YYYY HH:mm:ss ZZ');
	});

	test('# single digit day of month', () => {
		expect(guessFormat('6 Mar 2017 21:22:23 GMT')).toBe('D MMM YYYY HH:mm:ss ZZ');
	});

	test('# two digit year', () => {
		expect(guessFormat('6 Mar 17 21:22:23 UT')).toBe('D MMM YY HH:mm:ss ZZ');
	});

	test('# omit seconds from time', () => {
		expect(guessFormat('6 Mar 17 21:22 UT')).toBe('D MMM YY HH:mm ZZ');
	});
});
