//File: controllers/locations.js
//var mongoose = require('mongoose');  
//var Location  = mongoose.model('Location');

module.exports = function(app) {
  var Event = require('../Models/event.js');
  var Viewed = require('../Models/viewed.js');

  //GET - Return all locations in the DB
  findAllEvents = function(req, res) {
  	Event.find(function(err, events) {
  		if(!err) {
        console.log('GET /events')
  			res.send(events);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  findByPlace = function(req, res) {  
    Event.find({place: req.params.place}, function(err, events) {
      if(!err) {

        console.log('GET /events/byPlace')
        res.send(events);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  findById = function(req, res) {  
    Event.findById(req.params.event).populate("place").exec( function(err, events) {
      if(!err) {

        console.log('GET /events/byId')
        res.send(events);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  /*findById = function(req, res) {  
    Event.findById(req.params.event, function(err, events) {
      if(!err) {

        console.log('GET /events/byId')
        res.send(events);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };*/

  isVisited= function(req, res) {

    Viewed.find({user: req.params.user, event: req.params.event, near: true}, function(err, view){
      
      if(!err) {
        if (view.length !=0 ){
          console.log("is Visited: true");
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ view: true, event:  req.params.event}));
          //res.status(200).send({ 'Ok!' });
        }
        else{
          //res.status(500).send({ error: 'Something failed!' });
          console.log("is Visited: false");
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ view: false , event:  req.params.event}));
        }
       
      }
      else{
        console.log('ERROR: ' + err);
      }

    });


  };

  myEvents= function(req, res) {
    Viewed.find({user: req.params.user, near: true}).populate("event").exec(function (err, person) {
      if(!err) {
        console.log("events/my/"+req.params.user);
        console.log(person);
        res.send(person);
      } else {
        console.log('ERROR: ' + err);
      }
      
    });

  }
  addViewed = function(req, res) {
    console.log('POST/viewed');
    console.log(req.body);

    var viewed = new Viewed({ 
      user:    req.body.user,
      event:     req.body.event,
      near: true
    });

    viewed.save(function(err) {
      if(!err) {
        console.log('Created');
        res.send(viewed);
      } else {
        console.log('ERROR: ' + err);
        res.status(400).jsonp(JSON.stringify({}));
      }
    });

    res.send(viewed);
  }

  updateViewed =function(req,res){
    Viewed.update(
      {"user": req.body.user, "event": req.body.event},
      {
        $set: {"view": true}
      },
      { 
        multi: true 
      },
       function(err, results) {

        if(!err) {
          res.status(200).jsonp(JSON.stringify({}));
        } else {
          res.status(400).jsonp(JSON.stringify({}));
        }



      });
  }

  findViewer= function(req,res){

    Viewed.find({user: req.params.user, event: req.params.event}).exec(function (err, view) {
      if(!err) {
        console.log("GET VIEW");
        console.log(view);
        res.send(view);
      } else {
        console.log('ERROR: ' + err);
      }
      
    });

  }

  valorateView= function(req,res){
    id_user=req.body.user;
    id_event= req.body.event;
    valorate= req.body.valorate;
    

    //actualización de visitados
    Viewed.update({"user": id_user, "event": id_event},
      {
        $set: {"valorate": valorate}
      },
      { 
        multi: true 
      },
       function(err, results) {
        if(!err) {
          console.log(results);
          res.status(200).jsonp(JSON.stringify({}));
        } else {
          res.status(400).jsonp(JSON.stringify({}));
        }
      });

    console.log("UPDATE VIEW VALORATE");

    };

    createValorateView= function(req,res){
      id_user=req.body.user;
      id_event= req.body.event;
      valorate_= req.body.valorate;


      var viewed = new Viewed({ 
        user:    id_user,
        event:     id_event,
        valorate: valorate_
      });

      viewed.save(function(err) {
        if(!err) {
          console.log('Created');
          res.send(viewed);
        } else {
          console.log('ERROR: ' + err);
          res.status(400).jsonp(JSON.stringify({}));
        }
      });

      console.log("CREATE VIEW VALORATE");

      res.send(viewed);
      
    };

    updateValorate= function(req,res){
      console.log("VALORATE EVENT");
      id_event= req.body._id;
      valorate = req.body.rating;
      console.log("valoracion:" + valorate);

    //actualizar evento
     Event.update({"_id": id_event},
      {
        $set: {"rating": valorate}
      },
      { 
        multi: true 
      },
       function(err, results) {
        if(!err) {
          console.log(results);
          res.status(200).jsonp(JSON.stringify({}));
        } else {
          console.log(err);
          res.status(400).jsonp(JSON.stringify({}));
        }
      });
      
    };

    findTopEvents= function(req,res){
      console.log('/events/top');
      var date = new Date();

      Event.find({"finished_at": { $gte: date}}).sort({rating: -1}).exec( function(err, events) {
        if(!err) {

          //console.log('GET /events/byId')
          res.send(events);
        } else {
          console.log('ERROR: ' + err);
        }
      });

    };

    findCheapEvents= function(req,res){
      console.log('/events/cheap');
      var date = new Date();

      Event.find({"finished_at": { $gte: date}}).sort({price: 1}).exec( function(err, events) {
        if(!err) {

          //console.log('GET /events/byId')
          res.send(events);
        } else {
          console.log('ERROR: ' + err);
        }
      });

    };

    findByTags = function(req,res){
      var myTags=req.body.tags;
      var date = new Date();

      Event.find({tags: {$in: myTags},"finished_at": { $gte: date}}, function(err, events){
         if(!err) {
          console.log('GET /events/byTags')
          res.send(events);
        } else {
          console.log('ERROR: ' + err);
        }

      });

    }

    findByName = function(req,res){
      var search=req.params.search;
      var date = new Date();

      Event.find({$or: [{name: { $regex: search, $options: "i" }}, {description: { $regex: search, $options: "i" }}] ,"finished_at": { $gte: date}}, function(err, events){
         if(!err) {
          console.log('GET /events/searchByName')
          res.send(events);
        } else {
          console.log('ERROR: ' + err);
        }

      });

    }

    app.get('/events/top', findTopEvents);
    app.get('/events/cheap', findCheapEvents);
    app.get('/event/:event', findById);
    app.get('/events', findAllEvents);
    app.get('/events/my/:user', myEvents);
    app.get('/events/:place', findByPlace);
    app.post('/viewed', addViewed);
    app.get('/viewed/:user/:event', isVisited);
    app.get('/viewed/find/:user/:event', findViewer);
    app.post('/viewed/update', updateViewed);
    app.post('/valorate/event', updateValorate);//recibe event
    app.post('/valorate/view', valorateView);//recibe viewed
    app.post('/valorate/view/create', createValorateView);//recibe viewed
    app.post('/events/recomends', findByTags);//compare tags
    app.get('/events/find/:search', findByName)
    

    //app.post('/places', addPlaces);
    //app.delete('/places/:id', deletePlaces);

}
