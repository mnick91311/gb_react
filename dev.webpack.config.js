const path = require('path')
const webpack = require('webpack')

const buildConfig = require('./webpack.config.js')

module.exports = {
    ...buildConfig,
    mode: 'development',
    devtool: 'cheap-inline-module-source-map',
    devServer: {
        writeToDisk: true,
        historyApiFallback: {
            index: 'index.html'
        }
    }
}