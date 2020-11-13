const config = require('./src/common/config/env.config.js');
const express = require('express');
const bodyParser = require('body-parser');
const mountRoutes = require('./src/common/routes');
const errorHandlerMiddleware = require('./src/common/middleware/error.handler.middleware')

const app = express();
app.use(bodyParser.json());
mountRoutes(app);
app.use(errorHandlerMiddleware)
// Implement auth

app.listen(config.port, () => {
    console.log(`Application listening at port ${config.port}`)
});