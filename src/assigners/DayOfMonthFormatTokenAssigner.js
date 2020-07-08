const DayOfMonthFormatTokenAssigner = (function() {
	const Assigner = {};

	// Assigner name
	Assigner.name = 'DayOfMonthFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'dayOfMonth';

	// Regexp for matching the format token 
	Assigner.map = new Map();
	Assigner.map.set(/\d{2}/, 'DD');

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
				return;
			}
		});
	};

	return Assigner;
})(); 


export default DayOfMonthFormatTokenAssigner; 
