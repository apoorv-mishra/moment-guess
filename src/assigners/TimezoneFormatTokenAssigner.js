const TimezoneFormatTokenAssigner = (function() {
	const Assigner = {};

	// Assigner name
	Assigner.name = 'TimezoneFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'timezone';

	// Regexp for matching the format token 
	Assigner.map = new Map();
	Assigner.map.set(/[+-]\d{2}:\d{2}/, 'Z');
	Assigner.map.set(/[+-]\d{4}/, 'ZZ');

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

export default TimezoneFormatTokenAssigner;
