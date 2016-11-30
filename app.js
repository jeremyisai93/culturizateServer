var express = require("express"),  
    app = express(),
    http  = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose');

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get('/', function(req, res) {  
   res.send("Jeremy Page!");
});


mongoose.connect('mongodb://localhost/superproyect', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});


routes = require('./Controllers/places')(app);
routes = require('./Controllers/events')(app);
routes = require('./Controllers/users')(app);

server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
