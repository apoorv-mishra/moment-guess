import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import ts from "@wessberg/rollup-plugin-ts";
import pkg from './package.json';

export default [{
	input: './src/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			name: 'MomentGuess',
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: 'es',
			name: 'MomentGuess',
			sourcemap: true,
		}
	],
	plugins: [
		resolve(),
		ts({ tsconfig: 'tsconfig.json' }),
	],
},{
	input: './cmd/index.ts',
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
		ts({ tsconfig: 'tsconfig.json' }),
	],
}];
