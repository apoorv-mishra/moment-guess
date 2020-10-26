const ISODayOfWeekFormatTokenAssigner = (function() {
	const Assigner: any = {};

	// Assigner name
	Assigner.name = 'ISODayOfWeekFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'isoDayOfWeek';

	// Regexp for matching the format token 
	Assigner.map = new Map();
	Assigner.map.set(/[1-7]/, 'E');

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

export default ISODayOfWeekFormatTokenAssigner; 
