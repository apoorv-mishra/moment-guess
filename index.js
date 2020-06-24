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

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
const rfc2822Regex = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun)(,)?(\s))?(\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2,4})\s(\d\d:\d\d(?::\d\d)?)\s(UT|GMT|[ECMP][SD]T|[Zz]|[+-]\d{4})$/;
const rfc2822DayOfWeekRegex = /Mon|Tue|Wed|Thu|Fri|Sat|Sun/;
const rfc2822Dates = [
	['DD MMM YYYY', /\d{2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}/],
	['D MMM YYYY', /\d (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}/],
	['DD MMM YY', /\d{2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2}/],
	['D MMM YY', /\d (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2}/],
];
const rfc2822Times = [
	['HH:mm:ss', /\d\d:\d\d:\d\d/],
	['HH:mm', /\d\d:\d\d/],
];
const rfc2822TzRegex = /UT|GMT|[ECMP][SD]T|[Zz]|[+-]\d{4}/;

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
	// Test for RFC 2822
	} else if (rfc2822Regex.test(date)) {
		const match = rfc2822Regex.exec(preprocessRFC2822(date));

		if (match[1] && rfc2822DayOfWeekRegex.test(match[1])) {
			format += 'ddd' + (match[2] || '') + (match[3] || '');
		}

		for (let i = 0; i < rfc2822Dates.length; i++) {
			if (rfc2822Dates[i][1].test(match[4])) {
				format += (rfc2822Dates[i][0] + ' ');
				break;
			}
		}

		for (let i = 0; i < rfc2822Times.length; i++) {
			if (rfc2822Times[i][1].test(match[5])) {
				format += (rfc2822Times[i][0] + ' ');
				break;
			}
		}

		if (rfc2822TzRegex.test(match[6])) {
			format += 'ZZ'
		}
	}

	return format;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s
        .replace(/\([^)]*\)|[\n\t]/g, ' ')
        .replace(/(\s\s+)/g, ' ')
        .replace(/^\s\s*/, '')
        .replace(/\s\s*$/, '');
}
