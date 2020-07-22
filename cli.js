import chalk from 'chalk';
import arg from 'arg';

import guessFormat from './index.js';
import pkg from './package';

const warning = (message) => chalk`{yellow WARNING:} ${message}`;
const info = (message) => chalk`{magenta INFO:} ${message}`;
const error = (message) => chalk`{red ERROR:} ${message}`;

const showHelp = () => console.log(
	chalk`
	{bold.cyan moment-guess} - {blue Utility for guessing date's format}

	{bold USAGE}

	{bold $} {cyan moment-guess} --date {yellow 2020-10-10}
	{bold $} {cyan moment-guess} --version
	{bold $} {cyan moment-guess} --help

	{bold OPTIONS}

	-h, --help                          Shows this help message

	-v, --version                       Displays the current version of moment-guess

	-d, --date                          Displays the provided date's format
	`
);
const showUsage = () => console.log(
	chalk`
	{bold USAGE}

	{bold $} {cyan moment-guess} --date {yellow 2020-10-10}
	{bold $} {cyan moment-guess} --version
	{bold $} {cyan moment-guess} --help
	`
);

const showVersion = () => console.log(chalk.bold.white(pkg.version));

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
			console.log(chalk`{bold.red Error:} {red Missing date!}`);
			return showUsage();
		}

		console.log(chalk.bold.white(guessFormat(date, config)));

	} catch (err) {
		console.error(error(err.message));
		process.exit(1);
	}
})();

