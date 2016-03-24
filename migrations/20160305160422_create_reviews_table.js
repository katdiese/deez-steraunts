
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table) {
    table.increments('review_id');
    table.string('first_name');
    table.string('last_name');
    table.date('date').defaultTo('NOW()');
    table.text('review');
    table.decimal('rating');
    table.integer('res_id').references('restaurant_id').inTable('restaurants');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews')
};
