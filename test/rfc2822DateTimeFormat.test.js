const guessFormat = require('../dist/bundle.js');

describe('RFC 2822 date time formats', () => {
	test('# complete date and time', () => {
		expect(guessFormat('Mon, 06 Mar 2017 21:22:23 +0000')).toBe('ddd, DD MMM YYYY HH:mm:ss ZZ');
		expect(guessFormat('Mon, 06 Mar 2017 21:22:23 +0000', 'strftime')).toBe('%a, %d %b %Y %H:%M:%S %z');
	});

	test('# omit comma after day of week', () => {
		expect(guessFormat('Mon 06 Mar 2017 21:22:23 z')).toBe('ddd DD MMM YYYY HH:mm:ss [z]');
		expect(guessFormat('Mon 06 Mar 2017 21:22:23 z', 'strftime')).toBe('%a %d %b %Y %H:%M:%S z');
	});

	test('# omit day of week', () => {
		expect(guessFormat('06 Mar 2017 21:22:23 Z')).toBe('DD MMM YYYY HH:mm:ss [Z]');
		expect(guessFormat('06 Mar 2017 21:22:23 Z', 'strftime')).toBe('%d %b %Y %H:%M:%S Z');
	});

	test('# single digit day of month', () => {
		expect(guessFormat('6 Mar 2017 21:22:23 GMT')).toBe('D MMM YYYY HH:mm:ss z');
		expect(guessFormat('6 Mar 2017 21:22:23 GMT', 'strftime')).toBe('%-e %b %Y %H:%M:%S %Z');
	});

	test('# two digit year', () => {
		expect(guessFormat('6 Mar 17 21:22:23 UT')).toBe('D MMM YY HH:mm:ss z');
		expect(guessFormat('6 Mar 17 21:22:23 UT', 'strftime')).toBe('%-e %b %y %H:%M:%S %Z');
	});

	test('# omit seconds from time', () => {
		expect(guessFormat('6 Mar 17 21:22 UT')).toBe('D MMM YY HH:mm z');
		expect(guessFormat('6 Mar 17 21:22 UT', 'strftime')).toBe('%-e %b %y %H:%M %Z');
	});
});
