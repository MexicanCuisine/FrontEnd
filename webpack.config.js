module.exports = {
    entry: [
        './assets/js/app.js'
    ],
    output: {
        path: './dist/public/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
        }]
    }
}