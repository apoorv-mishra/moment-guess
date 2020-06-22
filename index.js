const iso8601Regex1 = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
const iso8601Regex2 = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
const iso8601Dates = [
	['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	['GGGG-[W]WW', /\d{4}-W\d\d/],
	['YYYY-DDD', /\d{4}-\d{3}/],
	['YYYY-MM', /\d{4}-\d\d/],
	['YYYYYYMMDD', /[+-]\d{10}/],
	['YYYYMMDD', /\d{8}/],
	['GGGG[W]WWE', /\d{4}W\d{3}/],
	['GGGG[W]WW', /\d{4}W\d{2}/],
	['YYYYDDD', /\d{7}/],
	['YYYYMM', /\d{6}/],
	['YYYY', /\d{4}/],
];
const iso8601Times = [
	['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	['HH:mm:ss', /\d\d:\d\d:\d\d/],
	['HH:mm', /\d\d:\d\d/],
	['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	['HHmmss', /\d\d\d\d\d\d/],
	['HHmm', /\d\d\d\d/],
	['HH', /\d\d/],
];
const iso8601TzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

export default function guessFormat(date) {
	let format = '';

	// Test for ISO 8601
	if (iso8601Regex1.test(date) || iso8601Regex2.test(date)) {
		const match = iso8601Regex1.exec(date) || iso8601Regex2.exec(date);

		for (let i = 0; i < iso8601Dates.length; i++) {
			if (iso8601Dates[i][1].test(match[1])) {
				format += iso8601Dates[i][0];
				break;
			}
		}

		if (match[3]) {
			for (let i = 0; i < iso8601Times.length; i++) {
				if (iso8601Times[i][1].test(match[3])) {
					format += ('T' + iso8601Times[i][0]);
					break;
				}
			}
		}

		if (match[4] && iso8601TzRegex.test(match[4])) {
			format += 'Z';
		}
	}
	return format;
}
