import arg from 'arg';

import guessFormat from '../src/';
import {
	info,
	error,
	display,
	showHelp,
	showUsage,
	showVersion,
} from './cliui.js'

(function() {
	let args;
	let date;
	let format;

	try {
		args = arg({
			'--help': Boolean,
			'--version': Boolean,
			'--date': String,
			'--format': String,
			'-h': '--help',
			'-v': '--version',
			'-d': '--date',
			'-f': '--format',
		});

		if (args['--help']) {
			return showHelp()
		}
		if (args['--version']) {
			return showVersion();
		}
		if (args['--date']) {
			date = args['--date'];
		}
		if (args['--format']) {
			format = args['--format'];
		}

		if (!date) {
			error('Missing date!');
			return showUsage();
		}

		const res = guessFormat(date, format);

		if (res instanceof Array) {
			info('Multiple formats matched!\n');
			return res.forEach(f => display(f));
		}

		display(res);

	} catch (err) {
		error(err.message);
		process.exit(1);
	}
})();

