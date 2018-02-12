'use strict';

var util = require('util');
var ModelOrientacion = require('../../api/models/orientacion_curricular');
const Responses = require('../helpers/responses');
/** Exportación de las funciones para usar en el resto del código */
module.exports = {
  getOrientaciones: getOrientaciones,
  getOrientacionId: getOrientacionId,
  createOrientacion: createOrientacion,
  updateOrientacion: updateOrientacion,
  deleteOrientacion: deleteOrientacion

};
/** GET: Función que retorna la lista de orientaciones existentes en la BD */
function getOrientaciones (req, res){
  ModelOrientacion.find({}, (err, orientacion) => {
      if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});
      if(!orientacion) return res.status(400).send({message: 'No existe ningún orientacion'});

      /** Si no existe error se retonan las orientaciones con status 200: OK */
      res.status(200).json({orientacion});
      console.log(orientacion);
  });

}
/** GET/ID: Se retorna un orientacion al recibir por PATH el id del mismo. */
function getOrientacionId(req, res) {

  let id = req.swagger.params.id.value;
   /** FindById, busca dentro de la BD el orientacion que se desea conseguir*/
  ModelOrientacion.findById(id, function(err, orientacion){
      /** Si existe un error interno del servidor se retorna error 500 */
    if (err) return res.status(500).send(Responses.getError({message: err.message}));

    /** Si no existe el orientacion se retorna error 404 */
    if (!orientacion) return res.status(404).send(Responses.getError({message: `orientacion ${id} not found.`}));

    res.json(orientacion);
  });
}
  

/** POST: Función que crea un orientacion. */
function createOrientacion(request, response) {
  ModelOrientacion.create(request.body, function (err, orientacion) {
   
      /** Se crea el nuevo orientacion con los atributos requeridos */
      orientacion.save(function (err) {

        if (err) {
            response.status(500).send(Responses.getError({ message: err.message }));
            return;
        }
        response.status(200).json(orientacion);
    })
  });
}
/** PUT: Función que actualiza un orientacion. */
function updateOrientacion(request, response) {
  let id = request.swagger.params.id.value;
  /** FindById, busca dentro de la BD el orientacion que se desea actualizar */
  ModelOrientacion.findById(id, function(err, orientacion) {
    /** Si existe un error interno del servidor se retorna error 500 */
    if (err) return response.status(500).send(Responses.getError({message: err.message}));
      
    
    /** Si el id no está asociado a algún orientacion en la BD, se retorna un error 404 */
    if (!orientacion) return response.status(404).send(Responses.getError({message: `orientacion ${id} not found.`}));
      
    /** Object.assign copia los valores del request.body al objeto orientacion */
    orientacion = Object.assign(orientacion, request.body);
    orientacion.save(id, function (err, orientacion) {
      /** si hay error al guardar se muestra un error 500 */
      if (err) return response.status(500).send(Responses.getError({message: err.message}));
      
      /** Se muestra el orientacion actualizado */
      response.json(orientacion);
    });
  });
}
/** DELETE: Función que elimina un orientacion. */
function deleteOrientacion(request, response){
  let id = request.swagger.params.id.value;
  ModelOrientacion.findById(id, function(err, orientacion) {
    if (err) return response.status(500).send(Responses.getError({message: err.message}));
      
    
    /** Si el id no está asociado a algún orientacion en la BD, se retorna un error 404 */
    if (!orientacion) return response.status(404).send(Responses.getError({message:  `El orientacion ${id} no ha sido encontrado.`}));
      
    /** Se elimina de la BD el orientacion asociado al id ingresado. */
    orientacion.remove(id, function (err, orientacion) {
      if (err) return response.status(500).send(Responses.getError({message: err.message}));
     /* Si no hay error se elimina y se muestra un mensaje de que el orientacion ha sido borrado */ 
      response.status(200).json(Responses.getSuccess({message: `orientacion ${id} eliminado.`}));
    });
  });
}


