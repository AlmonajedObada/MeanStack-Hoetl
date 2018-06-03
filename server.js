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

app.post('/login', urlencodedParser, function(request, response, next){
  var data = {
    email: request.body.email,
    password: request.body.password
  }

  var whereE = request.body.email
  var whereP = request.body.password

  mongoClient.connect('mongodb://localhost:27017', (error, data) => {
    if(error){
      throw error
    }

    var db = dataB.db('combrero')

    db.collection('register').find({
      email:whereE
    }).toArray(function (error, result){
      if(error){
        throw error
      }

      var length = result.length

      if(length==0){
        conslo.log('logged failed')
        response.redirect('#!login')
      }else if(length>0){
        db.collection('register').find({
          password:whereP
        }).toArray(function (error, result){
          if(error){
            throw error
          }

          var length2 = result.length

          if(length2 == 0 ){
            console.log('logged failed')
            response.redirect('/#!login')
          }else if(length2 > 0){

            db.collection('login').insertOne(data, function (error, result){
              if(error){
                throw error
              }
              console.log('logged successfully')
              dataB.close()
            })
            response.redirect('/')
          }
        })
      }
    })
  })
})

app. post('/changePassword', urlencodedParser, function (request, response, next){
  var set = {
    password: request.body.password
  }

  var whereE = request.body.email

  mongoClient.connect('mongodb://localhost:27017', (error, dataB) =>{
    if(error){
      throw error
    }

    var db = dataB.db('combrero')

    db.collection('register').find({
      email: whereE
    }).toArray(function (error, result){
      if(error){
        throw error
      }

      var length = result.length

      if(length == 0){
        console.log('on account')
        response.redirect('/#!change')
      }else if(length > 0 ){
        db.collection('register').updateOne({
          email: whereE
        }, {
          $set: set
        }, function (error, result){
          if(error){
            throw error
          }

          console.log('password changed successfully')
          response.redirect('/#!login')
          dataB.close()
        })
      }
    })
  })
})

app.post('/booking', urlencodedParser, function(request, response, next){
  var data = {
    room: request.body.room,
    checkIn: request.body.checkIn,
    checkOut: request.body.checkOut,
    adults: request.body.adults,
    child: request.body.child
  }

  var checkIn =  request.body.checkIn
  var checkOut = request.body.checkOut

  mongoClient.connect('mongodb://localhost:27017', (error, dataB) => {
    if(error){
      throw error
    }else if(checkIn >= checkOut){
      return response.redirect('/#!book')
    }

    var db= dataB.db('combrero')

    db.collection('reservation').insertOne(data, function(error, result){
      if(error){
        throw error
      }

      console.log('Booked successgully')
      dataB.close()
      response.redirect('/')
    })
  })
})

app.post('/news', urlencodedParser, function(request, response, next){

  var data = { 
    email: request.body.newsE
  }

  var email = request.body.newsE

  mongoClient.connect('mongodb://localhost:27017', (error, dataB) => {
    if(error){
      throw error
    }

    var db = dataB.db('combrero')

    db.collection('news').find({
      email:email
    }).toArray(function(error, result){
      if(error){
        throw error
      }

      var length = result.length

      if(length>0){
        console.log('account already exists')
        response.redirect('/')
      } else if (length == 0 ){
        db.collection('news').insertOne(data, function(error, result){
          if(error){
            throw error
          }
          console.log ('new email added')
          dataB.close()
        })
        response.redirect('/')
      }
    })
  })
})
app.listen(8080, () => console.log('App listening on port 8080!'))
