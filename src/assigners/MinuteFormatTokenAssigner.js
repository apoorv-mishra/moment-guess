const MinuteFormatTokenAssigner = (function () {
	const Assigner = {};

	// Assigner name
	Assigner.name = 'MinuteFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'minute';

	// Regexp for matching the format token 
	Assigner.map = new Map();
	Assigner.map.set(/\d{1,2}/, 'm');
	Assigner.map.set(/\d{2}/, 'mm');

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

export default MinuteFormatTokenAssigner;
