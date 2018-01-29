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

 //API REST: GET (Muestra Todos los cursos)

function getCursos(req, res) {

  /**Se buscan todos los cursos */
  ModelCurso.find({}, (err, cursos) => {
    
    /**En caso de error del servidor, se retorna error 500*/
    if(err) return res.status(500).send({message: "Error al realizar peticion: ${err}"});

    /**En caso que los cursos no se encuentren, se retorna un error 404*/ 
    if(!cursos) return res.status(404).send({message: 'No existe ningún curso'});

    /**Se responde todos los cursos*/
    res.status(200).send({cursos});
});
}


//API REST: GET (Muestra un curso según Id)

function getCursoId(req, res) {
  
  /**Se recibe y guarda el id del curso */
  let cursoId = req.swagger.params.id.value

  /**Se busca el curso mediante id */
  ModelCurso.findById(cursoId, (err, curso) => {
    
    /**En caso de error del servidor, se retorna error 500*/
    if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});

    /**En caso que el curso no se encuentre, se retorna un error 404*/ 
    if(!curso) return res.status(404).send({message: 'El curso no existe'});

    /**Se responde el curso según id */
    res.status(200).send({curso : curso});
  
  });
}

//API REST: DELETE (Elimina un curso según Id)

function deleteCurso(request, response) {
  
  /**Se recibe y guarda el id del curso */
  let cursoID = request.swagger.params.id.value;
  
  /**Se busca el curso mediante id */
  ModelCurso.findById(cursoID, (err, curso) => {

    /**En caso de error del servidor, se retorna error 500*/
    if(err) return response.status(500).json({message: `Error al borrar el curso. Error: ${err}`});
    
    /**En caso que el curso no se encuentre, se retorna un error 404*/ 
    if (!curso) {
      response.status(404).send(Responses.getError({message:  `El curso de ID ${cursoID} no existe`}));
      return;
    }

    /**Se elimina el curso */
    curso.remove(cursoID, function (err, curso) {
      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
        return;
      }
      response.status(200).json(Responses.getSuccess({message: `El curso ${cursoID} ha sido eliminado`}));
    });
  });
}

//API REST: PUT (Actualiza un curso según Id)

function updateCurso(request, response) {
  
  /**Se recibe y guarda el id del curso */
  let idCurso = request.swagger.params.id.value;
 
  /**Se busca el curso mediante id */
  ModelCurso.findById(idCurso, function(err, curso) {
    
    /**En caso de error del servidor, se retorna error 500*/
    if (err) {
      response.status(500).send(Responses.getError({message: err.message}));
      return;
    }

    /**En caso que el curso no se encuentre, se retorna un error 404*/ 
    if (!curso) {
      response.status(404).send(Responses.getError({message: 'El Curso ${idCurso} no existe'}));
      return;
    }
    
    /**Se copian los valores al curso */
    curso = Object.assign(curso, request.body);
    
    /**Se guardan los nuevos valores del curso */
    curso.save(idCurso, function (err, curso) {

      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
        return;
      }

       /**Se responde json con el contenido actualizado del curso */
      response.json(curso);
    });
  });
}

//API REST: POST (Inserta un nuevo curso)

function postCurso(request, response) {

  /**Se crea un nuevo curso */
  ModelCurso.create(request.body, function (err, curso) {
    
    /**Se guarda el nuevo curso */
    curso.save(function(err){
      
      /**En caso de error del servidor, se retorna error 500*/
      if (err){
        response.status(500).send(Responses.getError({message: err.message}));
        return;
      }

      /**Se responde un json con el contenido del curso*/
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




