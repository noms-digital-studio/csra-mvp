"use strict";

const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = [
    {
        devtool: 'hidden-source-map',
        context: __dirname,
        entry: {
            'main': './src/javascript/index.js',
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map'
        },
        stats: {
            children: false,
        },
        module: {
            rules: [
                {
                    test: /\.jsx|\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'stage-0', 'react']
                        }
                    }]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => {
                                        return [
                                            require('precss'),
                                            require('autoprefixer')
                                        ];
                                    }
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.scss/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',

                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true,
                                    includePaths: [
                                        path.join(__dirname, "node_modules/govuk-elements-sass/public/sass"),
                                        path.join(__dirname, "node_modules/govuk_frontend_toolkit/stylesheets")
                                    ]
                                }
                            }

                        ]
                    })
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    use: ['url-loader?limit=10000']
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        "url-loader?limit=10000",
                        // "file-loader?name=[name].[hash:8].[ext]"
                    ],
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),                
            new ExtractTextPlugin('style.css'),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false
                },
                mangle: {
                    screw_ie8: true
                },
                output: {
                    comments: false,
                    screw_ie8: true
                }
            }),
            new HtmlWebpackPlugin({
                inject: true,
                template: 'src/index.tmpl.html',
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
                }
            }),
        ],
        resolve: {
            extensions: ['*', '.js', '.jsx']
        }
    }
]