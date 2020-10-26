const DayOfWeekFormatTokenAssigner = (function() {
	const Assigner: any = {};

	// Assigner name
	Assigner.name = 'DayOfWeekFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'dayOfWeek';

	// Regexp for ma tching the format token 
	Assigner.map = new Map();
	Assigner.map.set(/[0-6]/, 'd');
	Assigner.map.set(/[0-6](?:st|nd|rd|th)/, 'do');
	Assigner.map.set(/(?:Su|Mo|Tu|We|Th|Fr|Sa)/, 'dd');
	Assigner.map.set(/(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)/, 'ddd');
	Assigner.map.set(/(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/, 'dddd');

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

export default DayOfWeekFormatTokenAssigner; 
