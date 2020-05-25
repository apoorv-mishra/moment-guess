import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default {
	input: 'index.js',
	output: [
		{
			file: 'dist/bundle.js',
			format: 'umd',
			name: 'MomentGuess',
		},
		{
			file: 'dist/bundle.min.js',
			format: 'umd',
			name: 'MomentGuess',
			plugins: [ terser() ],
		},
	],
	plugins: [ resolve() ],
}
