import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
	input: 'index.js',
	output: [
		{
			file: pkg.main,
			format: 'umd',
			name: 'MomentGuess',
			sourcemap: true,
		},
		{
			file: pkg.browser,
			format: 'umd',
			name: 'MomentGuess',
			plugins: [ terser() ],
			sourcemap: true,
		},
	],
	plugins: [ resolve() ],
}
