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
 * @param request Petición HTTP
 * @param response | 200 hay orientaciones | 404 No hay orientaciones | 500 Error al buscar |
 * @return {[object]} JSON con un objeto que contiene arreglo de Objetos
 * @return { errors: Error } JSON con un objeto Error
 */
function getOrientaciones(request, response) {
  let Error = [];
  ModelOrientacion.find({})
  .populate('asignaturas')
  .exec(function (err, orientacion ) {
    if (err) {
      Error.push({
        titulo: "error interno del servidor",
        detalle: "ocurrió un error interno al realizar petición",
        link: request.url,
        estado: "500"
      })
      return response.status(400).json({ errors: Error })
    }
    if (orientacion.length == 0) {
      Error.push({
        titulo: "No se ha encontrado elementos",
        detalle: "No existen orientaciones curriculares",
        link: request.url,
        estado: "404"
      })
      return response.status(400).json({ errors: Error })
    }
    else {

      return response.status(200).json({
        link: request.url,
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
 * @param request Petición HTTP, id de la orientación curricular en path
 * @param response | 200 existe orientacion curricular | 404 No hay orientación curricular | 500 Error al buscar |
 * @return {[orientacion_curricular: orientacion_curricular]} JSON con un objeto orientacion_curricular
 * @return { errors: Error } JSON con un objeto Error
 */
function getOrientacionId(request, response) {
  let Error = [];
  let id = request.swagger.params.id.value;

  if (id.length != 24) {
    Error.push({
      titulo: "ID no valida",
      detalle: "No se introdujo una ID valida",
      link: request.url,
      estado: "404"
    })
    return response.status(400).json({ errors: Error })
  }
  ModelOrientacion.findById(id) 
  .populate('asignaturas')
  .exec(function (err, orientacion) {

    if (!orientacion) {
      Error.push({
        titulo: "No existe el elemento buscado",
        detalle: "No se introdujo una ID de alguna orientación curricular",
        link: request.url,
        estado: "404"
      })
      return response.status(400).json({ errors: Error })
    } else
      if (err) {
        Error.push({
          titulo: "Error interno del servidor",
          detalle: "falló comunicación con la BD",
          link: request.url,
          estado: "500"
        })
        return response.status(400).json({ errors: Error })
      }
    return response.status(200).json({
      link: request.url,
      data: [orientacion],
      type: "orientaciones"
    });
    console.log(orientacion);
  });
}


/** 
 * Función para insertar un objeto orientacion_curricular
 *
 * @author Héctor Astorga Terraza 
 * @exports createOrientacion POST /orientacion
 * @param request Petición HTTP, objeto orientacion_curricular JSON en Body
 * @param response | 200 objeto orientacion_curricular creado | 500 Error al buscar |
 * @return { request.url } JSON con un objeto orientacion_curricular
 * @return { errors: Error } JSON con un objeto Error
 */
function createOrientacion(request, response) {
  let Error = [];
  ModelOrientacion.create(request.body, function (err, orientacion) {
    if (err) return response.status(500).json({ errors: Error });
    orientacion.save((err) => {

      if (err) {
        Error.push({
          titulo: "Error interno del servidor",
          detalle: "falló comunicación con la BD",
          link: request.url,
          estado: "500"
        })
        return response.status(400).json({ errors: Error })
      }
      else
        return response.status(200).json({
          link: request.url
        });
      console.log(orientacion);
    })
  });
}

/** 
 * Función para actualizar un objeto orientacion_curricular
 *
 * @author Héctor Astorga Terraza
 * @exports updateNivel PUT /orientaciones/{id}
 * @param request Petición HTTP, id del objeto orientacion_curricular en path
 * @param response | 200 orientación curricular creada | 404 no existe orientación curricular | 500 Error al buscar |
 * @return { request.url } JSON con un objeto
 * @return { errors: Error } JSON con un objeto Error
 */
function updateOrientacion(request, response) {
  let id = request.swagger.params.id.value;
  let Error = [];

  if (id.length != 24) {
    Error.push({
      titulo: "ID no valida",
      detalle: "No se introdujo una ID valida",
      link: request.url,
      estado: "404"
    })
    return response.status(400).json({ errors: Error })
  } else

    ModelOrientacion.findById(id, function (err, orientacion) {
      if (!orientacion) {
        Error.push({
          titulo: "No existe el elemento buscado",
          detalle: "No se introdujo una ID de alguna orientación curricular",
          link: request.url,
          estado: "404"
        })
        return response.status(400).json({ errors: Error })
      } else
        if (err) {
          Error.push({
            titulo: "Error interno del servidor",
            detalle: "falló comunicación con la BD",
            link: request.url,
            estado: "500"
          })
          return response.status(400).json({ errors: Error })
        }
        else {

          orientacion = Object.assign(orientacion, request.body);
          orientacion.save(id, function (err, orientacion) {

            return response.status(200).json({ link: request.url });
            console.log(orientacion);
          });
        }
    });
}
/** 
 * Función para eliminar un objeto orientacion_curricular
 *
 * @author Héctor Astorga Terraza
 * @exports deleteNivel DELETE /orientaciones/{id}
 * @param request Petición HTTP, id del objeto orientacion_curricular en path
 * @param response | 200 orientacion eliminada | 404 no existe la orientación curricular | 500 Error al buscar |
 * @return { request.url } JSON con mensaje
 * @return { errors: Error } JSON con un objeto Error
 */
function deleteOrientacion(request, response) {
  let id = request.swagger.params.id.value;
  let Error = [];

  if (id.length != 24) {
    Error.push({
      titulo: "ID no valida",
      detalle: "No se introdujo una ID valida",
      link: request.url,
      estado: "404"
    })
    return response.status(400).json({ errors: Error })
  } else

    ModelOrientacion.findById(id, function (err, orientacion) {

      if (id.length != 24) {
        Error.push({
          titulo: "ID no valida",
          detalle: "No se introdujo una ID valida",
          link: request.url,
          estado: "404"
        })
        return response.status(400).json({ errors: Error })
      } else

        if (!orientacion) {
          Error.push({
            titulo: "No existe el elemento buscado",
            detalle: "No se introdujo una ID de alguna orientación curricular",
            link: request.url,
            estado: "404"
          })
          return response.status(400).json({ errors: Error })
        } else
          if (err) {
            Error.push({
              titulo: "Error interno del servidor",
              detalle: "falló comunicación con la BD",
              link: request.url,
              estado: "500"
            })
            return response.status(400).json({ errors: Error })
          } else {

            orientacion.remove(id, function (err, orientacion) {
              response.status(200).json({ link: request.url });
            });

          }


    });
}


