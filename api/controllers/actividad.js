'use strict';

var util = require('util');
var ModelActividad = require('../../api/models/actividad');
const Responses = require('../helpers/responses');


/** 
 * Función para obtener un arreglo de Actividades
 *
 * @author Samuel Carrasco Fuentes
 * @exports getActividades GET /actividades
 * @param req Petición HTTP
 * @param res | 200 Actividades | 404 No hay actividades | 500 Error al buscar |
 * @return {[actividades]} JSON con un objeto que contiene arreglo de Objetos Actividad
 */
exports.getActividades = (req, res) => {

  ModelActividad.find({}, (err, actividades) => {

    if (err) return res.status(500).send({ message: `Error al realizar peticion: ${err}` });

    if (!actividades) return res.status(404).send({ message: 'No existe ningún Actividad' });
    
    console.log(actividades);

    res.status(200).send({ actividades });
  });
}


/** 
 * Función para obtener una Actividad.
 *
 * @author Samuel Carrasco Fuentes
 * @exports getActividad GET /actividades/{id}
 * @param req Petición HTTP, id de actividad en path
 * @param res | 200 Actividad encontrada | 404 Actividad no existe | 500 Error al buscar |
 * @return {actividad: actividad} JSON con objeto Actividad
 */

exports.getActividad = (req, res) => {


  let idActividad = req.swagger.params.id.value

  
  ModelActividad.findById(idActividad, (err, actividad) => {

 
    if (err) return res.status(500).send({ message: `Error al realizar peticion: ${err}` });


    if (!actividad) return res.status(404).send({ message: `La Actividad no existe` });

    res.status(200).send({ actividad: actividad });

  });
}


/** 
 * Función para eliminar una Actividad.
 *
 * @author Samuel Carrasco Fuentes
 * @exports deleteActividad DELETE /actividades/{id}
 * @param req Petición HTTP, id de Actividad en Path
 * @param res | 200 Actividad eliminada | 500 Error al buscar | 404 La Actividad no existe |
 * @return {message: mensaje} JSON con mensaje
 */
exports.deleteActividad = (req, res) => {

  let idActividad = req.swagger.params.id.value;

  ModelActividad.findById(idActividad, (err, actividad) => {

    if (err) return res.status(500).json({ message: `Error al borrar la Actividad. Error: ${err}` });

    if (!actividad) {
      res.status(404).send(Responses.getError({ message: `La Actividad de ID ${idActividad} no existe` }));
      return;
    }

    actividad.remove(idActividad, function (err, actividad) {
      if (err) {
        res.status(500).send(Responses.getError({ message: err.message }));
        return;
      }
      res.status(200).json(Responses.getSuccess({ message: `La Actividad ${idActividad} ha sido eliminada` }));
    });
  });
}

/** 
 * Función para actualizar una Actividad.
 *
 * @author Samuel Carrasco Fuentes
 * @exports updateActividad PUT /actividades/{id}
 * @param req Petición HTTP, id de Actividad en path
 * @param res | 200 Actividad encontrada | 404 Actividad no existe | 500 Error al buscar |
 * @return {actividad} JSON Objeto Actividad
 */
exports.updateActividad = (req, res) => {


  let idActividad = req.swagger.params.id.value;

  ModelActividad.findById(idActividad, function (err, actividad) {


    if (err) {
      res.status(500).send(Responses.getError({ message: err.message }));
      return;
    }

 
    if (!actividad) {
      res.status(404).send(Responses.getError({ message: `La Actividad ${idActividad} no existe` }));
      return;
    }

    actividad = Object.assign(actividad, req.body);

    actividad.save(idActividad, function (err, Actividad) {

      if (err) {
        res.status(500).send(Responses.getError({ message: err.message }));
        return;
      }

      res.json(actividad);
    });
  });
}

/** 
 * Función para insertar una Actividad.
 *
 * @author Samuel Carrasco Fuentess
 * @exports postActividad  POST /actividades
 * @param req Petición HTTP, JSON Objeto Actividad en Body
 * @param res | 200 Actividad creada | 500 Error al buscar | 400 Bad Request
 * @return {actividad} JSON Objeto Actividad 
 */

exports.postActividad = (req, res) => {

  ModelActividad.create(req.body, function (err, actividad) {

    if (err) {
      res.status(400).send(Responses.getError({ message: err.message }));
      return;
    }

    actividad.save(function (err) {

      if (err) {
        res.status(500).send(Responses.getError({ message: err.message }));
        return;
      }

      res.status(200).json(actividad);

    })
  });
}




