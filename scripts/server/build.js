process.on('unhandledRejection', err => {
    throw err;
});

const webpack = require('webpack');

console.log('loading webpack config...');

const webpackConfig = require('./webpack.config');
const bundler = webpack(webpackConfig);

console.log('bundling server bundle...');

bundler.run((err, stats) => {
    if (err) {
        throw err;
    };
    if (stats.hasErrors()) {
        console.error('stats has errors');
        throw new Error(stats.toString({
            colors: true
        }));
    }
    console.log(stats.toString({
        colors: true
    }));
});
