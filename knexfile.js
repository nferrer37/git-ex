// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'companytracker',
      user: 'postgres',
      password: 'docker',
      port: 5530,
    }
  },

  

};
