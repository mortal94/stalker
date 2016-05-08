var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var __DEV__ = true;
var app = express();
var compiler = webpack(config);

app.use(express.static(__dirname + '/public'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
