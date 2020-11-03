const guessFormat = require('../dist/bundle.js');

describe('Time formats', () => {
	test('# hours and mins, colon sep (24 hr format)', () => {
		expect(guessFormat('21:22')).toBe('HH:mm');
	});

	test('# hours and minutes with abbreviated timezone (24 hr format)', () => {
		expect(guessFormat('21:22 EST')).toBe('HH:mm z');
	});

	test('# hours and mins, dot sep (24 hr format)', () => {
		expect(guessFormat('21.22')).toBe('HH.mm');
	});

	test('# hours, mins and secs, colon sep (24 hr format)', () => {
		expect(guessFormat('21:22:23')).toBe('HH:mm:ss');
	});

	test('# hours, mins and secs, dot sep (24 hr format)', () => {
		expect(guessFormat('21.22.23')).toBe('HH.mm.ss');
	});

	test('# hours, mins, secs and millis (24 hr format)', () => {
		expect(guessFormat('21:22:23.123')).toBe('HH:mm:ss.SSS');
	});

	test('# complete time (24 hr format)', () => {
		expect(guessFormat('21:22:23.123 +0000')).toBe('HH:mm:ss.SSS ZZ');
	});

	test('# hours and mins, colon sep (12 hr format, AM|PM)', () => {
		expect(guessFormat('10:00 PM')).toBe('hh:mm A');
	});

	test('# hours and mins, colon sep (12 hr format, am|pm)', () => {
		expect(guessFormat('10:00 am')).toBe('hh:mm a');
	});

	test('# hours and mins, colon sep (12 hr format, am|pm)', () => {
		expect(guessFormat('10:00 AM GMT')).toBe('hh:mm A z');
	});

	test('# hours, mins, secs colon sep (12 hr format, am|pm)', () => {
		expect(guessFormat('10:00:59 am')).toBe('hh:mm:ss a');
	});

	test('# hours, mins, secs dot sep (12 hr format, am|pm)', () => {
		expect(guessFormat('10.00.59 am')).toBe('hh.mm.ss a');
	});

	test('# invalid date (12 hr format, am|pm)', () => {
		expect(() => {
			guessFormat('13:00 am')
		}).toThrow(Error("Couldn't parse date"));
	});
});
