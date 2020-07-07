const Assigner = {};

// Assigner name
Assigner.name = 'MonthFormatTokenAssigner';

// Assigner type
Assigner.type= 'month';

// Regexp for matching the format token 
Assigner.map = new Map();
Assigner.map.set(/\d{2}/, 'MM');

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
