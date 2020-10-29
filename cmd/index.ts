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

		const res = guessFormat(date);

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

