'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

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
  getListOrganizaciones: getListOrganizaciones,
  getOrganizacion: getOrganizacion,
  updateOrganizacion: updateOrganizacion,
};

var ModelOrganizacion = require('../../api/models/organizacion');
/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getListOrganizaciones(req, res) {
  ModelOrganizacion.find({}, (err, organizacion) => {
    console.log(organizacion.length);
    if(err) return res.status(500).send({message: `Error al realizar peticion: ${err}`});
    if(!organizacion) return res.status(400).send({message: 'No existe ninguna organizacion'});

    res.status(200).send({organizacion});
  });
}

function getOrganizacion(req, res) {
  //let organizacionID = req.params.id;
  let organizacionID = req.swagger.params.id.value;
  console.log(organizacionID);

  ModelOrganizacion.findById(organizacionID, (err, organizacion) => {
    if(err) return res.status(500).send({message: `Error al realizar peticion: ${err}`});
    if(!organizacion) return res.status(400).send({message: 'El usuario no existe'});
    res.status(200).send({organizacion});
    console.log(organizacion);
  });
}

function updateOrganizacion(req, res) {
  let usuarioId = req.swagger.params.id.value;
  let modificar = req.swagger.params.body;

  // busca el usuario por la id y lo actualiza en la coleccion 'usuarios'
  ModelOrganizacion.findByIdAndUpdate(usuarioId, modificar, (err, usuarioModificado) => {
    if(err) return res.status(500).send({message: `Error al actualizar el usuario: ${err}`});

  // enviar por pantalla usuario modificado
  res.status(200).send({ Usuario: usuarioModificado });
  console.log(usuarioModificado);
  });
}