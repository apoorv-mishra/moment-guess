import Guesser from './Guesser';
import {
	Date,
	Format,
} from './types';

export default function guessFormat(date: Date, format?: string): Array<Format> | Format {
	const parsedResults = Guesser.parse(date);
	const refinedParsedResults = Guesser.refine(parsedResults);
	if (refinedParsedResults.length === 0) {
	    throw Error("Couldn't parse date");
	}
	refinedParsedResults.forEach(r => Guesser.assign(r.tokens, format));
	let matchedFormats: Array<Format> = [];
	refinedParsedResults.forEach(r => matchedFormats.push(Guesser.getFormatString(r.tokens)));
	return (
		matchedFormats.length === 1
		? matchedFormats[0]
		: matchedFormats
	);
}
