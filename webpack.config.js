var webpackConfig = {
  context: __dirname + '/src',
  entry: {
    'app': [
      'react-hot-loader/patch',
      'es6-promise',
      './app.js'
    ]
  },
  output: {
    filename: "./dist/code-challenge.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /dist/],
        loaders: ["babel-loader"]
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.(eot|svg|jpg|ttf|woff|woff2|png)$/,
        loader: 'file-loader?name=[path][name].[ext]&useRelativePath=true',
      }
    ]
  }
};

module.exports = webpackConfig;