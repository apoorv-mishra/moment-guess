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
	 * Assigns the matching format token
	 * to input token.
	 *
	 * @params token(Object)
	 */
	Assigner.assign = function(token) {
		this.map.forEach((formatToken, pattern) => {
			if (pattern.test(token.getValue())) {
				token.setFormat(formatToken);
				return;
			}
		});
	};

	return Assigner;
})(); 

export default MinuteFormatTokenAssigner;
