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
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, "static_src"),
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: ['@babel/env', '@babel/react'],
				}
			},
		],
	},
}