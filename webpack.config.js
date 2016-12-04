const webpack = require('webpack');

module.exports = {
  entry: './jasmine/spec/inverted-index-test.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: 'es2015'
        }
      },
      {
        loader: 'json-loader',
        test: /\.json$/,
        exclude: /node_modules/,
        query: {
          presets: 'es2015'
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6', '.json']
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin()
  ],
  watch: true,
  stats: {
    // Nice colored output
    colors: true
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
