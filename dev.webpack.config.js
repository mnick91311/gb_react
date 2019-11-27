const path = require('path')
const webpack = require('webpack')

const buildConfig = require('./webpack.config.js')

module.exports = {
	...buildConfig,
	mode: 'development',
	devServer: {
		writeToDisk: true,
	}
}