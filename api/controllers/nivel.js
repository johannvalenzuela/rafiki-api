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
 * @param req Petición HTTP
 * @param res | 200 niveles | 404 No hay niveles | 500 Error al buscar |
 * @return {[niveles]} JSON con un objeto que contiene arreglo de Objetos nivel
 */
function get_niveles(req, res) {
  ModelNivel.find({}, (err, nivel) => {
    if (err) return res.status(500).send({ message: 'Error al realizar peticion: ${err}' });
    if (!nivel) return res.status(404).send({ message: 'No existe ningún nivel' });
    res.status(200).json(nivel)
    console.log(nivel);
  });

}
/** 
 * Función para obtener un objeto nivel
 *
 * @author Héctor Astorga Terraza
 * @exports getNivelId GET /niveles/{id}
 * @param req Petición HTTP, id de nivel en path
 * @param res | 200 existe nivel | 404 No hay nivel | 500 Error al buscar |
 * @return {[nivel: nivel]} JSON con un objeto nivel
 */
function getNivelId(req, res) {

  let id = req.swagger.params.id.value;
  ModelNivel.findById(id, function (err, nivel) {

    if (err) return res.status(500).send(Responses.getError({ message: err.message }));
    if (!nivel) return res.status(404).send(Responses.getError({ message: `nivel ${id} not found.` }));

    res.json(nivel);
  });
}


/** 
 * Función para insertar un objeto nivel
 *
 * @author Héctor Astorga Terraza
 * @exports createNivel POST /niveles
 * @param req Petición HTTP, objeto nivel JSON en Body
 * @param res | 200 nivel creado | 500 Error al buscar |
 * @return {nivel} JSON con un objeto nivel
 */
function createNivel(request, response) {
  ModelNivel.create(request.body, function (err, nivel) {
    nivel.save(function (err) {

      if (err) return response.status(500).send(Responses.getError({ message: err.message }));
      console.log(nivel);

      response.status(200).json({
        sigla: nivel.sigla,
        tipo_nivel: nivel.tipo_nivel,
        grado: nivel.grado,
        descripcion: nivel.descripcion,
        decreto: nivel.decreto
      });
    })
  });
}
/** 
 * Función para actualizar un objeto nivel
 *
 * @author Héctor Astorga Terraza
 * @exports updateNivel PUT /niveles/{id}
 * @param req Petición HTTP, id del objeto nivel en path
 * @param res | 200 nivel creado | 404 no existe nivel | 500 Error al buscar |
 * @return {nivel} JSON con un objeto nivel
 */
function updateNivel(request, response) {
  let id = request.swagger.params.id.value;

  ModelNivel.findById(id, function (err, nivel) {
    if (err) return response.status(500).send(Responses.getError({ message: err.message }));
    if (!nivel) return response.status(404).send(Responses.getError({ message: `nivel ${id} not found.` }));
    nivel = Object.assign(nivel, request.body);
    nivel.save(id, function (err, nivel) {

      if (err) return response.status(500).send(Responses.getError({ message: err.message }));
      response.json(nivel);
    });
  });
}
/** 
 * Función para eliminar un objeto nivel
 *
 * @author Héctor Astorga Terraza
 * @exports deleteNivel DELETE /niveles/{id}
 * @param req Petición HTTP, id del objeto nivel en path
 * @param res | 200 nivel eliminado | 404 no existe nivel | 500 Error al buscar |
 * @return {message:mensaje} JSON con mensaje
 */
function deleteNivel(request, response) {
  let id = request.swagger.params.id.value;

  ModelNivel.findById(id, function (err, nivel) {
    if (err) return response.status(500).send(Responses.getError({ message: err.message }));
    if (!nivel) return response.status(404).send(Responses.getError({ message: `El nivel ${id} no ha sido encontrado.` }));
    nivel.remove(id, function (err, nivel) {
      if (err) return response.status(500).send(Responses.getError({ message: err.message }));
      response.status(200).json(Responses.getSuccess({ message: `Nivel ${id} eliminado.` }));
    });
  });
}


