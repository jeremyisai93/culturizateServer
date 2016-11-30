var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var placeSchema = new mongoose.Schema({  
  name:    { type: String },
  address: { type: String },
  loc: {type: [Number], index: '2d'},
  //latitude:     { type: Number },
  //longitude:  { type: Number }
});

module.exports = mongoose.model('Place', placeSchema); 


/*
var Todo = mongoose.model('Place', placeSchema); 

// Create a todo in memory
var todo = new Todo({name: 'Usm', address: 'Soy la cerda 123', latitude: 1, longitude: 2});
// Save it to database
todo.save(function(err){
  if(err)
    console.log(err);
  else
      console.log(todo);
});
*/