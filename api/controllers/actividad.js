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
 * @return {object} JSON con un objeto que contiene arreglo de Objetos Actividad
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getActividades = (req, res) => {

  let Error = [];

  var query = {};


  if (req.query.autor) {

    query["autor"] = { $regex : req.query.autor, $options:"i" };

  }

  if (req.query.dificultad) {

    query["dificultad"] = { $regex : req.query.dificultad, $options:"i" };

  }

  if (req.query.nivelAprendizaje) {

    query["nivelAprendizaje"] = { $regex : req.query.nivelAprendizaje, $options:"i" };

  }

  if (req.query.tipoPregunta) {

    query["tipoPregunta"] = { $regex : req.query.tipoPregunta, $options:"i" };

  }

  if (req.query.nivel) {

    query["nivel"] = { $regex : req.query.nivel, $options:"i" };

  }

  if (req.query.tema) {

    query["tema"] = { $regex : req.query.tema, $options:"i" };

  }

  if (req.query.subTema) {

    query["subTema"] = { $regex : req.query.subTema, $options:"i" };

  }

  if (req.query.preguntaEnunciado) {

    query["preguntaEnunciado"] = { $regex : req.query.preguntaEnunciado, $options:"i" };
  }

  if (req.query.puntajeTotal) {

    query["puntajeTotal"] = { $eq : req.query.puntajeTotal};

  }

  ModelActividad.find(query)
    .populate('autor')
    .populate('nivel')
    .exec(function (err, actividades) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })

        console.log(err);
        return res.status(400).json({ errors: Error })
      }

      if (!actividades) {

        Error.push({
          titulo: "No existen Actividades",
          detalle: "La base de datos se encuentra sin actividades",
          link: req.url,
          estado: "404"
        });
        return res.status(400).json({ errors: Error });
      }
      else {

        return res.status(200).json({
          link: req.url,
          data: actividades,
          type: "actividades"
        });
      }

    });
}


/** 
 * Función para obtener una Actividad.
 *
 * @author Samuel Carrasco Fuentes
 * @exports getActividad GET /actividades/{id}
 * @param req Petición HTTP, id de actividad en path
 * @param res | 200 Actividad encontrada | 404 Actividad no existe | 500 Error al buscar |
 * @return {object} JSON con objeto Actividad
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */

exports.getActividad = (req, res) => {

  let Error = [];
  let idActividad = req.swagger.params.id.value

  ModelActividad.findById(idActividad)
    .populate('nivel')
    .populate('autor')
    .exec(function (err, actividad) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }

      if (!actividad) {

        Error.push({
          titulo: "La actividad no existe",
          detalle: "El id ingresado no corresponde a una actividad",
          link: req.url,
          estado: "404"
        });
        return res.status(400).json({ errors: Error });
      }
      else {

        return res.status(200).json({
          link: req.url,
          data: [actividad],
          type: "actividades"
        });

      }

    });
}

