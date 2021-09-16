const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
    babel: {
        // plugins: ["@loadable/babel-plugin"],
        loaderOptions: {
            plugins: ["@loadable/babel-plugin"],
        },
    },
    webpack: {
        plugins: {
            add: [new LoadablePlugin()],
        },
    },
};

// есть три способа поставить babel-plugin:
// 1) как babel: plugins
// 2) как babel: loaderOptions: plugins, - посмотреть что делает вот эта опция, и отличается ли она от следующей
// 3) webpack loader options, через configure() и plugins.push внутри

// попробовать заменить loaderOptions на просто plugins и посмотреть, нарушит ли это работу loadabl'ов