import Guesser from './Guesser';

export default function guessFormat(date, options = {}) {
	const guesser = new Guesser(date, options);
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
