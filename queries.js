var knex = require('./db/knex');
function Restaurants() {
  return knex('restaurants');
}
function Review() {
  return knex('reviews');
}

module.exports = {
  getRestaurants: function(){
    return Restaurants().select()
  },
  getRestaurantByID: function(id) {
    return Restaurants().select().leftJoin('reviews', 'restaurant_id', 'res_id').where('restaurant_id', id)
  },
  insertRestaurant: function(name, city, state, cuisine, image, description) {
    return Restaurants().insert({
      name: name,
      city: city,
      state: state,
      cuisine: cuisine,
      image: image,
      description: description
    })
  },
  insertReview: function(firstName, lastName,rating, review, id) {
    return Review().insert({
      first_name: firstName,
      last_name: lastName,
      rating: rating,
      review: review,
      date: 'NOW()',
      res_id: id
    })
  },
  findAllRestaurantReviews: function(id) {
    return Review().select().where('res_id', id)
  },
  deleteAllRestaurantReviews: function(id) {
    return Review().where('res_id',id).del()
  },
  deleteRestaurant: function(id) {
    return Restaurants().where('restaurant_id', id).del()
  },
  updateRestaurant: function(name, city, state, cuisine, image, description, id) {
    return Restaurants().update({
      name: name,
      city: city,
      state: state,
      cuisine: cuisine,
      image: image,
      description: description
    }).where('restaurant_id', id)
  },
  deleteReview: function(id) {
    return Review().where('review_id', id).del()
  },
  checkIfReviewerExists: function(firstName) {
    return Review().where('first_name', firstName).select()
  }
}








