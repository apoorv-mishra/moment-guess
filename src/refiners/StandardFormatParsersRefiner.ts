import {
	ParsedResult,
	IRefiner,
} from '../types';

class StandardFormatParsersRefiner implements IRefiner {
	public readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	refine(parsedResults: Array<ParsedResult>): Array<ParsedResult> {
		const res = parsedResults.filter(r => {
			return r.parser === 'ISO8601ExtendedDateTimeFormatParser' ||
				r.parser === 'ISO8601BasicDateTimeFormatParser' ||
				r.parser === 'RFC2822DateTimeFormatParser';
		});
		if (res.length === 0) {
			return parsedResults;
		}
		return res;
	}
}

export default StandardFormatParsersRefiner;
