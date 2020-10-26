const TwentyFourHourFormatTokenAssigner = (function() {
	const Assigner: any = {};

	// Assigner name
	Assigner.name = 'TwentyFourHourFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'twentyFourHour';

	// Regexp for matching the format token 
	Assigner.map = new Map();
	Assigner.map.set(/^(\d|1\d|2[0-3])$/, 'H');
	Assigner.map.set(/^([0-1]\d|2[0-3])$/, 'HH');

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

export default TwentyFourHourFormatTokenAssigner; 
