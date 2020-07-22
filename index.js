import Guesser from './src/Guesser.js';

export default function guessFormat(date, options = {}) {
	const guesser = new Guesser(date, options);
	const parsedResults = guesser.parseInput();
	const refinedParsedResults = guesser.refineParsedResults(parsedResults);
	if (refinedParsedResults.length === 0) {
	    throw Error("Couldn't parse date");
	}
	const tokens = refinedParsedResults[0].tokens;
	guesser.assignFormatTokens(tokens);
	return guesser.getFormatString(tokens);
}
