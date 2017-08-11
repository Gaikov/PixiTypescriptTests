const path = require('path');
//const { CheckerPlugin } = require('awesome-typescript-loader');

function getPath(entry) {
    return path.resolve(__dirname, entry)
}

module.exports = {

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    entry: getPath('src/Main.ts'),

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    output: {
        filename: 'all.js',
        path: path.resolve(__dirname, 'dist')
    },

    // Add the loader for .ts files.
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        // new CheckerPlugin()
    ]
};