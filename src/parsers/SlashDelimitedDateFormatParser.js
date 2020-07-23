import Token from './Token.js';

const SlashDelimitedDateFormatParser = (function() {

	/*
	 * YYYY/MM/DD
	 * YYYY/M/D
	 * YYYY/MM
	 * YYYY/M
	 */
	const Parser = {};

	// Parser name
	Parser.name = 'SlashDelimitedDateFormatParser';

	Parser.pattern = new RegExp('^'
		+ '(?<year>\\d{4})'
		+ '(?<delim1>[/.-])'
		+ '(?<month>0?[1-9]|1[0-2])'
		+ '(?:'
			+ '(?<delim2>[/.-])'
			+ '(?<dayOfMonth>0?[1-9]|[1-2]\\d|3[0-1])'
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
			name: this.name,
		};
	};

	return Parser;
})();


export default SlashDelimitedDateFormatParser;
