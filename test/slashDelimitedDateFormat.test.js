const guessFormat = require('../dist/bundle.js');

describe('Slash, dot or dash delimited date formats', () => {
	test('# YYYY/MM/DD', () => {
		expect(guessFormat('2020/01/01')).toBe('YYYY/MM/DD');
	});

	test('# YYYY.MM.DD', () => {
		expect(guessFormat('2020.01.01')).toBe('YYYY.MM.DD');
	});

	test('# YYYY-MM-DD', () => {
		expect(guessFormat('2020-01-01')).toBe('YYYY-MM-DD');
	});

	test('# YYYY/MM', () => {
		expect(guessFormat('2020/01')).toBe('YYYY/MM');
	});

	test('# YYYY.MM', () => {
		expect(guessFormat('2020.01')).toBe('YYYY.MM');
	});

	test('# YYYY-MM', () => {
		expect(guessFormat('2020-01')).toBe('YYYY-MM');
	});

	test('# YYYY/M/D', () => {
		expect(guessFormat('2020/1/1')).toBe('YYYY/M/D');
	});

	test('# YYYY.M.D', () => {
		expect(guessFormat('2020.1.1')).toBe('YYYY.M.D');
	});

	test('# YYYY-M-D', () => {
		expect(guessFormat('2020-1-1')).toBe('YYYY-M-D');
	});

	test('# YYYY/M', () => {
		expect(guessFormat('2020/1')).toBe('YYYY/M');
	});

	test('# YYYY.M', () => {
		expect(guessFormat('2020.1')).toBe('YYYY.M');
	});

	test('# YYYY-M', () => {
		expect(guessFormat('2020-1')).toBe('YYYY-M');
	});

	test('# error on month overflow', () => {
		expect(() => {
			guessFormat('2020/13/01')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# error on month underflow', () => {
		expect(() => {
			guessFormat('2020/0/01')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# error on day overflow', () => {
		expect(() => {
			guessFormat('2020/13/32')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# error on day underflow', () => {
		expect(() => {
			guessFormat('2020/13/0')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# error on month underflow(short date)', () => {
		expect(() => {
			guessFormat('2020/00')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# error on month overflow(short date)', () => {
		expect(() => {
			guessFormat('2020/13')
		}).toThrow(new Error("Couldn't parse date"));
	});
});
