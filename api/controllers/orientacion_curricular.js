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
/** 
 * Función para obtener un arreglo de orientaciones curriculares
 *
 * @author Héctor Astorga Terraza
 * @exports getOrientaciones GET /orientaciones
 * @param req Petición HTTP
 * @param res | 200 hay orientaciones | 404 No hay orientaciones | 500 Error al buscar |
 * @return {[orientaciones]} JSON con un objeto que contiene arreglo de Objetos orientacion_curricular
 */
function getOrientaciones(req, res) {
  let Error = [];
  ModelOrientacion.find({}, (err, orientacion) => {
    if (err) {
      Error.push({
        titulo: "error interno del servidor",
        detalle : "ocurrió un error interno al realizar petición",
        link : req.url,
        estado : "500"
      })
      return res.json({ errors: Error })
    }
    if (!orientacion) {
      Error.push({
        titulo: "No se ha encontrado elementos",
        detalle: "No existen orientaciones curriculares",
        link : req.url,
        estado: "404"
      })
      return res.json({errors: Error})
    }
     else{
      res.status(200).json({ 
        link: req.url,
        data: orientacion,
        type: "orientaciones"
      });
      console.log(orientacion);

    }
   
  });

}
/** 
 * Función para obtener un objeto orientacion_curricular
 *
 * @author Héctor Astorga Terraza
 * @exports getOrientacionId GET /orientaciones/{id}
 * @param req Petición HTTP, id de la orientación curricular en path
 * @param res | 200 existe orientacion curricular | 404 No hay orientación curricular | 500 Error al buscar |
 * @return {[orientacion_curricular: orientacion_curricular]} JSON con un objeto orientacion_curricular
 */
function getOrientacionId(req, res) {
  let Error = [];
  let id = req.swagger.params.id.value;
  ModelOrientacion.findById(id, function (err, orientacion) {
    if (err) {
      Error.push({
        titulo : "Error interno de servidor",
        detalle : "No se ha podido conectar con la bd",
        link : req.url,
        estado: "500"

      })
      return res.json({errors : Error})
    } 
    if (!orientacion) {
      Error.push({
        titulo : "No se ha encontrado el elemento",
        detalle : "No se encuentra la orientación curricular buscada",
        link : req.url,
        estado : "404"
      })
      return res.json({errors : Error})
    } 

    res.json(orientacion);
  });
}


/** 
 * Función para insertar un objeto orientacion_curricular
 *
 * @author Héctor Astorga Terraza 
 * @exports createOrientacion POST /orientacion
 * @param req Petición HTTP, objeto orientacion_curricular JSON en Body
 * @param res | 200 objeto orientacion_curricular creado | 500 Error al buscar |
 * @return {orientacion_curricular} JSON con un objeto orientacion_curricular
 */
function createOrientacion(request, response) {
  let Error = [];
  ModelOrientacion.create(request.body, function (err, orientacion) {
    if(err) return response.status(500).json({errors: Error});
    orientacion.save( (err) => {

      if (err) Error.push({
        "titulo" : "Ocurrio un error al guardar en la BD"
      })
      else
        response.status(200).json(orientacion);
    })
  });
}

/** 
 * Función para actualizar un objeto orientacion_curricular
 *
 * @author Héctor Astorga Terraza
 * @exports updateNivel PUT /orientaciones/{id}
 * @param req Petición HTTP, id del objeto orientacion_curricular en path
 * @param res | 200 orientación curricular creada | 404 no existe orientación curricular | 500 Error al buscar |
 * @return {orientacion_curricular} JSON con un objeto orientacion_curricular
 */
function updateOrientacion(request, response) {
  let id = request.swagger.params.id.value;

  ModelOrientacion.findById(id, function (err, orientacion) {
    if (err) return response.status(500).send(Responses.getError({ message: err.message }));
    if (!orientacion) return response.status(404).send(Responses.getError({ message: `orientacion ${id} not found.` }));
    orientacion = Object.assign(orientacion, request.body);
    orientacion.save(id, function (err, orientacion) {

      if (err) return response.status(500).send(Responses.getError({ message: err.message }));
      response.json(orientacion);
    });
  });
}
/** 
 * Función para eliminar un objeto orientacion_curricular
 *
 * @author Héctor Astorga Terraza
 * @exports deleteNivel DELETE /orientaciones/{id}
 * @param req Petición HTTP, id del objeto orientacion_curricular en path
 * @param res | 200 orientacion eliminada | 404 no existe la orientación curricular | 500 Error al buscar |
 * @return {message:mensaje} JSON con mensaje
 */
function deleteOrientacion(request, response) {
  let id = request.swagger.params.id.value;

  ModelOrientacion.findById(id, function (err, orientacion) {
    if (err) return response.status(500).send(Responses.getError({ message: err.message }));
    if (!orientacion) return response.status(404).send(Responses.getError({ message: `El orientacion ${id} no ha sido encontrado.` }));
    
    orientacion.remove(id, function (err, orientacion) {
      if (err) return response.status(500).send(Responses.getError({ message: err.message }));
      response.status(200).json(Responses.getSuccess({ message: `orientacion ${id} eliminado.` }));
    });
  });
}


