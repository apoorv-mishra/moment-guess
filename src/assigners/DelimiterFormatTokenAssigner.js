const DelimiterFormatTokenAssigner = (function() {
	const Assigner = {};

	// Assigner name
	Assigner.name = 'DelimiterFormatTokenAssigner';

	// Assigner type
	Assigner.type= 'delimiter';

	/**
	 * Assigns the matching format token
	 * to input token.
	 *
	 * @params token(Object)
	 */
	Assigner.assign = function(token) { /* noop */ };

	return Assigner;

})();

export default DelimiterFormatTokenAssigner; 
