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

export default TimezoneFormatTokenAssigner;
