import Token from './Token.js';

const UKStyleSlashDelimitedDateFormatParser = (function() {

	/*
	 * UK style
	 *
	 * - DD/MM/YYYY
	 * - D/M/YYYY
	 * - DD/MM/YY
	 * - DD/MM
	 */
	const Parser = {};

	// Parser name
	Parser.name = 'UKStyleSlashDelimitedDateFormatParser';

	Parser.pattern = new RegExp('^'
		+ '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
		+ '(?<delim1>[/.-])'
		+ '(?<month>0?[1-9]|1[0-2])'
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


export default UKStyleSlashDelimitedDateFormatParser;
