const { Client } = require('pg')
const config = require('../config/env.config.js')

const dbClient = new Client(config.postgres)
dbClient.connect()

exports.dbClient = dbClient;
