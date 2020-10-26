import {
	ParsedResult,
	IRefiner,
} from '../types';

class TimeFormatRefiner implements IRefiner {
	public readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	refine(parsedResults: Array<ParsedResult>): Array<ParsedResult> {
		parsedResults.forEach(r => {
			let meridiemExists = false;
			r.tokens.forEach(t => {
				if (t.type === 'meridiem') {
					meridiemExists = true;
				}
			});
			if (meridiemExists) {
				r.tokens.forEach(t => {
					if (t.type === 'twentyFourHour') {
						t.type = 'twelveHour';
					}
				});
			}
		});

		return parsedResults;
	}
}

export default TimeFormatRefiner;
