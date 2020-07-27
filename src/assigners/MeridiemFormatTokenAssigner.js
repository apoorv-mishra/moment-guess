const MeridiemFormatTokenAssigner = (function() {
	const Assigner = {};

	// Assigner name
	Assigner.name = 'MeridiemFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'meridiem';

	// Regexp for matching the format token 
	Assigner.map = new Map();
	Assigner.map.set(/am|pm/, 'a');
	Assigner.map.set(/AM|PM/, 'A');

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


export default MeridiemFormatTokenAssigner;
