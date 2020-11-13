const errorHandlerMiddleware = require('./error.handler.middleware')
const httpMocks = require('node-mocks-http');

describe('error.handler.middleware', () => {

    const res = httpMocks.createResponse()
    const err = {
        message: 'Error message',
        stack: 'Error tack'
    }

    beforeEach(() => {
        global.console.error = jest.fn().mockImplementation(() => {})
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should log error stack in console', () => {
        let actualErrorMessage = null
        global.console.error = jest.fn().mockImplementation((errorMessage) => {
            actualErrorMessage = errorMessage
        })
        const err = {
            stack: 'Error tack'
        }
        errorHandlerMiddleware(err, {}, res)
        expect(actualErrorMessage).toBe('Error tack')
    })

    test('should return 500 status and error message', () => {
        errorHandlerMiddleware(err, {}, res)
        expect(res.statusCode).toBe(500)
        expect(res._getData()).toStrictEqual({ 
            error: 'Error message'
        })
    })

})