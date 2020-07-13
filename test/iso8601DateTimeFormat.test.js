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

	test('# calendar date and time with hours and timezone +HH:mm', () => {
		expect(guessFormat('2013-02-08 09+07:00')).toBe('YYYY-MM-DD HHZ');
	});

	test('# calendar date and time with hours and timezone -HHmm', () => {
		expect(guessFormat('2013-02-08 09-0100')).toBe('YYYY-MM-DD HHZZ');
	});

	test('# calendar date and time with hours and timezone Z', () => {
		expect(guessFormat('2013-02-08 09Z')).toBe('YYYY-MM-DD HHZ');
	});

	test('# calendar date and full time with timezone +HH:mm', () => {
		expect(guessFormat('2013-02-08 09:30:26.123+07:00')).toBe('YYYY-MM-DD HH:mm:ss.SSSZ');
	});

	test('# calendar date and full time with timezone +HH', () => {
		expect(guessFormat('2013-02-08 09:30:26.123+07')).toBe('YYYY-MM-DD HH:mm:ss.SSSZ');
	});
});


describe('ISO 8601 basic date time formats', () => {
	test('# basic (short) full date', () => {
		expect(guessFormat('20130208')).toBe('YYYYMMDD');
	});

	test('# basic (short) year+month', () => {
		expect(guessFormat('201303')).toBe('YYYYMM');
	});

	test('# basic (short) year only', () => {
		expect(guessFormat('2013')).toBe('YYYY');
	});

	test('# basic (short) week, weekday', () => {
		expect(guessFormat('2013W065')).toBe('YYYY[W]WWE');
	});

	test('# basic (short) week only', () => {
		expect(guessFormat('2013W06')).toBe('YYYY[W]WW');
	});

	test('# basic (short) ordinal date (year + day-of-year)', () => {
		expect(guessFormat('2013050')).toBe('YYYYDDDD');
	});

	test('# short date and time up to ms, separated by comma', () => {
		expect(guessFormat('20130208T080910,123')).toBe('YYYYMMDDTHHmmss,SSS');
	});

	test('# short date and time up to ms', () => {
		expect(guessFormat('20130208T080910.123')).toBe('YYYYMMDDTHHmmss.SSS');
	});

	test('# short date and time up to seconds', () => {
		expect(guessFormat('20130208T080910')).toBe('YYYYMMDDTHHmmss');
	});

	test('# short date and time up to minutes', () => {
		expect(guessFormat('20130208T0809')).toBe('YYYYMMDDTHHmm');
	});

	test('# short date and time, hours only', () => {
		expect(guessFormat('20130208T08')).toBe('YYYYMMDDTHH');
	});

	test('# short date and time with hours and timezone +HH:mm', () => {
		expect(guessFormat('20130208T09+07:00')).toBe('YYYYMMDDTHHZ');
	});

	test('# short date and time with hours and timezone -HHmm', () => {
		expect(guessFormat('20130208T09-0100')).toBe('YYYYMMDDTHHZZ');
	});

	test('# short date and time with hours and timezone Z', () => {
		expect(guessFormat('20130208T09Z')).toBe('YYYYMMDDTHHZ');
	});

	test('# short date and full time with timezone +HH:mm', () => {
		expect(guessFormat('20130208T093026.123+07:00')).toBe('YYYYMMDDTHHmmss.SSSZ');
	});

	test('# short date and full time with timezone +HH', () => {
		expect(guessFormat('20130208T093026.123+07')).toBe('YYYYMMDDTHHmmss.SSSZ');
	});
});
