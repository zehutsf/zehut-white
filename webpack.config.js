var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var styleLoader = 'style-loader!css-loader!autoprefixer-loader!sass-loader';
if (process.env.NODE_ENV === 'production') {
  styleLoader = ExtractTextPlugin.extract(
    'style-loader', 'css-loader!autoprefixer-loader!sass-loader'
  );
}

module.exports = {
  entry: [
    'babel-polyfill',
    './scripts/client.js'
  ],
  output: {
    path: './build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015',
        exclude: /node_modules/
      },
      {
        test: /\.scss|.css$/,
        loader: styleLoader
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      title: 'Zehut! White Party 2016',
      template: './templates/index.html'
    })
  ],

  resolve: {
    extensions: ['', '.js', '.scss']
  }
};