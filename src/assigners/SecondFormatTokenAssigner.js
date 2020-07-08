const SecondFormatTokenAssigner = (function() {
	const Assigner = {};

	// Assigner name
	Assigner.name = 'SecondFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'second';

	// Regexp for matching the format token 
	Assigner.map = new Map();
	Assigner.map.set(/\d{1,2}/, 's');
	Assigner.map.set(/\d{2}/, 'ss');

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

export default SecondFormatTokenAssigner;
