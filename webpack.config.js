const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {

    entry: {
        app: ['babel-polyfill','./src/index.js']
    },

    output: {
        path: path.resolve('./dist'),
        filename: '[name].[chunkhash].js',
        publicPath:'/'
    },

    module: {
        rules: [
            
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use:['babel-loader']
            },

            {
                test: /\.html$/,
                use:[
                    {
                        loader:'html-loader',
                        options:{minimize:true}
                    }
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist/*'],{
            dry:false,
            exclude:['img','video']            
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename:"./index.html"
        }),
        new MiniCssExtractPlugin({
            filename:"[name].[chunkhash].css",
            chunkFilename:"[id].css"
        })
    ],

    devServer: {
        port:3003,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback:true
    }

}

module.exports = config;