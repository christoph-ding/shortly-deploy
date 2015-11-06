var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Mongoose = require('mongoose');

console.log('====================== USERS =====================')

var Schema = Mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, require: true},
  password: {type: String, require: true}
});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, null, null, function(err, hash){
    if(err) {
      console.log(err);      
    } else {
      this.password = hash;
    }
  })  
});


var User = Mongoose.model('User',userSchema); 

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
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

module.exports = User;



/* 
  init + hashPassword is going to Schema pre hoo 
  compare password going to request - handler



*/