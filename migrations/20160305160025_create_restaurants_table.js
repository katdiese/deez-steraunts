
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(table) {
    table.increments('restaurant_id');
    table.string('name');
    table.string('city');
    table.string('state');
    table.string('cuisine');
    table.text('description');
    table.text('image');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants')
};
