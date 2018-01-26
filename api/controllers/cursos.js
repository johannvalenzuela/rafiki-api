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
var ModelCurso = require('../../api/models/curso');
const Responses = require('../helpers/responses');

/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());*/

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
  getCursos: getCursos,
  getCursoId: getCursoId,
  updateCurso: updateCurso,
  deleteCurso: deleteCurso,
  postCurso: postCurso,

};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */

 //API REST: GET (Kuestra Todos los cursos)

function getCursos(req, res) {
  ModelCurso.find({}, (err, curso) => {
    console.log(curso);
    if(err) return res.status(500).send({message: "Error al realizar peticion: ${err}"});
    if(!curso) return res.status(400).send({message: 'No existe ningún curso'});

    res.status(200).send({curso});
});
}


//API REST: GET (Muestra un curso según Id)

function getCursoId(req, res) {
  
  let cursoId = req.swagger.params.id.value

  ModelCurso.findById(cursoId, (err, curso) => {
    if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});
    if(!curso) return res.status(400).send({message: 'El curso no existe'});
    res.status(200).send({curso : curso});
    //console.log(curso);
  });
}

//API REST: DELETE (Elimina un curso según Id)

function deleteCurso(request, response) {
  let cursoID = request.swagger.params.id.value;

  ModelCurso.findById(cursoID, (err, curso) => {
    if(err) return response.status(500).json({message: `Error al borrar la curso: ${err}`});
    if (!curso) {
      response.status(404).send(Responses.getError({message:  `El curso de ID ${cursoID} no existe`}));
      return;
    }
    //Elimina la curso si se encontró el id
    curso.remove(cursoID, function (err, curso) {
      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
      }
      response.status(200).json(Responses.getSuccess({message: `El curso ${cursoID} ha sido eliminado`}));
    });
  });
}

//API REST: PUT (Actualiza un curso según Id)

function updateCurso(request, response) {

  let idCurso = request.swagger.params.id.value;

  ModelCurso.findById(idCurso, function(err, curso) {

    if (err) {
      response.status(500).send(Responses.getError({message: err.message}));
      //console.log('Error: ${err}');
      return;
    }
    if (!curso) {
      response.status(404).send(Responses.getError({message: 'El Curso ${idCurso} no existe'}));
      return;
    }

    curso = Object.assign(curso, request.body);

    curso.save(idCurso, function (err, curso) {

      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
      }

      response.json(curso);
    });
  });
}

//API REST: POST (Inserta un nuevo curso)

function postCurso(request, response) {

  ModelCurso.create(request.body, function (err, curso) {

    curso.save(function(err){
      if (err){
        response.status(500).send(Responses.getError({message: err.message}));
        return;
      }
      console.log(curso);

      response.status(200).json({ 
        idCurso : curso.idCurso,
        nivel : curso.nivel,
        asignatura : curso.asignatura,
        profesorJefe : curso.profesorJefe,
        salaCurso : curso.salaCurso,
        totalAlumnos: curso.totalAlumnos
      });
    })
  });
}




