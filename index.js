import Guesser from './src/Guesser.js';

export default function guessFormat(date, options = {}) {
	const guesser = new Guesser(date, options);
	const parsedResults = guesser.parseInput();
	const refinedParsedResults = guesser.refineParsedResults(parsedResults);
	if (refinedParsedResults.length > 1) {
	    // Ambiguity couldn't be resolved!
	    return new Error('Ambiguous date!');
	}
	const tokens = refinedParsedResults[0].tokens;
	guesser.assignFormatTokens(tokens);
	return guesser.getFormatString(tokens);
}
