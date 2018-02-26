'use strict';

var util = require('util');
const ModelOrganizacion = require('../../api/models/organizacion');
const ModelUsers = require('../../api/models/user');

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
  var query = {};

  if (req.query.nombre) {
    query["nombre"] = { $regex: req.query.nombre, $options: "i" };
  }

  if (req.query.rbd) {
    if (req.query.rbd["min"] && req.query.rbd["max"]) {
      query["rbd"] = { $gte: req.query.rbd["min"], $lte: req.query.rbd["max"] };
    } else if (req.query.rbd["min"]) {
      query["rbd"] = { $gte: req.query.rbd["min"] }
    } else if (req.query.rbd["max"]) {
      query["rbd"] = { $lte: req.query.rbd["max"] }
    } else {
      query["rbd"] = { $eq: req.query.rbd }
    }
  }

  if (req.query.descripcion) {
    query["descripcion"] = { $regex: req.query.descripcion, $options: "i" };
  }

  if (req.query.reconocimiento_oficial) {
    query["reconocimientoOficial"] = { $regex: req.query.reconocimiento_oficial, $options: "i" };
  }

  if (req.query.dependencia) {
    query["dependencia"] = { $regex: req.query.dependencia, $options: "i" };
  }

  if (req.query.orientacion_religiosa) {
    query["orientacionReligiosa"] = { $regex: req.query.orientacion_religiosa, $options: "i" };
  }

  ///^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (req.query.correo) {
    query["correos"] = { $regex: req.query.correo, $options: "i" };
  }

  if (req.query.telefono) {
    query["telefonos.numero"] = { $eq: req.query.telefono };
  }

  if (req.query.web) {
    query["web"] = { $regex: req.query.web, $options: "i" };
  }

  if (req.query.mensualidad) {
    if (req.query.mensualidad["min"] && req.query.mensualidad["max"]) {
      query["mensualidad"] = { $gte: req.query.mensualidad["min"], $lte: req.query.mensualidad["max"] };
    } else if (req.query.mensualidad["min"]) {
      query["mensualidad"] = { $gte: req.query.mensualidad["min"] }
    } else if (req.query.mensualidad["max"]) {
      query["mensualidad"] = { $lte: req.query.mensualidad["max"] }
    } else {
      query["mensualidad"] = { $eq: req.query.mensualidad }
    }
  }

  if (req.query.puntaje_simce) {
    if (req.query.puntaje_simce["min"] && req.query.puntaje_simce["max"]) {
      query["puntajeSimce"] = { $gte: req.query.puntaje_simce["min"], $lte: req.query.puntaje_simce["max"] };
    } else if (req.query.puntaje_simce["min"]) {
      query["puntajeSimce"] = { $gte: req.query.puntaje_simce["min"] }
    } else if (req.query.puntaje_simce["max"]) {
      query["puntajeSimce"] = { $lte: req.query.puntaje_simce["max"] }
    } else {
      query["puntajeSimce"] = { $eq: req.query.puntaje_simce }
    }
  }

  // if(req.query.fecha_postulacion) {
  //   if(req.query.fecha_postulacion["min"] && req.query.fecha_postulacion["max"]){
  //     query["fechaPostulacion.inicio"] =  { $gte: req.query.fecha_postulacion["min"] };
  //     query["fechaPostulacion.cierre"] =  { $lte: req.query.fecha_postulacion["max"] };
  //   } else {
  //     query["fechaPostulacion.inicio"] = { $regex : req.query.fecha_postulacion, $options:"i" }
  //   }
  // }

  /* Direccion */
  if (req.query.calle) {
    query["direccion.calle"] = { $regex: req.query.calle, $options: "i" };
  }
  if (req.query.region) {
    query["direccion.region"] = { $regex: req.query.region, $options: "i" };
  }
  if (req.query.comuna) {
    query["direccion.comuna"] = { $regex: req.query.comuna, $options: "i" };
  }

  if (req.query.num_vacantes) {
    if (req.query.num_vacantes["min"] && req.query.num_vacantes["max"]) {
      query["numVacantes"] = { $gte: req.query.num_vacantes["min"], $lte: req.query.num_vacantes["max"] };
    } else if (req.query.num_vacantes["min"]) {
      query["numVacantes"] = { $gte: req.query.num_vacantes["min"] }
    } else if (req.query.num_vacantes["max"]) {
      query["numVacantes"] = { $lte: req.query.num_vacantes["max"] }
    } else {
      query["numVacantes"] = { $eq: req.query.num_vacantes }
    }
  }

  if (req.query.total_matriculados) {
    if (req.query.total_matriculados["min"] && req.query.total_matriculados["max"]) {
      query["totalAlumnosMatriculados"] = { $gte: req.query.total_matriculados["min"], $lte: req.query.total_matriculados["max"] };
    } else if (req.query.total_matriculados["min"]) {
      query["totalAlumnosMatriculados"] = { $gte: req.query.total_matriculados["min"] }
    } else if (req.query.total_matriculados["max"]) {
      query["totalAlumnosMatriculados"] = { $lte: req.query.total_matriculados["max"] }
    } else {
      query["totalAlumnosMatriculados"] = { $eq: req.query.total_matriculados }
    }
  }

  if (req.query.prom_alumnos_curso) {
    if (req.query.prom_alumnos_curso["min"] && req.query.prom_alumnos_curso["max"]) {
      query["promAlumnosCurso"] = { $gte: req.query.prom_alumnos_curso["min"], $lte: req.query.prom_alumnos_curso["max"] };
    } else if (req.query.prom_alumnos_curso["min"]) {
      query["promAlumnosCurso"] = { $gte: req.query.prom_alumnos_curso["min"] }
    } else if (req.query.prom_alumnos_curso["max"]) {
      query["promAlumnosCurso"] = { $lte: req.query.prom_alumnos_curso["max"] }
    } else {
      query["promAlumnosCurso"] = { $eq: req.query.prom_alumnos_curso }
    }
  }

  // Link : https://stackoverflow.com/questions/22080770/i-need-to-create-url-for-get-which-is-going-to-accept-array-how-in-node-js-expr
  if (req.query.sostenedor) {
    let arr = req.query.sostenedor.split(',');
    query["sostenedor"] = { $in: arr }
  }

  if (req.query.director) {
    let arr = req.query.director.split(',');
    query["director"] = { $in: arr }
  }

  if (req.query.cursos) {
    let arr = req.query.cursos.split(',');
    query["cursos"] = { $in: arr }
  }

  if (req.query.profesores) {
    let arr = req.query.profesores.split(',');
    query["profesores"] = { $in: arr }
  }

  if (req.query.alumnos) {
    let arr = req.query.alumnos.split(',');
    query["alumnos"] = { $in: arr }

    // http://localhost:10010/organizaciones?alumnos=5a74b03387e68a2f80c81672,5a73cb9c1819653ad8d4ab68
  }

  console.log(query)

  ModelOrganizacion.find(query)
    .populate('sostenedor')
    .populate('director')
    .populate('profesores')
    .populate('alumnos')
    .populate('cursos')
    .exec(function (err, organizacion) {
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
          'link': req.url,
          'data': organizacion,
          'type': "organizacion"
        });
      }
    })
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

  ModelOrganizacion.findById(organizacionID)
    .populate('sostenedor')
    .populate('director')
    .populate('profesores')
    .populate('alumnos')
    .populate('cursos')
    .exec(function (err, organizacion) {
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
      if (organizacion) {
        return res.status(200).json({
          link: req.url,
          data: [organizacion],
          type: "organizacion"
        });
      }
    })
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
  if (!req.body.correos) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba el atributo 'correos', pero no hubo exito",
    link: req.url,
    estado: "417"
  });
  if (!req.body.dependencia) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba el atributo 'dependencia', pero no hubo exito",
    link: req.url,
    estado: "417"
  });
  if (!req.body.telefonos) Error.push({
    titulo: "Peticion Incompleta",
    detalle: "Se esperaba un atributo 'telefonos', pero no hubo exito",
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
        detalle: "Ocurrio algun error al realizar la peticion",
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
            detalle: "Ocurrio algun error al guardar en la Base de Datos",
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

