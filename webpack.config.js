const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

/** @type {webpack.Configuration} */
module.exports = {
    entry: {
        'sequency': './src/sequency.ts',
        'sequency.min': './src/sequency.ts'
    },
    output: {
        path: path.resolve(__dirname, 'lib/umd'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'Sequency',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts']
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                configFile: 'tsconfig.cjs.json'
            },
            exclude: /node_modules/
        }]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            include: /\.min\.js$/
        })]
    }
};
