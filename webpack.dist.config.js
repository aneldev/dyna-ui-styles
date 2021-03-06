﻿// help: http://webpack.github.io/docs/configuration.html
// help: https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const package_ = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

const config = {
	target: 'node', // help: https://webpack.github.io/docs/configuration.html#target
	entry: [
		// do not load babel-polyfill here, the application should load the polyfills!
		// the entry application code
		path.resolve(__dirname, 'src/index.ts')
	],
	externals: Object.keys(package_.dependencies), // exclude all dependencies from the bundle
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		publicPath: '/dist/',
		library: package_.name,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	resolve: {
		alias: {},
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
	},
	module: {
		loaders: loaders
	},
	plugins: plugins.concat([]),
	node: {
		fs: "empty"
	},
};

module.exports = config;
