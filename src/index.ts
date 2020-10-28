import Guesser from './Guesser';
import {
	Date,
	Format,
} from './types';

export default function guessFormat(date: Date): Array<Format> | Format {
	const guesser = new Guesser(date);
	const parsedResults = guesser.parseInput();
	const refinedParsedResults = guesser.refineParsedResults(parsedResults);
	if (refinedParsedResults.length === 0) {
	    throw Error("Couldn't parse date");
	}
	refinedParsedResults.forEach(r => guesser.assignFormatTokens(r.tokens));
	let matchedFormats = [];
	refinedParsedResults.forEach(r => matchedFormats.push(guesser.getFormatString(r.tokens)));
	return (
		matchedFormats.length === 1
		? matchedFormats[0]
		: matchedFormats
	);
}
