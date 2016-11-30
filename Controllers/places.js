//File: controllers/locations.js
//var mongoose = require('mongoose');  
//var Location  = mongoose.model('Location');

module.exports = function(app) {

  var Place = require('../Models/place.js');

  //GET - Return all locations in the DB
  findAllPlaces = function(req, res) {
  	Place.find(function(err, places) {
  		if(!err) {
        console.log('GET /places')
  			res.send(places);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };
 
  findAllPlacesNear =  function(req, res) {
    
    var limit = req.body.limit || 100;

     // get the max distance or set it to 80 kilometers
    var maxDistance = req.body.distance || 80;
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6378.1;
     // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.body.longitude;
    coords[1] = req.body.latitude;

    // find a location
    Place.find({
      loc: {
        $nearSphere: coords,
        $maxDistance: maxDistance
      }
    }).limit(limit).exec(function(err, places) {
      if (err) {
        return res.json(500, err);
        console.log(err);
      }

      console.log("GET PLACES NEAR");
      res.json(200, places);
    });
  };

  //POST - Insert a new Location in the DB
  addPlaces = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var place = new Place({ 
  		name:    req.body.name,
  		latitude: 	  req.body.latitude,
  		longitude:  req.body.longitude,
  		address:  req.body.address
  	});

  	place.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(place);
  };

  //DELETE - Delete a TVShow with specified ID
  deletePlaces = function(req, res) {
  	Place.findById(req.params.id, function(err, place) {
  		place.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }


  app.get('/places', findAllPlaces);
  app.post("/places/near", findAllPlacesNear);
  app.post('/places', addPlaces);
  app.delete('/places/:id', deletePlaces);

}
