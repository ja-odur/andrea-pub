const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

function compact(items) {
    return items.filter(item => item);
}

const config = () => {

    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
      }, {});

    return {
        context: __dirname,

        entry: './frontend/index.js',

        output: {
            path: path.resolve('./frontend/static/bundles/'),
            filename: '[name]-[hash].js'
        },

        plugins: [
            new webpack.DefinePlugin(envKeys),
        ],

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                  test: /\.css$/,
                  use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.sass$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|je?pg|webp)$/,
                    use: ['url-loader']
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                },
                // Fonts
                {
                    test: /\.(woff2|woff|ttf|eot|svg)$/,
                    // include: [/frontend\/fonts/],
                    use: compact([
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                            },
                        },
                    ]),
                },
            ]
        },

        resolve: {
            modules: ['node_modules', 'frontend'],
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss', '.sass', '.png']
        },

    };
};

module.exports = config();
