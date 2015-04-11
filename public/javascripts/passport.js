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
    clientSecret: "934060bad9ae5e306cb2f0a40a4a56b6",
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('entered');
    return done(null,profile);
  }));



}