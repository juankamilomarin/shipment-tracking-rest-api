const { v4: uuidv4 } = require('uuid')

const logError = (err, req, res, next, errorId) => {
    // TODO Implement logger, for instance Graylog
    console.error(`Error ID - ${errorId} - Stack - ${err.stack}`)
}

const catchAllErrorHandler = (err, req, res, next, errorId) => {
    res.status(500).send({ 
        id: errorId,
        error: err.message
    })
}

module.exports = (err, req, res, next) => {
    const errorId = uuidv4()
    logError(err, req, res, next, errorId)
    catchAllErrorHandler(err, req, res, next, errorId)
}