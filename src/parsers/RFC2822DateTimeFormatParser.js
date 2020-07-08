const RFC2822DateTimeFormatParser = (function() {
	const Parser = {};

	// Parser name
	Parser.name = 'RFC2822DateTimeFormatParser';

	// Regexp for parser
	Parser.pattern = new RegExp('rfc2822');

	/**
	 * Parses the input in accordance
	 * with the specified regexp
	 *
	 * @returns tokens(Array of objects)
	 */
	Parser.parse = function(input) {
		return;
	}

	return Parser;
})();


export default RFC2822DateTimeFormatParser; 
