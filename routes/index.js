var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
userSchema = require('../public/models/user.js').User;
User = mongoose.model('User', userSchema);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Llama' });
});

router.get('/checklogin', function(req,res) {
  // console.log(req.user.id);
  // name = req.user.name.givenName + " " + req.user.name.familyName;
  // console.log(name);
  var findUser = User.findOne({'facebook_id': req.user.id}).exec(function (err, user) {
    console.log(user);
    if(err) console.log('There is an error!');
    if (user) {
      res.render('dashboard', {title: 'Llama'});
    } else {
      res.render('finishlogin', {title: 'Finish', user: req.user});
    }
  });
  
});

router.post('/finishuserlogin', function(req,res) {
  newUser = new User({
    facebook_id: req.user.id,
    name: req.user.displayName,
    languageFrom: req.body.nativeLanguage,
    languageTo: req.body.learningLanguage
  });
  newUser.save();
  res.render('dashboard', {title: 'Llama', user: newUser});
})

module.exports = router;

module.exports = function(passport) {
  router.get('/auth/facebook', passport.authenticate('facebook'));

  router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/checklogin',
                                      failureRedirect: '/' }));
  return router;
}