import path from 'path';

export default {
    devtool: 'inline-source-map',
    entry: './src/index',
    target: 'web',
    output: {
        path: path.resolve(__dirname,'src'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.js$/,exclude: /node_modules/, loaders: ['babel-loader']},
            {test: /\.css$/,use:[{loader: "style-loader"},{loader: "css-loader", options: {modules: true}}]}
        ]
    },

    plugins: []

}

