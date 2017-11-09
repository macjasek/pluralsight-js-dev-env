import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    devtool: 'source-map',
    // entry: './src/index',
    entry: {
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname,'src/index')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.js$/,exclude: /node_modules/, loaders: ['babel-loader']},
            {test: /\.css$/,use:[{loader: "style-loader"},{loader: "css-loader", options: {modules: true}}]}
        ]
    },

    plugins: [
        // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              },
            inject: true
        }),
        //Elimitate duplicate packages when generatin bundle
        new webpack.optimize.DedupePlugin(),

        //Minify JS
        new webpack.optimize.UglifyJsPlugin()
        
    ]

}

