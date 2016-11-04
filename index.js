var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/dist')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
	'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());


//Endpoints

app.get('/app', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html')
});

app.listen(8080);
console.log("App listening on port 8080");