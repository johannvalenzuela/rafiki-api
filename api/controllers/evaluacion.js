'use strict';

var util = require('util');
var Model = require('../../api/models/evaluacion');
const Responses = require('../helpers/responses');

/** 
 * Función para obtener un arreglo de evaluaciones
 *
 * @author Johann Valenzuela Torres
 * @exports getEvaluaciones GET /evaluaciones
 * @param req Petición HTTP
 * @param res | 200 Evaluaciones | 404 No hay evaluaciones | 500 Error al buscar |
 * @return {[evaluaciones]} JSON con un objeto que contiene arreglo de Objeto evaluacion
 */
exports.getEvaluaciones = (req, res) => {
    Model.find({}, (err, evaluaciones) => {
        if (err) return res.status(500).send({ message: "Error al realizar peticion: ${err}" });

        if (!evaluaciones) return res.status(404).send({ message: 'No existe ninguna evaluacion' });

        console.log(evaluaciones);
        res.status(200).send({ evaluaciones });
    });
}

/** 
 * Función para obtener una evaluación.
 *
 * @author Johann Valenzuela Torres
 * @exports getEvaluacion GET /evaluaciones/{id}
 * @param req Petición HTTP, id de evaluación en path
 * @param res | 200 Evaluacion encontrada | 404 Evaluación no existe | 500 Error al buscar |
 * @return {evaluacion: evaluacion} JSON con una variable de valor Objeto evaluacion
 */
exports.getEvaluacion = (req, res) => {
    let id = req.swagger.params.id.value
    Model.findById(id, (err, evaluacion) => {

        if (err) return res.status(500).send({ message: 'Error al realizar peticion: ${err}' });
        if (!evaluacion) return res.status(404).send({ message: 'La evaluacion no existe' });
        res.status(200).send({ evaluacion: evaluacion });

    });
}

/** 
 * Función para eliminar una evaluación.
 *
 * @author Johann Valenzuela Torres
 * @exports deleteEvaluacion DELETE /evaluaciones/{id}
 * @param req Petición HTTP, id de evaluación en Path
 * @param res | 200 Evaluacion eliminada | 500 Error al buscar | 404 La evaluación no existe |
 * @return {message:mensaje} JSON con mensaje
 */
exports.deleteActividad = (req, res) => {
    let id = req.swagger.params.id.value;
    Model.findById(id, (err, evaluacion) => {

        if (err) return res.status(500).json({ message: `Error al borrar la evaluación. Error: ${err}` });
        if (!evaluacion) {
            res.status(404).send(Responses.getError({ message: `La evaluación de ID ${id} no existe` }));
            return;
        }
        evaluacion.remove(id, function (err, evaluacion) {
            if (err) {
                res.status(500).send(Responses.getError({ message: err.message }));
                return;
            }
            res.status(200).json(Responses.getSuccess({ message: `La Actividad ${id} ha sido eliminada` }));
        });

    });
}

/** 
 * Función para actualizar una evaluación.
 *
 * @author Johann Valenzuela Torres
 * @exports getEvaluacion PUT /evaluaciones/{id}
 * @param req Petición HTTP, id de evaluación en path
 * @param res | 200 Evaluacion encontrada | 404 Evaluación no existe | 500 Error al buscar |
 * @return {evaluacion} JSON Objeto evaluación
 */
exports.updateEvaluacion = (req, res) => {
    let id = req.swagger.params.id.value;
    Model.findById(id, (err, evaluacion) => {

        if (err) {
            res.status(500).send(Responses.getError({ message: err.message }));
            return;
        }
        if (!evaluacion) {
            res.status(404).send(Responses.getError({ message: 'La evaluacion ${id} no existe' }));
            return;
        }
        evaluacion = Object.assign(evaluacion, req.body);
        evaluacion.save(id, (err, evaluacion) => {
            if (err) {
                res.status(500).send(Responses.getError({ message: err.message }));
                return;
            }
            res.json(evaluacion);
        });

    });
}

/** 
 * Función para insertar una evaluación.
 *
 * @author Johann Valenzuela Torres
 * @exports postEvaluacion POST /evaluaciones
 * @param req Petición HTTP, JSON Objeto evaluación en Body
 * @param res | 200 Evaluacion creada | 500 Error al buscar |
 * @return {evaluacion} JSON Objeto evaluación
 */
exports.postEvaluacion = (req, res) => {
    Model.create(req.body, function (err, evaluacion) {

        evaluacion.save(function (err) {

            if (err) {
                res.status(500).send(Responses.getError({ message: err.message }));
                return;
            }
            res.status(200).json(evaluacion);

        })
    });
}
