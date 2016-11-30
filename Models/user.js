var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var userSchema = new mongoose.Schema({  
  UID: {type: String,  unique: true },
  name:    { type: String , required: true} ,
  phone:  { type: String },
  email: { type: String, required: true},
  imgUrl: {type: String},
  gender: { type: String},
  birthday: {type: String},
  tags: [{type:String, lowercase: true}]
});

module.exports = mongoose.model('User', userSchema); 


/*
var Todo = mongoose.model('User', userSchema);

// Create a todo in memory
var todo = new Todo({name: 'Jeremy', phone: '123456789'});
// Save it to database
todo.save(function(err){
  if(err)
    console.log(err);
  else
      console.log(todo);
});
*/
