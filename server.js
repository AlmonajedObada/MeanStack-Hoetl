var express = require('express');
var mongoClient = require('mongodb').MongoClient
var objectId = require('mongodb').ObjectID
var bodyParser = require('body-parser')
var http = require('http')
var url = require('url')

var urlencodedParser = bodyParser.urlencoded({
  extended: false
})

var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8080, () => console.log('App listening on port 8080!'))
