var Mongoose = require('mongoose');
var path = require('path');

var db = Mongoose.connect('mongodb://localhost/shortly', {
  user: 'your_database_user',
  pass: 'password'
})

var Schema = Mongoose.Schema;

db.urls = new Schema({
  url : String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  date: {type: Date, default: Date.now}
}

db.users = new Schema({
  username: String,
  password: String
});

db.users.pre('save', function() {
  var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash){
      if(err) {
        console.log(err);      
      } else {
        user.password = hash;
    }
  })  
}

module.exports = db;
