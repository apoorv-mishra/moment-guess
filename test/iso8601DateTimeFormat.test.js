const guessFormat = require('../dist/bundle.js');

describe('ISO 8601 extended date time formats', () => {
	test('# calendar date part', () => {
		expect(guessFormat('2020-10-10')).toBe('YYYY-MM-DD');
	});

	test('# month date part', () => {
		expect(guessFormat('2020-10')).toBe('YYYY-MM');
	});

	test('# week date part', () => {
		expect(guessFormat('2013-W06-5')).toBe('YYYY-[W]WW-E');
	});

	test('# ordinal date part', () => {
		expect(guessFormat('2013-039')).toBe('YYYY-DDDD');
	});

	test('# hour time part separated by a T', () => {
		expect(guessFormat('2013-02-08T09')).toBe('YYYY-MM-DDTHH');
	});

	test('# hour time part separated by a space', () => {
		expect(guessFormat('2013-02-08 09')).toBe('YYYY-MM-DD HH');
	});

	test('# hour and minute time part', () => {
		expect(guessFormat('2013-02-08T09:30')).toBe('YYYY-MM-DDTHH:mm');
	});

	test('# hour, minute, and second time part', () => {
		expect(guessFormat('2013-02-08T09:30:26')).toBe('YYYY-MM-DDTHH:mm:ss');
	});

	test('# hour, minute, second, and millisecond time part', () => {
		expect(guessFormat('2013-02-08T09:30:26.123')).toBe('YYYY-MM-DDTHH:mm:ss.SSS');
	});

	test('# hour, minute, second, and millisecond time part, milliseconds separated by a comma', () => {
		expect(guessFormat('2013-02-08T09:30:26,123')).toBe('YYYY-MM-DDTHH:mm:ss,SSS');
	});

	test('# calendar date part and hour time part', () => {
		expect(guessFormat('2013-02-08 09')).toBe('YYYY-MM-DD HH');
	});

	test('# week date part and hour time part', () => {
		expect(guessFormat('2013-W06-5 09')).toBe('YYYY-[W]WW-E HH');
	});

	test('# ordinal date part and hour time part', () => {
		expect(guessFormat('2013-039 09')).toBe('YYYY-DDDD HH');
	});

	test('# timezone +-HH:mm', () => {
		expect(guessFormat('2013-02-08 09+07:00')).toBe('YYYY-MM-DD HHZ');
	});

	test('# timezone +-HHmm', () => {
		expect(guessFormat('2013-02-08 09-0100')).toBe('YYYY-MM-DD HHZZ');
	});

	test('# timezone Z', () => {
		expect(guessFormat('2013-02-08 09Z')).toBe('YYYY-MM-DD HHZ');
	});

	test('# timezone +-HH:mm with millis', () => {
		expect(guessFormat('2013-02-08 09:30:26.123+07:00')).toBe('YYYY-MM-DD HH:mm:ss.SSSZ');
	});

	test('# timezone +-HH with millis', () => {
		expect(guessFormat('2013-02-08 09:30:26.123+07')).toBe('YYYY-MM-DD HH:mm:ss.SSSZ');
	});


});
