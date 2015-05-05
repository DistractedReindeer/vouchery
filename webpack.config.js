var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app/app.jsx'
  ],
  output: {
    path: __dirname + '/assets/js/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/assets/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx-loader', 'jsx?harmony'] },
    ]
  }
};
