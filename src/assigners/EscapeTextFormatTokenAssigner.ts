const EscapeTextFormatTokenAssigner = (function() {
	const Assigner: any = {};

	// Assigner name
	Assigner.name = 'EscapeTextFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'escapeText';

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
		if (this._testTokenType(token)) {
			token.setFormat(`[${token.getValue()}]`);
		}
	};

	return Assigner;
})(); 


export default EscapeTextFormatTokenAssigner; 
