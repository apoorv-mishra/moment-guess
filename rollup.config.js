import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default {
	input: 'index.js',
	output: [
		{
			file: 'dist/bundle.js',
			format: 'umd',
			name: 'MomentGuess',
			sourcemap: true,
		},
		{
			file: 'dist/bundle.min.js',
			format: 'umd',
			name: 'MomentGuess',
			plugins: [ terser() ],
			sourcemap: true,
		},
	],
	plugins: [ resolve() ],
}
