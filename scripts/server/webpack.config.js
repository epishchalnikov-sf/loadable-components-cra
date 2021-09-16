const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
console.log('appDirectory', appDirectory);

const nodeExternals = require('webpack-node-externals');
console.log('NODE_ENV', process.env.NODE_ENV);

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        server: resolveApp('src/server.jsx'),
    },
    output: {
        path: resolveApp('build/server'),
        filename: '[name].js',
    },
    target: 'node',
    externals: [ nodeExternals() ],
    devtool: 'hidden-source-map',
    resolve: {
        extensions: [ '.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx' ],
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: resolveApp('src'),
                loader: require.resolve('babel-loader'),
                options: {
                    customize: require.resolve(
                        'babel-preset-react-app/webpack-overrides'
                    ),
                    presets: [
                        [
                            require.resolve('babel-preset-react-app'),
                        ],
                    ],
                    plugins: ['@loadable/babel-plugin'],
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: false, // could be true for development but we don't expect run server for development https://github.com/babel/babel-loader/issues/690
                    // See #6846 for context on why cacheCompression is disabled
                    cacheCompression: false,
                },
            },
            {
                test: /\.css$/,
                loader: 'null-loader',
            },
        ]
    },
};