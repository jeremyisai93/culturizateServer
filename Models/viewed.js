var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var viewedSchema = new mongoose.Schema({  
  user:    { type: String , required: true, ref: "User"} ,
  event:  { type: String , required: true, ref: "Event"},
  view: {type: Boolean, default: false },
  valorate:     { type: Number, default: null },
  near: {type: Boolean, default: false },
});

module.exports = mongoose.model('Viewed', viewedSchema); 



/*var Todo = mongoose.model('Viewed', viewedSchema); 

// Create a todo in memory
var todo = new Todo({user: '57e72f4203024ecc21000001', event: '57d0732c28d2da4433000001'});
// Save it to database
todo.save(function(err){
  if(err)
    console.log(err);
  else
      console.log(todo);
});*/
