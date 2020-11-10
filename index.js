const config = require('./src/common/config/env.config.js');
const express = require('express');
const app = express();
const { dbClient } = require('./src/common/services/node-postgres.service.js');

app.get('/', async (req, res) => {
    const text = "SELECT id, name, active FROM store WHERE name ilike $1";
    const values = ['%amazon%'];

    dbClient.query(text, values)
        .then(result => res.send(result.rows[0]))
        .catch(error => {
            console.error(error.stack)
            res.status(500).send(error.message)
        })
        .then(() => dbClient.end())
})

app.listen(config.port, () => {
    console.log(`Application listening at port ${config.port}`)
})