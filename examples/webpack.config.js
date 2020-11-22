const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        const fullDir = path.resolve(__dirname, dir);
        const entry = path.resolve(fullDir, 'app.ts')
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
          entries[dir] = ['webpack-hot-middleware/client', entry];
        }
        return entries;
    }, {}), //set initialValue is important, which init the accumulator

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new ESLintPlugin({}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}