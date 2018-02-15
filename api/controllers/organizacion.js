'use strict';

var util = require('util');
const ModelOrganizacion = require('../../api/models/organizacion');

/** 
 * @name getListOrganizaciones getListOrganizaciones GET /organizaciones
 * @description Funcion que obtiene una lista de organizaciones
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {Organizacion} JSON Objeto Organizacion
 */
exports.getListOrganizaciones = (req, res) => {
  let Error = [];
  ModelOrganizacion.find({}, (err, organizacion) => {
    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrio algun error al realizar peticion",
        link: req.url,
        estado: "500"
      })
      return res.status(400).json({ errors: Error })
    }
    if (!organizacion) {
      Error.push({
        titulo: "No existen organizaciones",
        detalle: "La base de datos se encuentra sin organizaciones",
        link: req.url,
        estado: "404"
      })
      return res.status(400).json({ errors: Error })
    }
    if (organizacion || organizacion.length == 0) {
      return res.status(200).json({
        link: req.url,
        data: organizacion,
        type: "organizacion"
      });
    }
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
  let Error = [];
  if (organizacionID.length < 24 || organizacionID.length > 24) {
    Error.push({
      titulo: "ID no es valida",
      detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
      link: req.url,
      estado: "404"
    });
    return res.status(400).json({ errors: Error });
  }

  ModelOrganizacion.findById(organizacionID, function (err, organizacion) {
    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrio algun error al realizar peticion",
        link: req.url,
        estado: "500"
      })
      return res.status(500).json({ errors: Error })
    }
    if (!organizacion) {
      Error.push({
        titulo: "ID no encontrada",
        detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
        link: req.url,
        estado: "404"
      });
      return res.status(400).json({ errors: Error });
    }
    res.status(200).json({
      link: req.url,
      data: [organizacion],
      type: "organizaciones"
    });

  });

}

/**
 * @name updateOrganizacion updateOrganizacion PUT /organizaciones
 * @description Funcion que modifica una  organizacion
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {Organizacion} JSON Objeto Organizacion
 */
exports.updateOrganizacion = (req, res) => {
  let id = req.swagger.params.id.value;
  let Error = [];

  if (id.length < 24 || id.length > 24) {
    Error.push({
      titulo: "ID no es valida",
      detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
      link: req.url,
      estado: "404"
    });
    //res.status(400).json({ errors: Error });
  }

  ModelOrganizacion.findById(id, function (err, organizacion) {
    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrio algun error al realizar peticion",
        link: req.url,
        estado: "500"
      })
      return res.status(400).json({ errors: Error })
    }
    if (!organizacion) {
      Error.push({
        titulo: "ID no encontrada",
        detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
        link: req.url,
        estado: "404"
      });
      return res.status(400).json({ errors: Error });
    }
    organizacion = Object.assign(organizacion, req.body);
    organizacion.save(id, function (err, organizacion) {
      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrio algun error al realizar peticion",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }
      res.status(201).json({ link: req.url });
    });
  });
}

/** 
 * @name deleteOrganizacion createOrganizacion DELETE /organizaciones
 * @description Funcion que elimina una organizacion
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return JSON con una respuesta
 */
exports.deleteOrganizacion = (req, res) => {
  let organizacionID = req.swagger.params.id.value;
  let Error = [];

  if (organizacionID.length < 24 || organizacionID.length > 24) {
    Error.push({
      titulo: "ID no es valida",
      detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
      link: req.url,
      estado: "404"
    });
    return res.status(400).json({ errors: Error });
  }

  ModelOrganizacion.findById(organizacionID, (err, organizacion) => {
    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrio algun error al realizar peticion",
        link: req.url,
        estado: "500"
      })
      return res.status(500).json({ errors: Error })
    }
    if (!organizacion) {
      Error.push({
        titulo: "ID no encontrada",
        detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
        link: req.url,
        estado: "404"
      });
      return res.status(400).json({ errors: Error });
    }
    //Elimina la organizacion si se encontró el id
    organizacion.remove(organizacionID, function (err, organizacion) {
      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrio algun error al realizar peticion",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }
      res.status(200).json({ link: req.url });
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
  let Error = [];

  /* Verificando si existe cada atributo que realmente sea requerido y necesario */
  if (!req.body.nombre) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba el atributo 'nombre', pero no hubo exito",
    link: req.url,
    estado: "417"
  });
  if (!req.body.rbd) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba el atributo 'rbd', pero no hubo exito",
    link: req.url,
    estado: "417"
  });
  if (!req.body.reconocimientoOficial) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba el atributo 'reconocimientoOficial', pero no hubo exito",
    link: req.url,
    estado: "417"
  });
  if (!req.body.correo) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba el atributo 'correo', pero no hubo exito",
    link: req.url,
    estado: "417"
  });
  if (!req.body.dependencia) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba el atributo 'dependencia', pero no hubo exito",
    link: req.url,
    estado: "417"
  });
  if (!req.body.telefono) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba un atributo 'telefono', pero no hubo exito",
    link: req.url,
    estado: "417"
  });
  if (!req.body.mensualidad) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba un atributo 'mensualidad', pero no hubo exito",
    link: req.url,
    estado: "417"
  });
  if (!req.body.direccion) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba un objeto 'direccion', pero no hubo exito",
    link: req.url,
    estado: "417"
  });
  if (!req.body.fechaPostulacion) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba un objeto 'fechaPostulacion', pero no hubo exito",
    link: req.url,
    estado: "417"
  });

  if (Error.length > 0) {
    return res.status(400).json({ errors: Error });
  }

  ModelOrganizacion.create(req.body, function (err, organizacion) {
    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrio algun error al realizar peticion",
        link: req.url,
        estado: "500"
      })
      return res.status(400).json({ errors: Error })
    }
    if (!organizacion) {
      Error.push({
        titulo: "Peticion Erronea",
        detalle: "El JSON que se envió no es valido",
        link: req.url,
        estado: "404"
      })
      return res.status(400).json({ errors: Error })
    }
    if (organizacion) {
      organizacion.save((err) => {
        if (err) {
          Error.push({
            titulo: "Error Interno en el Servidor",
            detalle: "Ocurrio algun error al realizar peticion",
            link: req.url,
            estado: "500"
          })
          return res.status(400).json({ errors: Error })
        }
        res.status(200).json({ link: req.url });
      });
    }
  })
}

