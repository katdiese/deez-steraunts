var express = require('express');
var router = express.Router();
var pg = require('pg');
var helpers = require('../lib/helpers');
var queries = require('../../../queries');
var options = {

};
var message;
var pgp = require('pg-promise') (options);
var connectionString = process.env.DATABASE_URL || 'postgress://localhost:5432/g19_restaurants';
var db = pgp(connectionString);
var alreadyReviewed = "";
var passport = require('passport');

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/', function(req, res, next) {
  console.log('user', req.user);
  queries.getRestaurants()
  .then(function(data) {
    res.render('index', {
      title: 'gRestaurants',
      data: data,
      message: message
    })
  })
  .catch(function(err) {
      return next(err);;
  });
})

router.get('/restaurants/:id', function(req, res, next) {
  message = "";
  console.log('USERSSSS', req.user);
  queries.getRestaurantByID(req.params.id)
  .then(function(data) {
    res.status(200)
    .render('show',{
      data: data,
      id: data[0].restaurant_id,
      name: data[0].name,
      cuisine: data[0].cuisine,
      city: data[0].city,
      state: data[0].state,
      description: data[0].description,
      image: data[0].image,
      averageRating: data[0].average
    });
  })
  .catch(function(error) {
    return next(error);
  });
});

router.get('/new', ensureAdmin, function(req, res, next) {
  res.render('new', {
    title: 'New Restaurant'
  });
});

router.post('/new', function(req, res, next) {
  var newRestaurant = req.body;
  var errors = validateRestaurant(newRestaurant);
  if(errors.length) {
    res.render('new', {
      title: 'Something went wrong.',
      errors: errors
    })
  } else {
  queries.insertRestaurant(newRestaurant.name, newRestaurant.city, newRestaurant.state, newRestaurant.cuisine, newRestaurant.image, newRestaurant.description)
  .then(function() {
    res.status(200)
    .redirect('/');
  })
  .catch(function(error) {
    res.status(400)
    .json({
      Message: 'Something went wrong',
    });
  });
}
});

router.get('/restaurants/:id/review', helpers.ensureAuthenticated, function(req, res, next) {
  res.render('review', {
    title: 'Write a New Review'
  });
});

router.post('/restaurants/:id/review', function(req, res, next) {
  var newReview = req.body;
  var errors = validateReview(newReview);

  if(errors.length) {
    res.render('review', {
      title: 'Something went wrong',
      errors: errors,
      alreadyReviewed: alreadyReviewed
    })
  } else {
db.one('SELECT * FROM reviews WHERE first_name=$1 AND last_name=$2 AND res_id=$3', [newReview.firstName, newReview.lastName, req.params.id])
    .then(function() {
      res.render('review', {
        title: 'Something went wrong',
        errors: ['You already reviewed this one, sucka']
      })
    })
    .catch(function() {
      return queries.insertReview(newReview.firstName, newReview.lastName, newReview.rating, newReview.review, req.params.id);
    })
    .then(function(data) {
      res.redirect('/restaurants/' + req.params.id)
    })
    .catch(function() {
      res.json({
        message: "Honestly I don't know WHAT you did wrong."
      })
    })
}
});

router.get('/restaurants/:id/delete', ensureAdmin, function(req, res, next) {
  queries.findAllRestaurantReviews(req.params.id)
  .then(function(data) {
    return queries.deleteAllRestaurantReviews(req.params.id)
  })
  .then(function() {
    return queries.deleteRestaurant(req.params.id)
  })
  .catch(function() {
    return queries.deleteRestaurant(req.params.id)
  })
  .then(function() {
    res.status(200)
    .redirect('/');
  })
  .catch(function(err) {
    return next(err);
  })
});

router.get('/restaurants/:id/edit', ensureAdmin, function(req, res, next) {
  queries.getRestaurantByID(req.params.id)
  .then(function(data) {
    res.render('edit', {
      title: 'Edit Restaurant Information',
      name: data[0].name,
      city: data[0].city,
      state: data[0].state,
      cuisine: data[0].cuisine,
      description: data[0].description,
      image: data[0].image
    })
  });
});

router.post('/restaurants/:id/edit', ensureAdmin, function(req, res, next) {
  var update = req.body;
  queries.updateRestaurant(update.name, update.city, update.state, update.cuisine, update.image, update.description, req.params.id)
  .then(function() {
    res.status(200)
    .redirect('/restaurants/' + req.params.id);
  })
  .catch(function(err) {
    return next(err);
  });
});

router.get('/restaurants/:resID/reviews/:revID/delete', helpers.ensureAuthenticated, function(req, res, next) {
  queries.deleteReview(req.params.revID)
  .then(function() {
    res.status(200)
    .redirect('/restaurants/' + req.params.resID)
  })
  .catch(function(err) {
    return next(err);
  });
});

router.get('/restaurants', function(req,res,next) {
  res.redirect('/');
});

router.get('/login', helpers.loginRedirect, function(req, res, next) {
  res.render('login', {
    title: "Login"
  });
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    title: "Register"
  })
})

module.exports = router;

function ensureAdmin(req, res, next) {
  if(req.user && req.user.email === 'katdiese@gmail.com') {
    next();
  } else {
    message = "Sorry, only admins can do that.";
    return res.redirect('/');
  }
}


function validateRestaurant(body) {
  var errors = [];
  if(!body.name) {
    errors.push("You need to give a restaurant name.");
  }
  if(!body.city) {
    errors.push('Please enter restaurant city.');
  }
  if(!body.description) {
    errors.push('Please give us all a short description of the restaurant.');
  }
  return errors;
}

function validateReview(body) {
  var errors = [];
  if(!body.firstName) {
    errors.push("Please enter a first name.");
  }
  if(!body.lastName) {
    errors.push("Please enter a last name.");
  }
  if(!body.review) {
    errors.push("Please enter a review.");
  }
  return errors;
}
