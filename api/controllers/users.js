'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

const mongoose = require('mongoose');
const User = mongoose.model('Users');

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  getUsers: getUsers,
  postUser: postUser,
  deleteUser: deleteUser,
  updateUser: updateUser
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getUsers(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  User.find({}, function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
}

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function postUser(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  User.create(req.body, function (err,newuser){
    newuser.save(function(err) {
      if (err)
        res.status(500).send(err);
      console.log(newuser);
      res.status(200).json(newuser);
    });
  })

}

/**
 * @param {Object} req: a handle to the request object
 * @param {Object} res: a handle to the response object
 */
function deleteUser(req, res){
  let id = req.swagger.params.id.value;
  User.findById(id, function(err, user) {
    if (err) {
      res.status(500).send({
        success:0,
        message: "Usuario no encontrado."
      });
      return;
    }
    if (!user) {
      res.status(404).json({
        success:0,
        message: "Usuario no existe."
      });
      return;
    }
    user.remove(id, function (err, deletedUser) {
      if (err) {
        res.status(500).json({
          success:0,
          message: "No se puede eliminar al usuario."
        });
      }

      res.status(200).json({
        success:1,
        message: "Usuario eliminado."
      });
    });
  });
}


/**
 * @param {Object} req: a handle to the request object
 * @param {Object} res: a handle to the response object
 */
function updateUser(req, res){
  let id = req.swagger.params.id.value;
  User.findById(id, function(err, user) {
    if (err) {
      res.status(500).json({
        success: 0,
        message: ""
      });
      return;
    }
    if (!user) {
      res.status(404).json({
        success: 0,
        message: ""
      });
      return;
    }
    user = Object.assign(user, req.body);
    user.save(id, function (err, user) {
      if (err) {
        res.status(500).json({
          success:1,
          messsage: ""
        });
      }

      res.json(user);
    });
  });
}
