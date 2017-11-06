import path from 'path';
import webpack from 'webpack';

export default {
    devtool: 'source-map',
    entry: './src/index',
    target: 'web',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.js$/,exclude: /node_modules/, loaders: ['babel-loader']},
            {test: /\.css$/,use:[{loader: "style-loader"},{loader: "css-loader", options: {modules: true}}]}
        ]
    },

    plugins: [
        //Elimitate duplicate packages when generatin bundle
        new webpack.optimize.DedupePlugin(),

        //Minify JS
        new webpack.optimize.UglifyJsPlugin()
        
    ]

}

