const { env } = require('process');

const inProduction = env.NODE_ENV === 'production' || env.NODE_ENV === 'build';

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
	mode: inProduction ? 'production' : 'development',
	cache: inProduction,
	context: __dirname,
	target: ['web', 'es2020'],
	entry: { main: './src/root.tsx' },
	resolve: { alias: { '@': './src/' } },
	builtins: {
		presetEnv: { target: ['web', 'es2020'] },
		html: [{ template: './index.html' }],
		treeShaking: true,
		copy: {
			patterns: [{ from: './public', to: '.' }]
		}
	},
	infrastructureLogging: {
		colors: false,
		debug: !inProduction,
		level: 'error',
	},
	optimization: {
		minimize: inProduction,
		splitChunks: inProduction,
	},
	devServer: {
		hot: true,
		port: 8000,
		liveReload: true,
		historyApiFallback: true,
	},
	output: {
		clean: true,
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-typescript', 'solid'],
					},
				},
			},
			{
				test: /\.(?:png|jpg|jpeg|webp|avif|svg|gif)$/,
				type: 'asset/resource',
			}
		]
	},
};
