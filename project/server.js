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

app.use(bodyParser.json())
 
app.listen(3000, 'localhost', function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000');
});

var request = require('request');

function options(lat, lng) {
  return {
    url: 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=' + lat + '&longitude=' + lng + '&radius=10000&limit=50',
    headers: {
      Authorization: 'Bearer bMY2yIMUnKvctqwOUfWHMNY5NizpViecWCATNXC86FdsCipcXl05EOJWZp4MMOw3pV-lkoE-sIj-b4GsSUMnQXFvpsZ-B1-dHCuop0RLBLc3WxisMPQeHXhUPjnjWHYx'
    }
    }
};

app.post('/api/yelp', function(req, res) {
  lat = req.body['position']['lat'];
  lng = req.body['position']['lng'];
  request(options(lat, lng), function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.send(body)
    } 
  });  
});









