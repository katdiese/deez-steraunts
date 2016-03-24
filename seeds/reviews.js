var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'reviews',
  file: 'data/reviews.csv'
});
