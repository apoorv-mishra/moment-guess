const TimeFormatRefiner = (function() {
	const Refiner = {};

	// Refiner name
	Refiner.name = 'TimeFormatRefiner';

	/**
	 * Sets token type for time in hours based
	 * on meridiem.
	 *
	 * @params parsedResults(Array of objects)
	 *
	 * @returns parsedResults(Array of objects)
	 */
	Refiner.refine = function(parsedResults) {
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
						t.setType('twelveHour');
					}
				});
			}
		});

		return parsedResults;
	};

	return Refiner;
})(); 

export default TimeFormatRefiner;
