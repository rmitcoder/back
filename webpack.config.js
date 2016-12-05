var config = {
    entry: './app.jsx',
    output: {
        path: './',
        filename: 'index.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders:[
            {
                loader: 'babel',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                loader: "style-loader!css-loader",
                test: /\.css$/
            }
        ]
    }
}

module.exports = config;