const guessFormat = require('../dist/bundle.js');

describe('Slash, dot or dash delimited date formats', () => {
	test('# YYYY/MM/DD', () => {
		expect(guessFormat('2020/01/01')).toBe('YYYY/MM/DD');
	});

	test('# YYYY/MM/DD HH:mm z', () => {
		expect(guessFormat('2020/01/01 17:00 IST')).toBe('YYYY/MM/DD HH:mm z');
	});

	test('# YYYY/MM/DD hh:mm A z', () => {
		expect(guessFormat('2020/01/01 10:00 AM IST')).toBe('YYYY/MM/DD hh:mm A z');
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

	// MM can be in [01, 12] | M can be in [1, 12]
	// DD can be in [01, 31] | D can be in [1, 31]
	// YYYY can be in [0000, 9999] | YY can be in [00, 99]

	test('# MM, DD in range [01, 12] slash delimited', () => {
		const result = guessFormat('01/02/2020');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM/DD/YYYY', 'DD/MM/YYYY']));
	});

	test('# MM, DD in range [01, 12] dot delimited', () => {
		const result = guessFormat('01.02.2020');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM.DD.YYYY', 'DD.MM.YYYY']));
	});

	test('# MM, DD in range [01, 12] dash delimited', () => {
		const result = guessFormat('01-02-2020');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM-DD-YYYY', 'DD-MM-YYYY']));
	});

	test('# MM in range [01, 12], DD in range [13, 31] slash delimted', () => {
		expect(guessFormat('01/31/2020')).toBe('MM/DD/YYYY');
	});

	test('# MM in range [01, 12], DD in range [13, 31] dot delimted', () => {
		expect(guessFormat('01.31.2020')).toBe('MM.DD.YYYY');
	});

	test('# MM in range [01, 12], DD in range [13, 31] dash delimted', () => {
		expect(guessFormat('01-31-2020')).toBe('MM-DD-YYYY');
	});

	test('# DD/MM/YYYY', () => {
		expect(guessFormat('13/01/2020')).toBe('DD/MM/YYYY');
	});

	test('# DD/MM/YYYY hh:mm a z', () => {
		expect(guessFormat('13/01/2020 01:00 pm EST')).toBe('DD/MM/YYYY hh:mm a z');
	});

	test('# DD.MM.YYYY', () => {
		expect(guessFormat('13.01.2020')).toBe('DD.MM.YYYY');
	});

	test('# DD-MM-YYYY', () => {
		expect(guessFormat('13-01-2020')).toBe('DD-MM-YYYY');
	});

	test('# MM, DD out of range', () => {
		expect(() => {
			guessFormat('99/99/2020')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# MM, DD, YY in range [01, 12] slash delimited', () => {
		const result = guessFormat('01/02/03');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY/MM/DD', 'MM/DD/YY', 'DD/MM/YY']));
	});

	test('# MM, DD, YY in range [01, 12] slash delimited with time', () => {
		const result = guessFormat('01/02/03 10:00 PM');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY/MM/DD hh:mm A', 'MM/DD/YY hh:mm A', 'DD/MM/YY hh:mm A']));
	});

	test('# MM, DD, YY in range [01, 12] dot delimited', () => {
		const result = guessFormat('01.02.03');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(4);
		expect(result).toEqual(expect.arrayContaining(['YY.MM.DD', 'MM.DD.YY', 'DD.MM.YY', 'HH.mm.ss']));
	});

	test('# MM, DD, YY in range [01, 12] dot delimited with colon delimited time', () => {
		const result = guessFormat('01.02.03 10:00 PDT');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY.MM.DD HH:mm z', 'MM.DD.YY HH:mm z', 'DD.MM.YY HH:mm z']));
	});

	test('# MM, DD, YY in range [01, 12] dot delimited with dot delimited time', () => {
		const result = guessFormat('01.02.03 10.00 PDT');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY.MM.DD HH.mm z', 'MM.DD.YY HH.mm z', 'DD.MM.YY HH.mm z']));
	});

	test('# MM, DD, YY in range [01, 12] dash delimited', () => {
		const result = guessFormat('01-02-03');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY-MM-DD', 'MM-DD-YY', 'DD-MM-YY']));
	})

	test('# YY in range [13, 31] placed first, slash delimited', () => {
		const result = guessFormat('13/02/01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['YY/MM/DD', 'DD/MM/YY']));
	});

	test('# YY in range [13, 31] placed first, dot delimited', () => {
		const result = guessFormat('13.02.01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY.MM.DD', 'DD.MM.YY', 'HH.mm.ss']));
	});

	test('# DD/MM/YY', () => {
		expect(guessFormat('31/01/70')).toBe('DD/MM/YY');
	});

	test('# DD.MM.YY', () => {
		expect(guessFormat('31.01.70')).toBe('DD.MM.YY');
	});

	test('# DD-MM-YY', () => {
		expect(guessFormat('31-01-70')).toBe('DD-MM-YY');
	});

	test('# MM/DD/YY', () => {
		expect(guessFormat('12/31/70')).toBe('MM/DD/YY');
	});

	test('# MM.DD.YY', () => {
		expect(guessFormat('12.31.70')).toBe('MM.DD.YY');
	});

	test('# MM-DD-YY', () => {
		expect(guessFormat('12-31-70')).toBe('MM-DD-YY');
	});

	test('# YY/MM/DD', () => {
		expect(guessFormat('70/12/31')).toBe('YY/MM/DD');
	});

	test('# YY.MM.DD', () => {
		expect(guessFormat('70.12.31')).toBe('YY.MM.DD');
	});

	test('# YY-MM-DD', () => {
		expect(guessFormat('70-12-31')).toBe('YY-MM-DD');
	});

	test('# MM, DD in range[01, 12] short form, slash delimited', () => {
		const result = guessFormat('01/01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY/MM', 'DD/MM', 'MM/DD']));
	});

	test('# MM, DD in range[01, 12] short form, dot delimited', () => {
		const result = guessFormat('01.01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(4);
		expect(result).toEqual(expect.arrayContaining(['YY.MM', 'DD.MM', 'MM.DD', 'HH.mm']));
	});

	test('# MM, DD in range[01, 12] short form, dash delimited', () => {
		const result = guessFormat('01-01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY-MM', 'DD-MM', 'MM-DD']));
	});

	test('# MM/DD', () => {
		expect(guessFormat('12/31')).toBe('MM/DD');
	});

	test('# MM.DD', () => {
		const result = guessFormat('12.31');

		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM.DD', 'HH.mm']));
	});

	test('# MM-DD', () => {
		expect(guessFormat('12-31')).toBe('MM-DD');
	});

	test('# DD/MM | YY/MM', () => {
		const result = guessFormat('31/12');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['DD/MM', 'YY/MM']));
	});

	test('# DD.MM | YY.MM', () => {
		const result = guessFormat('31.12');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['DD.MM', 'YY.MM']));
	});

	test('# DD-MM | YY-MM', () => {
		const result = guessFormat('31-12');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['DD-MM', 'YY-MM']));
	});
});
