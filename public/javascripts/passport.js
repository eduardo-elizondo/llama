// var mongoose = require('mongoose');
FacebookStrategy = require('passport-facebook').Strategy;

// Users = mongoose.model('User');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });


  passport.use(new FacebookStrategy({
    clientID: 387071788139332,
    clientSecret: 387071788139332,
    callbackURL: "auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('hey');
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }));



}