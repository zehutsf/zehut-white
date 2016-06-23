var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: './dist/',
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
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
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
      template: './src/templates/index.html'
    })
  ],

  resolve: {
    extensions: ['', '.js', '.scss']
  }
};