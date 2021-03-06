import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WEbpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.js$/,exclude: /node_modules/, loaders: ['babel-loader']},
            //{test: /\.css$/,use:[{loader: "style-loader"},{loader: "css-loader", options: {modules: true}}]},
            {test:/\.css$/, use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader",
                        publicPath: "/dist"
                      })
            }
            //{test: /\.css$/,use:[{loader: ExtractTextPlugin.extract('css?sourceMap'), options: {modules: true}}]}
            //{test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
        ]
    },

    plugins: [
        // Generate an external css file with a hash in the filename
        new ExtractTextPlugin({
                filename: '[name].[contenthash].css',
                disable: false,
                allChunks: true
              }),

        // Hash the files using MD5 so that their names change when the content changes.
        new WEbpackMd5Hash(),

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

        //Minify JS
        new webpack.optimize.UglifyJsPlugin()
        
    ]

}

