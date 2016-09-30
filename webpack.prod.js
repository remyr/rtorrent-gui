var webpack = require('webpack')
var path = require('path')

var uglifyJs = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: true
    },
    comments: false,
})

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public/assets/js'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  plugins: [
      new webpack.DefinePlugin({
        'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
      }),
      uglifyJs,
  ]
};