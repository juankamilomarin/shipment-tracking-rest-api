const config = require('./src/common/config/env.config.js');
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('This is shimpent tracking REST Api')
})

app.listen(config.port, () => {
  console.log(`Application listening at port ${config.port}`)
})