const StoresRouter = require('../../stores/routes.config');

// TODO Add more routes
module.exports = app => {
    StoresRouter.routesConfig(app);
}