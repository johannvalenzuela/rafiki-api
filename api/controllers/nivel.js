'use strict';

var util = require('util');
var ModelNivel = require('../../api/models/nivel');
const Responses = require('../helpers/responses');
/** Exportación de las funciones para usar en el resto del código */
module.exports = {
  get_niveles: get_niveles,
  getNivelId: getNivelId,
  createNivel: createNivel,
  updateNivel: updateNivel,
  deleteNivel: deleteNivel

};
/** 
 * Función para obtener un arreglo de niveles
 *
 * @author Héctor Astorga Terraza
 * @exports get_niveles GET /niveles
 * @param request Petición HTTP
 * @param response | 200 niveles | 404 No hay niveles | 500 Error al buscar |
 * @return {[niveles]} JSON con un objeto que contiene arreglo de Objetos nivel
 */
function get_niveles(request, response) {
  let Error = [];
  ModelNivel.find({}, (err, nivel) => {

    if (err) {
      Error.push({
        titulo: "error interno del servidor",
        detalle: "ocurrió un error interno al realizar petición",
        link: request.url,
        estado: "500"
      })
      return response.json({ errors: Error })
    } else
      if (nivel.length == 0) {
        Error.push({
          titulo: "No se ha encontrado elementos",
          detalle: "No existen niveles",
          link: request.url,
          estado: "404"
        })
        return response.json({ errors: Error })
      } else {
        return response.status(200).json({
          link: request.url,
          data: nivel,
          type: "niveles"
        });
        console.log(nivel);
      }

  });

}
/** 
 * Función para obtener un objeto nivel
 *
 * @author Héctor Astorga Terraza
 * @exports getNivelId GET /niveles/{id}
 * @param request Petición HTTP, id de nivel en path
 * @param response | 200 existe nivel | 404 No hay nivel | 500 Error al buscar |
 * @return {[nivel: nivel]} JSON con un objeto nivel
 */
function getNivelId(request, response) {

  let id = request.swagger.params.id.value;
  let Error = [];

  if (id.length != 24) {
    Error.push({
      titulo: "ID no valida",
      detalle: "No se introdujo una ID valida",
      link: request.url,
      estado: "404"
    })
    return response.json({ errors: Error })
  }
  else {
    ModelNivel.findById(id, function (err, nivel) {
      if (!nivel) {
        Error.push({
          titulo: "No existe el elemento buscado",
          detalle: "No se introdujo un ID de algún nivel",
          link: request.url,
          estado: "404"
        })
        return response.json({ errors: Error })
      } else
        if (err) {
          Error.push({
            titulo: "Error interno del servidor",
            detalle: "falló comunicación con la BD",
            link: request.url,
            estado: "500"
          })
          return response.json({ errors: Error })
        }
        else {
          return response.status(200).json({
            link: request.url,
            data: nivel,
            type: "niveles"
          });
          console.log(nivel);
        }
    });
  }
}


/** 
 * Función para insertar un objeto nivel
 *
 * @author Héctor Astorga Terraza
 * @exports createNivel POST /niveles
 * @param request Petición HTTP, objeto nivel JSON en Body
 * @param response | 200 nivel creado | 500 Error al buscar |
 * @return {nivel} JSON con un objeto nivel
 */
function createNivel(request, response) {
  let Error = [];
  ModelNivel.create(request.body, function (err, nivel) {
    nivel.save(function (err) {
      if (err) {
        Error.push({
          titulo: "Error interno del servidor",
          detalle: "falló comunicación con la BD",
          link: request.url,
          estado: "500"
        })
        response.json({ errors: Error })
      }
      else
        return response.status(200).json({
          link: request.url,
          data: nivel,
          type: "niveles"
        });
      console.log(nivel);


    })
  });
}
/** 
 * Función para actualizar un objeto nivel
 *
 * @author Héctor Astorga Terraza
 * @exports updateNivel PUT /niveles/{id}
 * @param request Petición HTTP, id del objeto nivel en path
 * @param response | 200 nivel creado | 404 no existe nivel | 500 Error al buscar |
 * @return {nivel} JSON con un objeto nivel
 */
function updateNivel(request, response) {
  let id = request.swagger.params.id.value;
  let Error = [];

  if (id.length != 24) {
    Error.push({
      titulo: "ID no valida",
      detalle: "No se introdujo una ID valida",
      link: request.url,
      estado: "404"
    })
    return response.json({ errors: Error })
  } else {
    ModelNivel.findById(id, function (err, nivel) {
      if (!nivel) {
        Error.push({
          titulo: "No existe el elemento buscado",
          detalle: "No se introdujo un ID de un nivel",
          link: request.url,
          estado: "404"
        })
        return response.json({ errors: Error })
      } else
        if (err) {
          Error.push({
            titulo: "Error interno del servidor",
            detalle: "falló comunicación con la BD",
            link: request.url,
            estado: "500"
          })
          return response.json({ errors: Error })
        }
        else {

          nivel = Object.assign(nivel, request.body);
          nivel.save(id, function (err, nivel) {

            return response.status(200).json({
              link: request.url,
              data: nivel,
              type: "niveles"
            });
            console.log(nivel);
          });
        }
    });
  }
}
/** 
 * Función para eliminar un objeto nivel
 *
 * @author Héctor Astorga Terraza
 * @exports deleteNivel DELETE /niveles/{id}
 * @param request Petición HTTP, id del objeto nivel en path
 * @param response | 200 nivel eliminado | 404 no existe nivel | 500 Error al buscar |
 * @return {message:mensaje} JSON con mensaje
 */
function deleteNivel(request, response) {
  let id = request.swagger.params.id.value;
  let Error = [];
  if (id.length != 24) {
    Error.push({
      titulo: "ID no valida",
      detalle: "No se introdujo una ID valida",
      link: request.url,
      estado: "404"
    })
    return response.json({ errors: Error })
  } else {

    ModelNivel.findById(id, function (err, nivel) {
      if (err) {
        Error.push({
          titulo: "Error interno del servidor",
          detalle: "falló comunicación con la BD",
          link: request.url,
          estado: "500"
        })
        return response.json({ errors: Error })
      }
      else
        if (!nivel) {
          Error.push({
            titulo: "No existe el elemento buscado",
            detalle: "No se introdujo un ID de un nivel",
            link: request.url,
            estado: "404"
          })
          return response.json({ errors: Error })
        } else {

          nivel.remove(id, function (err, nivel) {
            response.status(200).json({ link: request.url });
          });
        }
    });
  }
}


