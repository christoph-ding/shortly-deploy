var Mongoose = require('mongoose');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');


var db = Mongoose.connect('mongodb://127.0.0.1/shortly');
  // db.on('error', console.error.bind(console, 'connection error:'));
  // db.once('open', function () {
  //   console.log('connected');
  // });
 
// db.urls = new Schema({
//   url : String,
//   base_url: String,
//   code: String,
//   title: String,
//   visits: Number,
//   date: {type: Date, default: Date.now}
// });

module.exports = db;
