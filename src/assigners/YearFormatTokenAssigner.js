const Assigner = {};

// Assigner name
Assigner.name = 'YearFormatTokenAssigner';

// Assigner type
Assigner.type= 'year';

// Regexp for matching the format token 
Assigner.map = new Map();
Assigner.map.set(/\d{4}/, 'YYYY');

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
}

export default Assigner;
