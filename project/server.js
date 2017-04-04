var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./config/webpack.config.dev');
 
var app = express();

var compiler = webpack(config);
 
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
 
app.listen(3000, 'localhost', function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000');
});


var request = require('request');

var options = {
  url: 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=49.246292&longitude=-123.116226&radius=10000',
  headers: {
    Authorization: 'Bearer bMY2yIMUnKvctqwOUfWHMNY5NizpViecWCATNXC86FdsCipcXl05EOJWZp4MMOw3pV-lkoE-sIj-b4GsSUMnQXFvpsZ-B1-dHCuop0RLBLc3WxisMPQeHXhUPjnjWHYx'
  }
};

app.get('/api/yelp', function(req, res) {
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.send(body)
    } 
  });  
});









