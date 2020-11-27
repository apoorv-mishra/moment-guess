const guessFormat = require('../dist/bundle.js');

describe('Slash, dot or dash delimited date formats', () => {
	test('# YYYY/MM/DD', () => {
		expect(guessFormat('2020/01/01')).toBe('YYYY/MM/DD');
		expect(guessFormat('2020/01/01', 'strftime')).toBe('%Y/%m/%d');
	});

	test('# YYYY/MM/DD HH:mm z', () => {
		expect(guessFormat('2020/01/01 17:00 IST')).toBe('YYYY/MM/DD HH:mm z');
		expect(guessFormat('2020/01/01 17:00 IST', 'strftime')).toBe('%Y/%m/%d %H:%M %Z');
	});

	test('# YYYY/MM/DD hh:mm A z', () => {
		expect(guessFormat('2020/01/01 10:00 AM IST')).toBe('YYYY/MM/DD hh:mm A z');
		expect(guessFormat('2020/01/01 10:00 AM IST', 'strftime')).toBe('%Y/%m/%d %I:%M %p %Z');
	});

	test('# YYYY/MM/DD h A z', () => {
		expect(guessFormat('2020/01/01 1 AM IST')).toBe('YYYY/MM/DD h A z');
		expect(guessFormat('2020/01/01 1 AM IST', 'strftime')).toBe('%Y/%m/%d %-l %p %Z');
	});

	test('# YYYY/MM/DD hA z', () => {
		expect(guessFormat('2020/01/01 1AM IST')).toBe('YYYY/MM/DD hA z');
		expect(guessFormat('2020/01/01 1AM IST', 'strftime')).toBe('%Y/%m/%d %-l%p %Z');
	});

	test('# YYYY.MM.DD', () => {
		expect(guessFormat('2020.01.01')).toBe('YYYY.MM.DD');
		expect(guessFormat('2020.01.01', 'strftime')).toBe('%Y.%m.%d');
	});

	test('# YYYY-MM-DD', () => {
		expect(guessFormat('2020-01-01')).toBe('YYYY-MM-DD');
		expect(guessFormat('2020-01-01', 'strftime')).toBe('%Y-%m-%d');
	});

	test('# YYYY/MM', () => {
		expect(guessFormat('2020/01')).toBe('YYYY/MM');
		expect(guessFormat('2020/01', 'strftime')).toBe('%Y/%m');
	});

	test('# YYYY.MM', () => {
		expect(guessFormat('2020.01')).toBe('YYYY.MM');
		expect(guessFormat('2020.01', 'strftime')).toBe('%Y.%m');
	});

	test('# YYYY-MM', () => {
		expect(guessFormat('2020-01')).toBe('YYYY-MM');
		expect(guessFormat('2020-01', 'strftime')).toBe('%Y-%m');
	});

	test('# YYYY/M/D', () => {
		expect(guessFormat('2020/1/1')).toBe('YYYY/M/D');
		expect(() => guessFormat('2020/1/1', 'strftime')).toThrow();
	});

	test('# YYYY.M.D', () => {
		expect(guessFormat('2020.1.1')).toBe('YYYY.M.D');
		expect(() => guessFormat('2020.1.1', 'strftime')).toThrow();
	});

	test('# YYYY-M-D', () => {
		expect(guessFormat('2020-1-1')).toBe('YYYY-M-D');
		expect(() => guessFormat('2020-1-1', 'strftime')).toThrow();
	});

	test('# YYYY/M', () => {
		expect(guessFormat('2020/1')).toBe('YYYY/M');
		expect(() => guessFormat('2020/1', 'strftime')).toThrow();
	});

	test('# YYYY.M', () => {
		expect(guessFormat('2020.1')).toBe('YYYY.M');
		expect(() => guessFormat('2020.1', 'strftime')).toThrow();
	});

	test('# YYYY-M', () => {
		expect(guessFormat('2020-1')).toBe('YYYY-M');
		expect(() => guessFormat('2020-1', 'strftime')).toThrow();
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
		let result = guessFormat('01/02/2020');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM/DD/YYYY', 'DD/MM/YYYY']));

		result = guessFormat('01/02/2020', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%d/%m/%Y", "%m/%d/%Y"]));

	});

	test('# MM, DD in range [01, 12] dot delimited', () => {
		let result = guessFormat('01.02.2020');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM.DD.YYYY', 'DD.MM.YYYY']));

		result = guessFormat('01.02.2020', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%d.%m.%Y", "%m.%d.%Y"]));

	});

	test('# MM, DD in range [01, 12] dash delimited', () => {
		let result = guessFormat('01-02-2020');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM-DD-YYYY', 'DD-MM-YYYY']));

		result = guessFormat('01-02-2020', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%d-%m-%Y", "%m-%d-%Y"]));

	});

	test('# MM in range [01, 12], DD in range [13, 31] slash delimted', () => {
		expect(guessFormat('01/31/2020')).toBe('MM/DD/YYYY');
		expect(guessFormat('01/31/2020', 'strftime')).toBe('%m/%d/%Y');
	});

	test('# MM in range [01, 12], DD in range [13, 31] dot delimted', () => {
		expect(guessFormat('01.31.2020')).toBe('MM.DD.YYYY');
		expect(guessFormat('01.31.2020', 'strftime')).toBe('%m.%d.%Y');
	});

	test('# MM in range [01, 12], DD in range [13, 31] dash delimted', () => {
		expect(guessFormat('01-31-2020')).toBe('MM-DD-YYYY');
		expect(guessFormat('01-31-2020', 'strftime')).toBe('%m-%d-%Y');
	});

	test('# DD/MM/YYYY', () => {
		expect(guessFormat('13/01/2020')).toBe('DD/MM/YYYY');
		expect(guessFormat('13/01/2020', 'strftime')).toBe('%d/%m/%Y');
	});

	test('# DD/MM/YYYY hh:mm a z', () => {
		expect(guessFormat('13/01/2020 01:00 pm EST')).toBe('DD/MM/YYYY hh:mm a z');
		expect(guessFormat('13/01/2020 01:00 pm EST', 'strftime')).toBe('%d/%m/%Y %I:%M %P %Z');
	});

	test('# DD.MM.YYYY', () => {
		expect(guessFormat('13.01.2020')).toBe('DD.MM.YYYY');
		expect(guessFormat('13.01.2020', 'strftime')).toBe('%d.%m.%Y');
	});

	test('# DD-MM-YYYY', () => {
		expect(guessFormat('13-01-2020')).toBe('DD-MM-YYYY');
		expect(guessFormat('13-01-2020', 'strftime')).toBe('%d-%m-%Y');
	});

	test('# MM, DD out of range', () => {
		expect(() => {
			guessFormat('99/99/2020')
		}).toThrow(new Error("Couldn't parse date"));
	});

	test('# MM, DD, YY in range [01, 12] slash delimited', () => {
		let result = guessFormat('01/02/03');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY/MM/DD', 'MM/DD/YY', 'DD/MM/YY']));

		result = guessFormat('01/02/03', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y/%m/%d", "%d/%m/%y", "%m/%d/%y"]));

	});

	test('# MM, DD, YY in range [01, 12] slash delimited with time', () => {
		let result = guessFormat('01/02/03 10:00 PM');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY/MM/DD hh:mm A', 'MM/DD/YY hh:mm A', 'DD/MM/YY hh:mm A']));

		result = guessFormat('01/02/03 10:00 PM', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y/%m/%d %I:%M %p", "%d/%m/%y %I:%M %p", "%m/%d/%y %I:%M %p"]));

	});

	test('# MM, DD, YY in range [01, 12] dot delimited', () => {
		let result = guessFormat('01.02.03');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(4);
		expect(result).toEqual(expect.arrayContaining(['YY.MM.DD', 'MM.DD.YY', 'DD.MM.YY', 'HH.mm.ss']));

		result = guessFormat('01.02.03', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(4);
		expect(result).toEqual(expect.arrayContaining(["%y.%m.%d", "%d.%m.%y", "%m.%d.%y", "%H.%M.%S"]));
	});

	test('# MM, DD, YY in range [01, 12] dot delimited with colon delimited time', () => {
		let result = guessFormat('01.02.03 10:00 PDT');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY.MM.DD HH:mm z', 'MM.DD.YY HH:mm z', 'DD.MM.YY HH:mm z']));

		result = guessFormat('01.02.03 10:00 PDT', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y.%m.%d %H:%M %Z", "%d.%m.%y %H:%M %Z", "%m.%d.%y %H:%M %Z"]));

	});

	test('# MM, DD, YY in range [01, 12] dot delimited with dot delimited time', () => {
		let result = guessFormat('01.02.03 10.00 PDT');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY.MM.DD HH.mm z', 'MM.DD.YY HH.mm z', 'DD.MM.YY HH.mm z']));

		result = guessFormat('01.02.03 10.00 PDT', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y.%m.%d %H.%M %Z", "%d.%m.%y %H.%M %Z", "%m.%d.%y %H.%M %Z"]));
	});

	test('# MM, DD, YY in range [01, 12] dash delimited', () => {
		let result = guessFormat('01-02-03');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY-MM-DD', 'MM-DD-YY', 'DD-MM-YY']));

		result = guessFormat('01-02-03', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y-%m-%d", "%d-%m-%y", "%m-%d-%y"]));
	})

	test('# YY in range [13, 31] placed first, slash delimited', () => {
		let result = guessFormat('13/02/01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['YY/MM/DD', 'DD/MM/YY']));

		result = guessFormat('13/02/01', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%y/%m/%d", "%d/%m/%y"]));
	});

	test('# YY in range [13, 31] placed first, dot delimited', () => {
		let result = guessFormat('13.02.01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY.MM.DD', 'DD.MM.YY', 'HH.mm.ss']));

		result = guessFormat('13.02.01', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y.%m.%d", "%d.%m.%y", "%H.%M.%S"]));

	});

	test('# DD/MM/YY', () => {
		expect(guessFormat('31/01/70')).toBe('DD/MM/YY');
		expect(guessFormat('31/01/70', 'strftime')).toBe('%d/%m/%y');
	});

	test('# DD.MM.YY', () => {
		expect(guessFormat('31.01.70')).toBe('DD.MM.YY');
		expect(guessFormat('31.01.70', 'strftime')).toBe('%d.%m.%y');
	});

	test('# DD-MM-YY', () => {
		expect(guessFormat('31-01-70')).toBe('DD-MM-YY');
		expect(guessFormat('31-01-70', 'strftime')).toBe('%d-%m-%y');
	});

	test('# MM/DD/YY', () => {
		expect(guessFormat('12/31/70')).toBe('MM/DD/YY');
		expect(guessFormat('12/31/70', 'strftime')).toBe('%m/%d/%y');
	});

	test('# MM.DD.YY', () => {
		expect(guessFormat('12.31.70')).toBe('MM.DD.YY');
		expect(guessFormat('12.31.70', 'strftime')).toBe('%m.%d.%y');
	});

	test('# MM-DD-YY', () => {
		expect(guessFormat('12-31-70')).toBe('MM-DD-YY');
		expect(guessFormat('12-31-70', 'strftime')).toBe('%m-%d-%y');
	});

	test('# YY/MM/DD', () => {
		expect(guessFormat('70/12/31')).toBe('YY/MM/DD');
		expect(guessFormat('70/12/31', 'strftime')).toBe('%y/%m/%d');
	});

	test('# YY.MM.DD', () => {
		expect(guessFormat('70.12.31')).toBe('YY.MM.DD');
		expect(guessFormat('70.12.31', 'strftime')).toBe('%y.%m.%d');
	});

	test('# YY-MM-DD', () => {
		expect(guessFormat('70-12-31')).toBe('YY-MM-DD');
		expect(guessFormat('70-12-31', 'strftime')).toBe('%y-%m-%d');
	});

	test('# MM, DD in range[01, 12] short form, slash delimited', () => {
		let result = guessFormat('01/01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY/MM', 'DD/MM', 'MM/DD']));

		result = guessFormat('01/01', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y/%m", "%d/%m", "%m/%d"]));
	});

	test('# MM, DD in range[01, 12] short form, dot delimited', () => {
		let result = guessFormat('01.01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(4);
		expect(result).toEqual(expect.arrayContaining(['YY.MM', 'DD.MM', 'MM.DD', 'HH.mm']));

		result = guessFormat('01.01', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(4);
		expect(result).toEqual(expect.arrayContaining(["%y.%m", "%d.%m", "%m.%d", "%H.%M"]));
	});

	test('# MM, DD in range[01, 12] short form, dash delimited', () => {
		let result = guessFormat('01-01');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(['YY-MM', 'DD-MM', 'MM-DD']));

		result = guessFormat('01-01', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining(["%y-%m", "%d-%m", "%m-%d"]));
	});

	test('# MM/DD', () => {
		expect(guessFormat('12/31')).toBe('MM/DD');
		expect(guessFormat('12/31', 'strftime')).toBe('%m/%d');
	});

	test('# MM.DD', () => {
		let result = guessFormat('12.31');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['MM.DD', 'HH.mm']));

		result = guessFormat('12.31', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%m.%d", "%H.%M"]));
	});

	test('# MM-DD', () => {
		expect(guessFormat('12-31')).toBe('MM-DD');
		expect(guessFormat('12-31', 'strftime')).toBe('%m-%d');
	});

	test('# DD/MM | YY/MM', () => {
		let result = guessFormat('31/12');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['DD/MM', 'YY/MM']));

		result = guessFormat('31/12', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%y/%m", "%d/%m"]));
	});

	test('# DD.MM | YY.MM', () => {
		let result = guessFormat('31.12');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['DD.MM', 'YY.MM']));

		result = guessFormat('31.12', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%y.%m", "%d.%m"]));
	});

	test('# DD-MM | YY-MM', () => {
		let result = guessFormat('31-12');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(['DD-MM', 'YY-MM']));

		result = guessFormat('31-12', 'strftime');
		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
		expect(result).toEqual(expect.arrayContaining(["%y-%m", "%d-%m"]));
	});
});
