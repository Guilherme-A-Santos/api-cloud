const { Router } = require('express')
const UserController = require('../controllers/UserController')

const routes = new Router();

routes.get('/users', UserController.listUsers.bind(UserController));
routes.get('/users/:id', UserController.listUserById.bind(UserController));
routes.post('/users', UserController.createUser.bind(UserController))

module.exports = routes
