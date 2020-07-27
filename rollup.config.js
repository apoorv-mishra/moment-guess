import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default [{
	input: 'index.js',
	output: [
		{
			file: pkg.main,
			format: 'umd',
			name: 'MomentGuess',
			sourcemap: true,
		},
	],
	plugins: [
		resolve(),
	],
},{
	input: 'cli.js',
	output: [
		{
			file: pkg.bin['moment-guess'],
			format: 'cjs',
			name: 'MomentGuess',
			banner: '#!/usr/bin/env node',
		},
	],
	plugins: [
		resolve(),
		commonjs(),
		json(),
	],
}];
