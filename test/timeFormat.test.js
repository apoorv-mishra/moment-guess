const guessFormat = require('../dist/bundle.js');

describe('Time formats', () => {
	test('# hours and mins, colon sep (24 hr format)', () => {
		expect(guessFormat('21:22')).toBe('HH:mm');
		expect(guessFormat('21:22', 'strftime')).toBe('%H:%M');
	});

	test('# hours and minutes with abbreviated timezone (24 hr format)', () => {
		expect(guessFormat('21:22 EST')).toBe('HH:mm z');
		expect(guessFormat('21:22 EST', 'strftime')).toBe('%H:%M %Z');
	});

	test('# hours and mins, dot sep (24 hr format)', () => {
		expect(guessFormat('21.22')).toBe('HH.mm');
		expect(guessFormat('21.22', 'strftime')).toBe('%H.%M');
	});

	test('# hours, mins and secs, colon sep (24 hr format)', () => {
		expect(guessFormat('21:22:23')).toBe('HH:mm:ss');
		expect(guessFormat('21:22:23', 'strftime')).toBe('%H:%M:%S');
	});

	test('# hours, mins and secs, dot sep (24 hr format)', () => {
		expect(guessFormat('21.22.23')).toBe('HH.mm.ss');
		expect(guessFormat('21.22.23', 'strftime')).toBe('%H.%M.%S');
	});

	test('# hours, mins, secs and millis (24 hr format)', () => {
		expect(guessFormat('21:22:23.123')).toBe('HH:mm:ss.SSS');
		expect(guessFormat('21:22:23.123', 'strftime')).toBe('%H:%M:%S.%L');
	});

	test('# complete time (24 hr format)', () => {
		expect(guessFormat('21:22:23.123 +0000')).toBe('HH:mm:ss.SSS ZZ');
		expect(guessFormat('21:22:23.123 +0000', 'strftime')).toBe('%H:%M:%S.%L %z');
	});

	test('# hours and mins, colon sep (12 hr format, AM|PM)', () => {
		expect(guessFormat('10:00 PM')).toBe('hh:mm A');
		expect(guessFormat('10:00 PM', 'strftime')).toBe('%I:%M %p');
	});

	test('# hours and mins, colon sep (12 hr format, am|pm)', () => {
		expect(guessFormat('10:00 am')).toBe('hh:mm a');
		expect(guessFormat('10:00 am', 'strftime')).toBe('%I:%M %P');
	});

	test('# hours and mins, colon sep (12 hr format, am|pm)', () => {
		expect(guessFormat('10:00 AM GMT')).toBe('hh:mm A z');
		expect(guessFormat('10:00 AM GMT', 'strftime')).toBe('%I:%M %p %Z');
	});

	test('# hours, mins, secs colon sep (12 hr format, am|pm)', () => {
		expect(guessFormat('10:00:59 am')).toBe('hh:mm:ss a');
		expect(guessFormat('10:00:59 am', 'strftime')).toBe('%I:%M:%S %P');
	});

	test('# hours, mins, secs dot sep (12 hr format, am|pm)', () => {
		expect(guessFormat('10.00.59 am')).toBe('hh.mm.ss a');
		expect(guessFormat('10.00.59 am', 'strftime')).toBe('%I.%M.%S %P');
	});

	test('# invalid date (12 hr format, am|pm)', () => {
		expect(() => {
			guessFormat('13:00 am')
		}).toThrow(Error("Couldn't parse date"));
	});
});
