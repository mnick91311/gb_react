const path = require('path')
const webpack = require('webpack')

module.exports = {
	mode: 'production',
	context: path.resolve(__dirname, "static_src"),
	entry: {
		app: './index.jsx',
	},
	output: {
		path: path.resolve(__dirname, "static", "build"),
		filename: 'app.js',
	},
	resolve: {
		modules: [path.resolve(__dirname, 'static_src/'), 'node_modules'],
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, "static_src"),
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					plugins: [
						["@babel/plugin-proposal-class-properties", { "loose": true }],
					],
					presets: ['@babel/env', '@babel/react'],
				}
			},
		],
	},
}