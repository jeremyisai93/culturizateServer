module.exports = function(app) {

  var User = require('../Models/user.js');

  getUsers = function(req, res) {
    User.find(function(err, users) {
      if(!err) {
        console.log('GET /users')
        res.send(users);
      } else {
        console.log('ERROR: ' + err);
      }
    });

  };

  //GET - Return all locations in the DB
  findByUID = function(req, res) {
  	User.find({UID: req.params.UID}, function(err, user) {
      if(!err) {
        console.log('GET /user/findByUID');
        res.send(user);
      } else {
        console.log('ERROR: ' + err);
        res.status(500).send({ error: 'Something failed!' });
      }
    });
  }
  //POST - Insert a new Location in the DB
  addUser = function(req, res) {
  	console.log('POST user');
  	console.log(req.body);

  	var user = new User({ 
      UID: req.body.UID,
  		name:    req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      imgUrl: req.body.imgUrl,
      gender: req.body.gender,
      birthday: req.body.birthday,
      tags: req.body.tags,

  	});

  	user.save(function(err) {
  		if(!err) {
  			console.log('Created');
        res.send(user)
  		} else {
  			console.log('ERROR: ' + err);
        res.status(400).send({ error: 'Usuario Existente' });
  		}
  	});

  	;
  };

  app.get('/users', getUsers);
  app.get('/user/UID/:UID', findByUID);
  app.post('/user/new', addUser);

}
