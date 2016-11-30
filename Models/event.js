var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var eventSchema = new mongoose.Schema({  
  name:    { type: String , required: true},
  place: {type: Schema.Types.ObjectId, ref: 'Place', required: true},
  description:     { type: String },
  started_at:  { type: Date },
  finished_at: {type: Date},
  active: {type: Boolean},
  price: Number,
  rating: {type: Number, default: 4},
  tags:[{type:String, lowercase: true}],
});

module.exports = mongoose.model('Event', eventSchema); 


/*
var Todo = mongoose.model('Event', eventSchema); 

// Create a todo in memory
var todo = new Todo({name: 'PartyHard', place: "57d069f83c34aecc35000001" });
// Save it to database
todo.save(function(err){
  if(err)
    console.log(err);
  else
      console.log(todo);
});
*/