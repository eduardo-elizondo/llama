var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Llama' });
});

module.exports = router;

module.exports = function(passport) {
  router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'read_stream' }))

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/dashboard',
                                        failureRedirect: '/' }));

  return router;
}