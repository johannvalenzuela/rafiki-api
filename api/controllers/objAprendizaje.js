'use strict';

var util = require('util');
var ModelAprendizaje = require('../../api/models/objAprendizaje');
const Responses = require('../helpers/responses');

/** 
 * Función para obtener un arreglo de objetivos de aprendizaje
 *
 * @author Israel Jasma
 * @exports getObjAprendizaje GET /aprendizaje
 * @param req Petición HTTP
 * @param res | 200 objAprendizaje | 404 No hay objAprendizaje | 500 Error al buscar |
 * @return {[objAprendizajes]} JSON con un objeto que contiene arreglo de Objeto objAprendizajes
 */
exports.getObjAprendizajes = (req, res) => {
    ModelAprendizaje.find({}, (err, objAprendizajes) => {
        console.log(objAprendizajes);
        if (err) return res.status(500).send({ message: "Error al realizar peticion: ${err}" });

        if (!objAprendizajes) return res.status(404).send({ message: 'No existe ningun objetivo de aprendizaje' });

        console.log(objAprendizajes);
        res.status(200).send({ objAprendizajes });
    });
}

/** 
 * Función para obtener una evaluación.
 *
 * @author Israel Jasma
 * @exports getObjAprendizaje GET /aprendizaje/{id}
 * @param req Petición HTTP, id de evaluación en path
 * @param res | 200 Evaluacion encontrada | 404 Evaluación no existe | 500 Error al buscar |
 * @return {objAprendizaje: objAprendizaje} JSON con una variable de valor Objeto objAprendizaje
 */
exports.getObjAprendizaje = (req, res) => {
    let id = req.swagger.params.id.value
    ModelAprendizaje.findById(id, (err, objAprendizaje) => {

        if (err) return res.status(500).send({ message: 'Error al realizar peticion: ${err}' });
        if (!objAprendizaje) return res.status(404).send({ message: 'El objetivo de aprendizaje no existe' });
        res.status(200).send({ objAprendizaje: objAprendizaje });

    });
}