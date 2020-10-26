import arg from 'arg';

import guessFormat from '../src/index.js';
import {
	info,
	error,
	display,
	showHelp,
	showUsage,
	showVersion,
} from './cliui.js'

(function() {
	let args = null;
	let config = {};
	let date;

	try {
		args = arg({
			'--help': Boolean,
			'--version': Boolean,
			'--date': String,
			'--preference': String,
			'-h': '--help',
			'-v': '--version',
			'-d': '--date',
			'-p': '--preference',
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

		if (!date) {
			error('Missing date!');
			return showUsage();
		}

		const res = guessFormat(date, config);

		if (res instanceof Array) {
			info('Multiple formats matched!\n');
			return res.forEach(f => display(f));
		}

		display(guessFormat(date, config));

	} catch (err) {
		error(err.message);
		process.exit(1);
	}
})();

