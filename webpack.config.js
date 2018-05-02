const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let dev = false;
let publicPath = '';

if(process.argv.includes('development')){
    dev = true;
}

dev ? publicPath = '/' : publicPath = './';

const config = {

    entry: {
        app: ['babel-polyfill','./src/index.js']
    },

    
    output: {
        publicPath,
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
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
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 512,
                            name: 'img/[name].[ext]'
                        }
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
        new HtmlWebPackPlugin({
            template: "./index.html",
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

if(!dev){
    config.plugins.push(
        new CleanWebpackPlugin(['dist/'],{
            dry:false,
            exclude:['img','video']            
        })
    )
}

module.exports = (env, argv) => config;