import Token from './Token.js';

const USStyleSlashDelimitedDateFormatParser = (function() {

	/*
	 * US style
	 *
	 * - MM/DD/YYYY
	 * - M/D/YYYY
	 *
	 * - MM/DD/YY
	 * - M/D/YY
	 *
	 * - MM/DD
	 * - M/D
	 */
	const Parser = {};

	// Parser name
	Parser.name = 'USStyleSlashDelimitedDateFormatParser';

	Parser.pattern = new RegExp('^'
		+ '(?<month>0?[1-9]|1[0-2])'
		+ '(?<delim1>[/.-])'
		+ '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
		+ '(?:'
			+ '(?<delim2>[/.-])'
			+ '(?<year>\\d{4}|\\d{2})'
		+ ')?'
		+ '$'
	);

	/**
	 * Parses the input in accordance
	 * with the specified regexp
	 *
	 * @returns parsedResult(Object)
	 */
	Parser.parse = function(input) {
		const match = this.pattern.exec(input);
		if (!match) {
			return;
		}

		let tokens = [];
		for (const [key, val] of Object.entries(match.groups)) {
			if (val) {
				tokens.push(new Token({
					value: val,
					type: /delim\d+/.test(key) ? 'delimiter' : key,
				}));
			}
		}

		return {
			tokens: tokens,
			index: match.index,
			parser: this.name,
		};
	};

	return Parser;
})();


export default USStyleSlashDelimitedDateFormatParser;
