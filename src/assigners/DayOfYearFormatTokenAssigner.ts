const DayOfYearFormatTokenAssigner = (function() {
	const Assigner: any = {};

	// Assigner name
	Assigner.name = 'DayOfYearFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'dayOfYear';

	// Regexp for matching the format token 
	Assigner.map = new Map();
	Assigner.map.set(/\d{1,3}/, 'DDD');
	Assigner.map.set(/\d{3}/, 'DDDD');
	Assigner.map.set(/\d{1,3}(?:st|nd|rd|th)/, 'DDDo');

	/**
	 * Tests whether token type is same as
	 * Assigner type.
	 *
	 * @params token(Object)
	 *
	 * @returns Boolean
	 */
	Assigner._testTokenType = function(token) {
		return token.getType() === this.type;
	}

	/**
	 * Assigns the matching format token
	 * to input token.
	 *
	 * @params token(Object)
	 */
	Assigner.assign = function(token) {
		this.map.forEach((formatToken, pattern) => {
			if (this._testTokenType(token) && pattern.test(token.getValue())) {
				token.setFormat(formatToken);
			}
		});
	};

	return Assigner;
})(); 


export default DayOfYearFormatTokenAssigner; 
