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
    'whatwg-fetch',
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
      title: 'Zehut! White Party - August 21, 2016',
      description: 'You’re invited to the 4th annual celebration of the ' +
        'Jewish holiday of love. RSVP for tickets',
      template: './templates/index.html'
    })
  ],

  resolve: {
    extensions: ['', '.js', '.scss']
  }
};