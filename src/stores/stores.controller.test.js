const StoresController = require('./stores.controller');
const { dbClient } = require("../common/services/node-postgres.service");
var httpMocks = require('node-mocks-http');

describe('stores.controller.list', () => {

    test('should execute expected query', async () => {
        let actualQuery = null;
        dbClient.query = jest.fn().mockImplementation((query) => {
                actualQuery = query;
                return Promise.resolve({
                    rows: []
                });
            }
        )
        var response = httpMocks.createResponse();
        await StoresController.list(null, response);
        expect(actualQuery).toBe('SELECT id, name, active FROM store');
    });

    test('should return 204 and empty array when the DB resultset is empty', async () => {
        dbClient.query = jest.fn().mockImplementation(() => Promise.resolve({
            rows: []
        }));
        var response = httpMocks.createResponse();
        await StoresController.list(null, response);
        expect(response.statusCode).toBe(204);
        expect(response._getData()).toStrictEqual([]);
    });

    test('should return 200 and array with objects when DB resultset has data', async () => {
        dbClient.query = jest.fn().mockImplementation(() => Promise.resolve({
            rows: [{
                test: 'test'
            }]
        }));
        var response = httpMocks.createResponse();
        await StoresController.list(null, response);
        expect(response.statusCode).toBe(200);
        expect(response._getData()).toStrictEqual([{
            test: 'test'
        }]);
    });

});

describe('stores.controller.getById', () => {

    const request  = httpMocks.createRequest({
        params: {
            storeId: 123
        }
    });

    test('should execute query with given id', async () => {
        let actualQuery = null;
        let actualVariables = [];
        dbClient.query = jest.fn().mockImplementation((query, varibles) => {
                actualQuery = query;
                actualVariables = varibles;
                return Promise.resolve({
                    rows: []
                });
            }
        );
        var response = httpMocks.createResponse();
        await StoresController.getById(request, response);
        expect(actualQuery).toBe('SELECT id, name, active FROM store WHERE id = $1');
        expect(actualVariables).toStrictEqual([123]);
    });

    test('should return 204 and empty object when the DB resultset is empty', async () => {
        dbClient.query = jest.fn().mockImplementation(() => Promise.resolve({
            rows: []
        }));
        var response = httpMocks.createResponse();
        await StoresController.getById(request, response);
        expect(response.statusCode).toBe(204);
        expect(response._getData()).toStrictEqual({});
    });

    test('should return 200 and object when DB resultset has data', async () => {
        dbClient.query = jest.fn().mockImplementation(() => Promise.resolve({
            rows: [{
                test: 'test'
            }]
        }));
        var response = httpMocks.createResponse();
        await StoresController.getById(request, response);
        expect(response.statusCode).toBe(200);
        expect(response._getData()).toStrictEqual({
            test: 'test'
        });
    });
});

describe('stores.controller.insert', () => {

    const request  = httpMocks.createRequest({
        body: {
                name: 'test',
                active: true
        }
    });

    test('should execute query with given id', async () => {
        let actualQuery = null;
        let actualVariables = [];
        dbClient.query = jest.fn().mockImplementation((query, varibles) => {
                actualQuery = query;
                actualVariables = varibles;
                return Promise.resolve({
                    rows: []
                });
            }
        );
        var response = httpMocks.createResponse();
        await StoresController.insert(request, response);
        expect(actualQuery).toBe('INSERT INTO store(name, active) VALUES ($1, $2) RETURNING id, name, active');
        expect(actualVariables).toStrictEqual(['test', true]);
    })

    test('should return 201 and inserted object when query execution is successful', async () => {
        dbClient.query = jest.fn().mockImplementation(() => Promise.resolve({
            rows: [{
                test: 'test'
            }]
        }));
        var response = httpMocks.createResponse();
        await StoresController.insert(request, response);
        expect(response.statusCode).toBe(201);
        expect(response._getData()).toStrictEqual({
            test: 'test'
        });
    });

});


describe('stores.controller.delete', () => {

    const request  = httpMocks.createRequest({
        params: {
            storeId: 123
        }
    })

    test('should execute query with given id', async () => {
        let actualQuery = null
        let actualVariables = []
        dbClient.query = jest.fn().mockImplementation((query, varibles) => {
                actualQuery = query
                actualVariables = varibles
                return Promise.resolve({
                    rows: []
                })
            }
        )
        var response = httpMocks.createResponse()
        await StoresController.delete(request, response)
        expect(actualQuery).toBe('DELETE FROM store WHERE id = $1')
        expect(actualVariables).toStrictEqual([123])
    })

    test('should return 204 and empty object when query execution is successful', async () => {
        dbClient.query = jest.fn().mockImplementation(() => Promise.resolve({
            rows: [{
                test: 'test'
            }]
        }))
        var response = httpMocks.createResponse()
        await StoresController.delete(request, response)
        expect(response.statusCode).toBe(204)
        expect(response._getData()).toStrictEqual({})
    })

})