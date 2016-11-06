module.exports = {
    entry: [
        './assets/js/src/index.js'
    ],
    output: {
        path: './assets/js/dist/',
        filename: "bundles.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }]
    }
}