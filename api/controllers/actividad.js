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
var ModelActividad = require('../../api/models/actividad');
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
  getActividades: getActividades,
  getActividadId: getActividadId,
  updateActividad: updateActividad,
  deleteActividad: deleteActividad,
  postActividad: postActividad,

};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */

 //API REST: GET (Muestra Todas las Actividades)

function getActividades(req, res) {

  /**Se buscan todas las Actividades */
  ModelActividad.find({}, (err, actividades) => {
    
    /**En caso de error del servidor, se retorna error 500*/
    if(err) return res.status(500).send({message: "Error al realizar peticion: ${err}"});

    /**En caso que las Actividades no se encuentren, se retorna un error 404*/ 
    if(!actividades) return res.status(404).send({message: 'No existe ningún Actividad'});

    /**Se responde todos los Actividads*/
    console.log(actividades);
    res.status(200).send({actividades});
});
}


//API REST: GET (Muestra una actividad según Id)

function getActividadId(req, res) {
  
  /**Se recibe y guarda el id de la Actividad */
  let actividadId = req.swagger.params.id.value

  /**Se busca la Actividad mediante id */
  ModelActividad.findById(actividadId, (err, actividad) => {
    
    /**En caso de error del servidor, se retorna error 500*/
    if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});

    /**En caso que la Actividad no se encuentre, se retorna un error 404*/ 
    if(!actividad) return res.status(404).send({message: 'La Actividad no existe'});

    /**Se responde la Actividad según id */
    res.status(200).send({actividad : actividad});
  
  });
}



//API REST: DELETE (Elimina una Actividad según Id)

function deleteActividad(request, response) {
  
  /**Se recibe y guarda el id de la Actividad */
  let actividadID = request.swagger.params.id.value;
  
  /**Se busca la Actividad mediante id */
  ModelActividad.findById(actividadID, (err, actividad) => {

    /**En caso de error del servidor, se retorna error 500*/
    if(err) return response.status(500).json({message: `Error al borrar la Actividad. Error: ${err}`});
    
    /**En caso que la Actividad no se encuentre, se retorna un error 404*/ 
    if (!actividad) {
      response.status(404).send(Responses.getError({message:  `La Actividad de ID ${actividadID} no existe`}));
      return;
    }

    /**Se elimina la Actividad */
    actividad.remove(actividadID, function (err, actividad) {
      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
        return;
      }
      response.status(200).json(Responses.getSuccess({message: `La Actividad ${actividadID} ha sido eliminada`}));
    });
  });
}

//API REST: PUT (Actualiza una Actividad según Id)

function updateActividad(request, response) {
  
  /**Se recibe y guarda el id de la Actividad */
  let idActividad = request.swagger.params.id.value;
 
  /**Se busca la Actividad mediante id */
  ModelActividad.findById(idActividad, function(err, actividad) {
    
    /**En caso de error del servidor, se retorna error 500*/
    if (err) {
      response.status(500).send(Responses.getError({message: err.message}));
      return;
    }

    /**En caso que la Actividad no se encuentre, se retorna un error 404*/ 
    if (!actividad) {
      response.status(404).send(Responses.getError({message: 'La Actividad ${idActividad} no existe'}));
      return;
    }
    
    /**Se copian los valores a la Actividad */
    actividad = Object.assign(actividad, request.body);
    
    /**Se guardan los nuevos valores de la Actividad */
    actividad.save(idActividad, function (err, Actividad) {

      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
        return;
      }

       /**Se responde json con el contenido actualizado de la Actividad */
      response.json(actividad);
    });
  });
}

//API REST: POST (Inserta una nueva Actividad)

function postActividad(request, response) {

    /**Se crea una nueva actividad */
  ModelActividad.create(request.body, function (err, actividad) {
    
    /**Se guarda la nueva actividad */
    actividad.save(function(err){
      
      /**En caso de error del servidor, se retorna error 500*/
      if (err){
        response.status(500).send(Responses.getError({message: err.message}));
        return;
      }

      /**Se responde un json con el contenido de la actividad*/

      response.status(200).json(actividad);

     
    })
  });
}

/**Se responde un json con el contenido de la Actividad*/

      /*

      response.status(200).json({ 
        profesorAutor : actividad.profesorAutor,
        anhoAcademico: actividad.anhoAcademico,
        semestre: actividad.semestre,
        nivelDificultad: actividad.nivelDificultad,
        nivelAprendizaje: actividad.nivelAprendizaje,
        tipoPregunta: actividad.tipoPregunta,
        tema: actividad.tema,
        subTema: actividad.subTema,
        preguntaEnunciado: actividad.preguntaEnunciado,
        preguntaaActividades: actividad.preguntaaActividades,
        respuesta: actividad.respuesta, 
        respuestaVerdaderoFalso: actividad.respuestaVerdaderoFalso, 
        respuestaAlternativas: actividad.respuestaAlternativas, 
        puntajeTotal: actividad.puntajeTotal,
        retroalimentacion: actividad.retroalimentacion
      });*/



