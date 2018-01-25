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
var ModelAsignatura = require('../../api/models/Asignatura');

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
  getAsignaturas: getAsignaturas,
  postAsignatura: postAsignatura,
  getAsignatura: getAsignatura,
  updateAsignatura: updateAsignatura,
  deleteAsignatura: deleteAsignatura
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
// Listar Asignaturas
function getAsignaturas(req, res) {
  ModelAsignatura.find({}, (err, Asignaturas) => {
    console.log(Asignaturas);
    if (err) return res.status(500).json({ message: `Error al realizar peticion: ${err}` });
    if (!Asignaturas) return res.status(400).json({ message: 'No existe ninguna Asignatura' });
    res.status(200).json({ Asignaturas });
  });
}

function postAsignatura(request, response) {
  ModelAsignatura.create(request.body, function (err, asignatura) {
    asignatura.save(function (err) {
      if (err) {
        response.status(500).send(Responses.getError({ message: err.message }));
        return;
      }
      console.log()
      response.status(200).json({
        nombre: asignatura.nombre,
        enfasis: asignatura.enfasis,
        horasPedagogicasConJecAnual: asignatura.horasPedagogicasConJecAnual,
        horasPedagogicasSinJecAnual: asignatura.horasPedagogicasSinJecAnual,
        horasPedagogicasConJecSemanal: asignatura.horasPedagogicasConJecSemanal,
        horasPedagogicasSinJecSemanal: asignatura.horasPedagogicasSinJecSemanal
      });
    })
  });
}

//Listar Asignatura por ID
function getAsignatura(req, res) {
  let asignaturaID = req.swagger.params.id.value
  ModelAsignatura.findById(asignaturaID, (err, asignatura) => {
    if (err) return res.status(500).json({ message: `Error al realizar peticion: ${err}` });
    if (!asignatura) return res.status(400).json({ message: 'La asignatura no existe' });
    res.status(200).json({ asignaturas: asignatura });
    console.log(asignatura);
  });
}

//update
function updateAsignatura(request, response) {
  let asignaturaID = request.swagger.params.id.value;
  ModelAsignatura.findById(asignaturaID, function(err, asignatura) {
    if (err) {
      response.status(500).send(Responses.getError({message: err.message}));
      return;
    }
    if (!asignatura) {
      response.status(404).send(Responses.getError({message: `asignatura ${asignaturaID} not found.`}));
      return;
    }
    asignatura = Object.assign(asignatura, request.body);
    asignatura.save(asignaturaID, function (err, asignatura) {
      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
      }

      response.json(asignatura);
    });
  });
}

//delete
function deleteAsignatura(req, res) {
  let asignaturaID = req.swagger.params.id.value
  ModelAsignatura.findById(asignaturaID, (err, asignatura) => {
    if (err) return res.status(500).json({ message: `Error al realizar peticion: ${err}` });

    asignatura.remove(err => {
      if (err) return res.status(500).json({ message: `Error al realizar peticion: ${err}` });
      res.status(200).json({ message: 'La Asignatura fue eliminada con exito' });
    });
  });
}