var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'restaurants',
  file: 'data/restaurants.csv'
});
