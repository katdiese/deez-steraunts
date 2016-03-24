module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/g19_restaurants'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
