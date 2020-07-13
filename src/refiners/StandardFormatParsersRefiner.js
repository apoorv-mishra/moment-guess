const StandardFormatParsersRefiner = (function() {
	const Refiner = {};

	// Refiner name
	Refiner.name = 'StandardFormatParsersRefiner';

	/**
	 * Filters the parsed results
	 * based on whether the parser
	 * used is a standard one like
	 * ISO 8601 or RFC 2822.
	 *
	 * @params parsedResults(Array of objects)
	 *
	 * @returns parsedResults(Array of objects)
	 */
	Refiner.refine = function(parsedResults) {
		// The two parsers are sort of disjoint, therefore only one
		// parsed result will be returned.
		return parsedResults.filter(r => {
			return r.parser === 'ISO8601ExtendedDateTimeFormatParser' ||
				r.parser === 'ISO8601BasicDateTimeFormatParser' ||
				r.parser === 'RFC2822DateTimeFormatParser';
		});
	};

	return Refiner;
})(); 

export default StandardFormatParsersRefiner;
