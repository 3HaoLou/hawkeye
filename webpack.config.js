/* eslint-disable */
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/main.js',

    output: {
        filename: 'bundle.js',
        publicPath: '/dist/',
        path: path.join(__dirname, './dist')
    },

    devServer: {
        port: 8080,
        hot: true,
        proxy: {
            '/v1': {
                target: 'http://api-zeus.dev.geehao.cn',
                // target: 'http://192.168.110.121:8083',
                changeOrigin: true
            }
        }
    },

    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader' },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-2'],
                        plugins: ['transform-runtime']
                    }
                }
            },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
            { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=1&name=./static/assets/[name].[hash:4].[ext]' },
            { test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: 'file-loader' },
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.json$/, loader: 'json-loader' },

        ]
    },

    resolve: {
        extensions: ['.js', '.json', '.scss', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.js',
            'assets': path.resolve(__dirname, './src/assets'),
            'components': path.resolve(__dirname, './src/components'),
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin('style.css')
    ],

    devtool: '#source-map'
}