const logError = (err, req, res, next) => {
    // TODO Implement logger, for instance Graylog
    console.error(err.stack)
}

const catchAllErrorHandler = (err, req, res, next) => {
    res.status(500).send({ 
        error: err.message
    })
}

module.exports = (err, req, res, next) => {
    logError(err, req, res, next)
    catchAllErrorHandler(err, req, res, next)
}