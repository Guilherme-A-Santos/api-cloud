const { v4 } = require('uuid')
const userSchema = require('../_shared/interfaces/User')
const schemaValidator = require('../schemas/SchemaValidator')

class UserController {
  constructor() {
    this.users = [];
  }

  listUsers(req, res) {
    return res.json(this.users).status(200)
  }

  createUser(req, res) {
    try {
      const user = req.body;

      schemaValidator.hasAllProperties({
        payload: user,
        schema: userSchema
      });

      const formattedUserSchema = schemaValidator.validate({
        payload: user,
        schema: userSchema
      });

      this.users.push({
        id: v4(),
        ...formattedUserSchema
      });

      return res.json().status(201)
    } catch (err) {
      return res.json({
        message: err.message,
        error: err.stack
      }).status(400)
    }
  }

  listUserById(req, res) {
    try {
      const { id: userId } = req.params;

      const user = this.users.find((user) => user.id === userId);

      if (!user) throw new Error('User does not exists');

      return res.json(user).status(200);
    } catch (err) {
      return res.json({
        message: err.message,
        error: err
      }).status(400)
    }
  }''
}

module.exports = new UserController();
