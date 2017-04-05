module.exports = {
    entry: "./app/index.jsx",
    output: {
        filename: "./docs/bundle.js"
    },
    devtool: "eval-source-map",
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: /app/,
            loader: 'babel',
            query: {
                presets: ["react", "es2015"]
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }],
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
};