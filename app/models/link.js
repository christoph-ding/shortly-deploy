var db = require('../config');
var crypto = require('crypto');
var Promise = require('bluebird');
var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var linkSchema = new Schema({
  url : String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  date: {type: Date, default: Date.now}
});

linkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5)
  next()
})

var Link = Mongoose.model('Link', linkSchema);

module.exports = Link;
