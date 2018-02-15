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
 * @return {asignaturas} JSON con un objeto que contiene arreglo de Objeto de Asignaturas
 */
exports.getAsignaturas = (req, res) => {
  let Error = [];
  ModelAsignatura.find({}, (err, asignaturas) => {

    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrio algun error al realizar peticion",
        link: req.url,
        estado: "500"
      })
      return res.status(400).json({ errors: Error })
    }

    if (asignaturas.length == 0) {
      return res.status(200).json({ 
        link: req.url,
        data: [],
        type: "asignaturas"
      });
    } else {
      return res.status(200).json({
        link: req.url,
        data: asignaturas,
        type: "asignaturas"
      });
    }
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
  let Error = [];
  ModelAsignatura.create(request.body, function (err, asignatura) {
    asignatura.save(function (err) {
      if (err) {
        Error.push({
          titulo: "Error interno del servidor",
          detalle: "falló comunicación con la BD",
          link: request.url,
          estado: "500"
        })
        response.status(400).json({ errors: Error })
      }
      else
        return response.status(200).json({
          link: request.url,
          data: asignatura,
          type: "asignaturas"
        });
      console.log(asignatura);
    })
  });
  // let Error = [];
  // ModelAsignatura.create(req.body, function (err, asignatura) {
  //   if (err) return res.status(400).json({ Error })
  //   asignatura.save(function (err) {
  //     if (err) {
  //       res.status(500).send(Responses.getError({ message: err.message }));
  //       return;
  //     }
  //     res.status(200).json(asignatura);
  //   })
  // });
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
  let Error = [];

  if (id.length < 24 || id.length > 24) {
    Error.push({
      titulo: "ID no es valida",
      detalle: "Se esperaba ID valida",
      link: req.url,
      estado: "404"
    });
    return res.status(400).json({ errors: Error });
  }

  ModelAsignatura.findById(id, (err, asignatura) => {
    if (err && !asignatura) {
      Error.push({
        titulo: "ID no encontrada",
        detalle: "La ID no existe",
        link: req.url,
        estado: "404"
      });
      return res.status(400).json({ errors: Error });
    }
    res.json({
      link: req.url,
      data: [asignatura],
      type: "asignaturas"
    });
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
  let Error = [];

  if (id.length < 24 || id.length > 24) {
    Error.push({
      titulo: "ID no es valida",
      detalle: "Se esperaba ID valida",
      link: req.url,
      estado: "404"
    });
    return res.status(400).json({ errors: Error });
  }

  ModelAsignatura.findById(id, (err, asignatura) => {
    if (err && !asignatura) {
      Error.push({
        titulo: "ID no encontrada",
        detalle: "La ID no existe",
        link: req.url,
        estado: "404"
      });
      return res.status(400).json({ errors: Error });
    }
    asignatura = Object.assign(asignatura, req.body);
    asignatura.save(id, (err, asignatura) => {
      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrio algun error al realizar peticion",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }
      // res.json(asignatura); en caso de...
      res.status(200).json({ link: req.url });
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
  let Error = [];

  if (id.length < 24 || id.length > 24) {
    Error.push({
      titulo: "ID no es valida",
      detalle: "Se esperaba ID valida",
      link: req.url,
      estado: "404"
    });
    return res.status(400).json({ errors: Error });
  }

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