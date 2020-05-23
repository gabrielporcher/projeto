const config = require('../knexfile.js')
const knex = require('knex')(config)

knex.migrate.latest([config]) //Sobe as migrations ao iniciar nodemon.
module.exports = knex