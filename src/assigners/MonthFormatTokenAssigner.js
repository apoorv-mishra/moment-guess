const MonthFormatTokenAssigner = (function() {
	const Assigner = {};

	// Assigner name
	Assigner.name = 'MonthFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'month';

	// Regexp for matching the format token 
	Assigner.map = new Map();
	Assigner.map.set(/\d{1,2}/, 'M');
	Assigner.map.set(/\d{2}/, 'MM');
	Assigner.map.set(/\d{1,2}(?:st|nd|rd|th)/, 'Mo');
	Assigner.map.set(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/, 'MMM');
	Assigner.map.set(/January|February|March|April|May|June|July|August|September|October|November|December/, 'MMMM');

	/**
	 * Assigns the matching format token
	 * to input token.
	 *
	 * @params token(Object)
	 */
	Assigner.assign = function(token) {
		this.map.forEach((formatToken, pattern) => {
			if (pattern.test(token.getValue())) {
				token.setFormat(formatToken);
			}
		});
	};

	return Assigner;
})();

export default MonthFormatTokenAssigner; 

