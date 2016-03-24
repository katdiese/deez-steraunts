var express = require('express');
var router = express.Router();
var passport = require('passport');

// router.get('/', function(req, res, next) {
//   res.redirect('/');
// });

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect: '/'
}), function (req, res, next) {

  console.log('USER:', req.user);
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;