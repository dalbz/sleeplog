
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'SleepLog' })
};

exports.login = function(req, res){

  var mongoose = require('mongoose'),
      User = require('../models/user-model');

  // todo: store this in a config file
  var connStr = 'mongodb://localhost:27017/sleeplog';

  mongoose.connect(connStr, function(err) {
      if (err) throw err;
      console.log('Successfully connected to MongoDB');
  });

  var auth = false;

  // fetch user and test password verification
  User.findOne({ username: req.body.user }, function(err, user) {
      if (err) throw err;

      // test a matching password
      user.comparePassword(req.body.pwd, function(err, isMatch) {
          if (err) throw err;

          console.log(req.body.pwd, isMatch); 
          
          // login successful - send to dashboard

      });
  });


  res.render('login', { title: 'SleepLog',
                        userName: req.body.user,
                        password: req.body.pwd });

  mongoose.connection.close();

};

exports.register = function(req, res){

  var mongoose = require('mongoose'),
      User = require('../models/user-model');

  // todo: store this in a config file
  var connStr = 'mongodb://localhost:27017/sleeplog';

  mongoose.connect(connStr, function(err) {
      if (err) throw err;
      console.log('Successfully connected to MongoDB');
  });

  // create a user a new user
  var newUser = new User({
      username: req.body.user,
      password: req.body.pwd
  });

  // save user to database
  newUser.save(function(err) {
      if (err) throw err;

  });

  res.render('login', { title: 'SleepLog',
                        userName: req.body.user,
                        password: req.body.pwd });

  mongoose.connection.close();

};