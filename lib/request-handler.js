var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var Mongoose = require('mongoose');
var User = require('../app/models/user');
var Link = require('../app/models/link');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Links.remove({}, function(error) {
    if (error) {
      console.log(error);
    } else {
      res.send(200, links.models);
    }
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.findOne({ url: uri }).exec(function(error, found) {
    if (found) {
      res.send(200, found.attributes);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        } 
        var newLink = new Link({url: uri, title: title, base_url: req.headers.origin})                  
        newLink.save()        
        res.send(200, newLink);
        });
      }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }).exec(function(error, user) {
      if (!user) {
        res.redirect('/login');        
      } else {
         bcrypt.compare(password, user.password, function(match) {
          if (match) {
            console.log("This USER EXISTS!")
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');          
          }
          })
        }
      })
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }).exec(function(error, user) {
      if (!user) {
        var newUser = new User({username: username, password: password});
        newUser.save()
        util.createSession(req, res, newUser);
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });

};

exports.navToLink = function(req, res) {
  // we are getting the link from Links Table
  Link.findOne({code: req.params[0]}).exec(function(error, link) {
    if (!link) {
      res.redirect('/');
    } else {
      link.visits = link.visits + 1;
        link.save();
      res.redirect(link.url);
    }
  })
};