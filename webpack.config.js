var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');

function findPackages(selector) {
    return Object.keys(pkg.dependencies).filter(selector);
}

var entry = {
    'main': './src/main.browser.ts',
    '@angular': findPackages(pkg => pkg.startsWith('@angular')),
    'rxjs': findPackages(pkg => pkg.startsWith('rxjs')),
    'polyfills': findPackages(pkg => pkg.startsWith('reflect') || pkg.startsWith('core') || pkg.startsWith('zone')),
};

var webpackConfig = {
    entry,

    output: {
        path: './',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({name: Object.keys(entry), minChunks: Infinity})
    ],
    module: {
        loaders: [
            {test: /\.ts$/, loaders: ['awesome-typescript-loader']}
        ]
    }

};

var defaultConfig = {
    devtool: 'cheap-module-source-map',
    cache: true,
    debug: true,
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        root: [path.join(__dirname, 'src')],
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000}
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
