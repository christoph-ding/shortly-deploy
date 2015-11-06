var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, require: true},
  password: {type: String, require: true}
});

userSchema.pre('save', function(next) {
  var user = this
  bcrypt.hash(user.password, null, null, function(err, hash){
    if(err) {
      console.log(err);      
    } else {
      user.password = hash;
      next();
    }
  })  
});

var User = Mongoose.model('User',userSchema); 

module.exports = User;

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
//});

/* 
  init + hashPassword is going to Schema pre hoo 
  compare password going to request - handler
*/