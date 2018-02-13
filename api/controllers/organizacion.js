'use strict';

var util = require('util');

const ModelOrganizacion = require('../../api/models/organizacion');
const Responses = require('../helpers/responses');

/** 
 * @name getListOrganizaciones getListOrganizaciones GET /organizaciones
 * @description Funcion que obtiene una lista de organizaciones
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {Organizacion} JSON Objeto Organizacion
 */
exports.getListOrganizaciones = (req, res) => {
  ModelOrganizacion.find({}, (err, organizacion) => {
    // console.log(organizacion.length);
    if (err) return res.status(500).json({ message: `Error al realizar peticion: ${err}` });
    if (!organizacion) return res.status(400).json({ message: 'No existe ninguna organizacion' });
    console.log(res.status(200).statusCode);
    // console.log(organizacion);
    console.log(err);
    res.status(200).json({ organizacion });
  });
}

/** 
 * @name getOrganizacion getOrganizacion GET /organizaciones
 * @description Funcion que obtiene una organizacion
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {Organizacion} JSON Objeto Organizacion
 */
exports.getOrganizacion = (req, res) => {
  let organizacionID = req.swagger.params.id.value;
  ModelOrganizacion.findById(organizacionID, function (err, organizacion) {
    // console.log(organizacion);
    if (err) {
      res.status(500).send(Responses.getError({ message: err.message }));
      return;
    }
    if (!organizacion) {
      res.status(404).send(Responses.getError({ message: `La organizacion con ID ${organizacionID} no existe.` }));
      return;
    }

    res.json({ organizacion });
  });
}

/** 
 * @name updateOrganizacion updateOrganizacion PUT /organizaciones
 * @description Funcion que modifica una  organizacion
 * @author Israel Ogas
 * @param request una identificacion de solicitud de un objeto
 * @param response una identificacion de respuesta de un objeto
 * @return {Organizacion} JSON Objeto Organizacion
 */
exports.updateOrganizacion = (request, response) => {
  let id = request.swagger.params.id.value;

  if (id.length < 24 || id.length > 24) {
    return response.status(400).send(Responses.getError({ message: 'Se ingresó una ID no valida' }));
  }

  ModelOrganizacion.findById(id, function (err, organizacion) {
    if (err) {
      response.status(500).send(Responses.getError({ message: err.message }));
      return;
    }
    if (!organizacion) {
      response.status(404).send(Responses.getError({ message: `La organización con ID ${id} no se ha encontrado.` }));
      return;
    }
    organizacion = Object.assign(organizacion, request.body);
    organizacion.save(id, function (err, organizacion) {
      if (err) {
        response.status(500).send(Responses.getError({ message: err.message }));
      }
      response.json(organizacion);
    });
  });
}


/** 
 * @name deleteOrganizacion createOrganizacion DELETE /organizaciones
 * @description Funcion que elimina una organizacion
 * @author Israel Ogas
 * @param request una identificacion de solicitud de un objeto
 * @param response una identificacion de respuesta de un objeto
 * @return JSON con una respuesta
 */
exports.deleteOrganizacion = (request, response) => {
  let organizacionID = request.swagger.params.id.value;
  console.log(organizacionID);

  if (organizacionID.length < 24 || organizacionID.length > 24) {
    return response.status(400).send(Responses.getError({ message: 'Se ingresó una ID no valida' }));
  }

  ModelOrganizacion.findById(organizacionID, (err, organizacion) => {
    if (err) return response.status(500).json({ message: `Error al borrar la organizacion: ${err}` });
    if (!organizacion) {
      response.status(404).send(Responses.getError({ message: `La organizacion de ID ${organizacionID} no existe.` }));
      return;
    }
    //Elimina la organizacion si se encontró el id
    organizacion.remove(organizacionID, function (err, organizacion) {
      if (err) {
        response.status(500).send(Responses.getError({ message: err.message }));
      }
      response.status(200).json(Responses.getSuccess({ message: `La organizacion ${organizacionID} ha sido borrada.` }));
    });
  });
}


/** 
 * @name createOrganizacion createOrganizacion POST /organizaciones
 * @description Funcion que crea una nueva organizacion
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {Organizacion} JSON Objeto Organizacion
 */
exports.createOrganizacion = (req, res) => {
  ModelOrganizacion.create(req.body, function (err, organizacion) {
    if (err) return res.status(500).send(Responses.getError({ message: err.message }));
    organizacion.save(function (err) {
      if (err) return res.status(500).send(Responses.getError({ message: err.message }));
      res.status(200).json(organizacion);
    })
  });
}
