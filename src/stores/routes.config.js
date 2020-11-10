const StoresController = require('./stores.controller')

exports.routesConfig = function (app) {
    app.get('/stores', [
        StoresController.list
    ]);

    app.get('/stores/:storeId', [
        StoresController.getById
    ]);

    app.post('/stores', [
        StoresController.insert
    ]);

    app.delete('/stores/:storeId', [
        StoresController.delete
    ]);

};