/** 
 * Función para obtener nivel de una Actividad.
 *
 * @author Samuel Carrasco Fuentes
 * @exports getNivelActividad GET /actividades/{id}/nivel
 * @param req Petición HTTP, id de actividad en path
 * @param res | 200 Actividad encontrada | 404 Actividad no existe | 500 Error al buscar |
 * @return {object} JSON con objeto Nivel de una Actividad
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getNivelActividad = (req, res) => {

  let Error = [];
  let idActividad = req.swagger.params.id.value

  ModelActividad.findById(idActividad)
    .populate('nivel')
    .exec(function (err, actividad) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }

      if (!actividad) {

        Error.push({
          titulo: "La actividad no existe",
          detalle: "El id ingresado no corresponde a una actividad",
          link: req.url,
          estado: "404"
        });
        return res.status(400).json({ errors: Error });
      }
      else {

        return res.status(200).json({
          link: req.url,
          data: [actividad.nivel],
          type: "niveles"
        });

      }

    });
}

/** 
 * Función para obtener autor de una Actividad.
 *
 * @author Samuel Carrasco Fuentes
 * @exports getAutorActividad GET /actividades/{id}/autor
 * @param req Petición HTTP, id de actividad en path
 * @param res | 200 Actividad encontrada | 404 Actividad no existe | 500 Error al buscar |
 * @return {object} JSON con objeto Autor de una Actividad
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getAutorActividad = (req, res) => {

  let Error = [];
  let idActividad = req.swagger.params.id.value

  ModelActividad.findById(idActividad)
    .populate('autor')
    .exec(function (err, actividad) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }

      if (!actividad) {

        Error.push({
          titulo: "La actividad no existe",
          detalle: "El id ingresado no corresponde a una actividad",
          link: req.url,
          estado: "404"
        });
        return res.status(400).json({ errors: Error });
      }
      else {

        return res.status(200).json({
          link: req.url,
          data: [actividad.autor],
          type: "users"
        });

      }

    });
}



/** 
 * Función para eliminar una Actividad.
 *
 * @author Samuel Carrasco Fuentes
 * @exports deleteActividad DELETE /actividades/{id}
 * @param req Petición HTTP, id de Actividad en Path
 * @param res | 200 Actividad eliminada | 500 Error al buscar | 404 La Actividad no existe |
 * @return {req.url} JSON con link
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.deleteActividad = (req, res) => {

  let Error = [];
  let idActividad = req.swagger.params.id.value;

  ModelActividad.findById(idActividad, (err, actividad) => {

    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrió algún error al realizar petición",
        link: req.url,
        estado: "500"
      })
      return res.status(400).json({ errors: Error })
    }

    if (!actividad) {

      Error.push({
        titulo: "La actividad no existe",
        detalle: "El id ingresado no corresponde a una actividad",
        link: req.url,
        estado: "404"
      });
      return res.status(400).json({ errors: Error });
    }

    actividad.remove(idActividad, function (err, actividad) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }
      else
        res.status(200).json({ link: req.url });
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
 * @return {req.url} JSON con link
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.updateActividad = (req, res) => {

  let Error = [];
  let idActividad = req.swagger.params.id.value;

  ModelActividad.findById(idActividad, function (err, actividad) {


    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrió algún error al realizar petición",
        link: req.url,
        estado: "500"
      })
      return res.status(400).json({ errors: Error })
    }

    if (!actividad) {

      Error.push({
        titulo: "La actividad no existe",
        detalle: "El id ingresado no corresponde a una actividad",
        link: req.url,
        estado: "404"
      });
      return res.status(400).json({ errors: Error });
    }

    actividad = Object.assign(actividad, req.body);

    actividad.save(idActividad, function (err, Actividad) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }
      else
        return res.status(200).json({ link: req.url });
    });
  });
}

/** 
 * Función para insertar una Actividad.
 *
 * @author Samuel Carrasco Fuentess
 * @exports postActividad  POST /actividades
 * @param req Petición HTTP, JSON Objeto Actividad en Body
 * @param res | 201 Actividad creada | 500 Error al buscar | 400 Bad Request
 * @return {req.url} JSON con link
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */

exports.postActividad = (req, res) => {

  let Error = [];

  if (!req.body.dificultad) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'dificultad'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.nivelAprendizaje) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'nivelAprendizaje'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.tipoPregunta) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'tipoPregunta'",
    link: req.url,
    estado: "417"
  });


  if (!req.body.tema) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'tema'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.subTema) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'subTema'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.preguntaEnunciado) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'preguntaEnunciado'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.respuesta) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'respuesta'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.respuestaVerdaderoFalso) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'respuestaVerdaderoFalso'",
    link: req.url,
    estado: "417"
  });



  if (Error.length > 0) {
    return res.status(400).json({ errors: Error });
  }


  ModelActividad.create(req.body, function (err, actividad) {

    if (err) {
      Error.push({
        titulo: "Solicitud incorrecta",
        detalle: "El valor de un atributo es incorrecto",
        link: req.url,
        estado: "404"
      })
      return res.status(400).json({ errors: Error })
    }

    actividad.save(function (err) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }
      else
        res.status(201).json({ link: req.url });

    })
  });
}




