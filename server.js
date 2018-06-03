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

app.post('/feedback', urlencodedParser, function(request, response, next){
  var data ={
    opinion : request.body.opinion
  }

  mongoClient.connect('mongodb://localhost:27017', (error, dataB) => {
    if(error) {
      throw error;
    }

    var db = dataB.db('combrero')

    db.collection('feedback').insertOne(data, function(error, result){
      if(error){
        throw error
      }
      console.log('Feedback data insert successfully into my database')
      dataB.close()

    })
  })
  response.redirect('/#!feedback');
})

app.post('/register', urlencodedParser, function(request, response, next){
  var data = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password
  }

  var whereE = request.body.email
  var whereN = request.body.firstName

  mongoClient.connect('mongodb://localhost:27017', (error, dataB)=> {
    if(error){
      throw error
    }

    var db = dataB.db('combrero')

    db.collection('/register').find({
      firstName:whereN}, {
        email: whereE
    }).toArray(function (error, result) {
      if(error){
        throw error
      }

      var length = result.length

      if(length > 0) {
        response.redirect('/#!register')
      } else if (length <= 0 ){
        db.collection('register').insertOne(data, function(error, result){
          if(error){
            throw error
          }
          console.log("info inserted successgully")
          dataB.close()
        })
        response.redirect('/#!login')
      }
    })
  })
})

app.listen(8080, () => console.log('App listening on port 8080!'))
