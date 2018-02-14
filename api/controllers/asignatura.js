'use strict';

var util = require('util');
var ModelAsignatura = require('../../api/models/asignatura');
const Responses = require('../helpers/responses');

/** 
 * Función para obtener un arreglo de asignaturas.
 *
 * @author Israel Jasma
 * @exports getAsignaturas GET /asignaturas
 * @param req Petición HTTP
 * @param res | 200 Asignaturas | 404 No hay Asignaturas | 500 Error al buscar |
 * @return {Asignaturas} JSON con un objeto que contiene arreglo de Objeto de Asignaturas
 */
exports.getAsignaturas = (req, res) => {
  ModelAsignatura.find({}, (err, Asignaturas) => {

    if (err) return res.status(500).send({ message: "Error al realizar peticion: ${err}" });
    if (!Asignaturas) return res.status(404).send({ message: 'No existe ninguna asignatura' });
    res.status(200).send({ Asignaturas });
  });
}

/** 
 * Función para insertar una asignatura.
 *
 * @author Israel Jasma
 * @exports postAsignatura POST /asignaturas
 * @param req Petición HTTP, JSON Objeto asignatura en Body
 * @param res | 200 asignatura creado | 500 Error al buscar |
 * @return {asignatura} JSON Objeto asignatura
 */
exports.postAsignatura = (req, res) => {
  ModelAsignatura.create(req.body, function (err, asignatura) {

    asignatura.save(function (err) {
      if (err) {
        res.status(500).send(Responses.getError({ message: err.message }));
        return;
      }
      res.status(200).json(asignatura);
    })
  });
}

/** 
 * Función para obtener un Objetivo de asignatura.
 *
 * @author Israel Jasma
 * @exports getObjAprendizaje GET /asignaturas/{id}
 * @param req Petición HTTP, id de asignatura en path
 * @param res | 200 objetivo de asignatura encontrada | 404 objetivo de asignatura no existe | 500 Error al buscar |
 * @return {asignatura: asignatura} JSON con una variable de valor Objeto asignatura
 */
exports.getAsignatura = (req, res) => {
  let id = req.swagger.params.id.value
  ModelAsignatura.findById(id, (err, asignatura) => {

      if (err) return res.status(500).send({ message: 'Error al realizar peticion: ${err}' });
      if (!asignatura) return res.status(404).send({ message: 'La asignatura no existe' });
      res.status(200).send({ asignatura: asignatura });

  });
}

/** 
 * Función para actualizar un objetivo de asignatura.
 *
 * @author Israel Jasma
 * @exports updateAsignatura PUT /asignaturas/{id}
 * @param req Petición HTTP, id de objetivo de asignatura en path
 * @param res | 200 asignatura encontrada | 404 asignatura no existe | 500 Error al buscar |
 * @return {asignatura} JSON Objeto asignatura
 */
exports.updateAsignatura = (req, res) => {
  let id = req.swagger.params.id.value;
  ModelAsignatura.findById(id, (err, asignatura) => {

      if (err) {
          res.status(500).send(Responses.getError({ message: err.message }));
          return;
      }
      if (!asignatura) {
          res.status(404).send(Responses.getError({ message: 'La asignatura ${id} no existe' }));
          return;
      }
      asignatura = Object.assign(asignatura, req.body);
      asignatura.save(id, (err, asignatura) => {
          if (err) {
              res.status(500).send(Responses.getError({ message: err.message }));
              return;
          }
          res.json(asignatura);
      });

  });
}

/** 
 * Función para eliminar una asignatura.
 *
 * @author Israel Jasma
 * @exports deleteAsignatura DELETE /asignaturas/{id}
 * @param req Petición HTTP, id de asignatura en Path
 * @param res | 200 asignatura eliminada | 500 Error al buscar | 404 La asignatura no existe |
 * @return {message:mensaje} JSON con mensaje
 */
exports.deleteAsignatura = (req, res) => {
  let id = req.swagger.params.id.value;
  ModelAsignatura.findById(id, (err, asignatura) => {

      if (err) return res.status(500).json({ message: `Error al borrar la asignatura. Error: ${err}` });
      if (!asignatura) {
          res.status(404).send(Responses.getError({ message: `La asignatura de ID ${id} no existe` }));
          return;
      }
      asignatura.remove(id, function (err, asignatura) {
          if (err) {
              res.status(500).send(Responses.getError({ message: err.message }));
              return;
          }
          res.status(200).json(Responses.getSuccess({ message: `La asignatura ${id} ha sido eliminada` }));
      });

  });
}