'use strict';

var util = require('util');
var ModelRecursoEducativo = require('../../api/models/recursoEducativo');
const Responses = require('../helpers/responses');

/** 
 * Función para obtener un arreglo de Recursos Educativos
 *
 * @author Samuel Carrasco Fuentes
 * @exports getRecursosEducativos GET /recursosEducativos
 * @param req Petición HTTP
 * @param res | 200 Recursos Educativos | 404 No hay Recursos Educativos | 500 Error al buscar |
 * @return {[evaluaciones]} JSON con un objeto que contiene arreglo de Objetos Recurso Educativo
 */
exports.getRecursosEducativos = (req, res) => {

    ModelRecursoEducativo.find({}, (err, recursosEducativos) => {


        if (err) return res.status(500).send({ message: `Error al realizar peticion: ${err}` });


        if (!recursosEducativos) return res.status(404).send({ message: 'No existe ningún Recurso Educativo' });

        console.log(recursosEducativos);
        res.status(200).send({ recursosEducativos });
    });
}

/** 
 * Función para obtener un Recurso educativo.
 *
 * @author Samuel Carrasco Fuentes
 * @exports getRecursoEducativo GET /recursosEducativos/{id}
 * @param req Petición HTTP, id de Recurso educativo en path
 * @param res | 200 Recurso educativo encontrado | 404  Recurso educativo no existe | 500 Error al buscar |
 * @return {recursoEducativo} JSON con Objeto Recurso Educativo
 */
exports.getRecursoEducativo = (req, res) => {


    let idRecursoEducativo = req.swagger.params.id.value


    ModelRecursoEducativo.findById(idRecursoEducativo, (err, recursoEducativo) => {


        if (err) return res.status(500).send({ message: `Error al realizar peticion: ${err}` });


        if (!recursoEducativo) return res.status(404).send({ message: 'El Recurso Educativo no existe' });


        res.status(200).send({ recursoEducativo });

    });
}

/** 
 * Función para eliminar un Recurso educativo.
 *
 * @author Samuel Carrasco Fuentes
 * @exports deleteRecursoEducativo DELETE /recursosEducativos/{id}
 * @param req Petición HTTP, id de Recurso educativo en Path
 * @param res | 200 Recurso educativo eliminado | 500 Error al buscar | 404 El Recurso educativo no existe |
 * @return {message:mensaje} JSON con mensaje
 */
exports.deleteRecursoEducativo = (req, res) => {


    let idRecursoEducativo = req.swagger.params.id.value;

    ModelRecursoEducativo.findById(idRecursoEducativo, (err, recursoEducativo) => {


        if (err) return res.status(500).json({ message: `Error al borrar el Recurso Educativo - Error: ${err}` });

        if (!recursoEducativo) {
            res.status(404).send(Responses.getError({ message: `El Recurso Educativo de ID ${idRecursoEducativo} no existe` }));
            return;
        }

        recursoEducativo.remove(idRecursoEducativo, function (err, recursoEducativo) {
            if (err) {
                res.status(500).send(Responses.getError({ message: err.message }));
                return;
            }
            res.status(200).json(Responses.getSuccess({ message: `El Recurso Educativo ${idRecursoEducativo} ha sido eliminado` }));
        });
    });
}


/** 
 * Función para actualizar un Recurso educativo.
 *
 * @author Samuel Carrasco Fuentes
 * @exports updateRecursoEducativo PUT /recursosEducativos/{id}
 * @param req Petición HTTP, id de evaluación en path
 * @param res | 200 Recurso educativo encontrado | 404 Recurso educativo no existe | 500 Error al buscar |
 * @return {recursoEducativo} JSON con Objeto Recurso Educativo
 */
exports.updateRecursoEducativo = (req, res) => {

    let idRecursoEducativo = req.swagger.params.id.value;

    ModelRecursoEducativo.findById(idRecursoEducativo, function (err, recursoEducativo) {


        if (err) {
            res.status(500).send(Responses.getError({ message: err.message }));
            return;
        }

        if (!recursoEducativo) {
            res.status(404).send(Responses.getError({ message: `El Recurso Educativo ${idRecursoEducativo} no existe` }));
            return;
        }

        recursoEducativo = Object.assign(recursoEducativo, req.body);

        recursoEducativo.save(idRecursoEducativo, function(err, recursoEducativo) {

            if (err) {
                res.status(500).send(Responses.getError({ message: err.message }));
                return;
            }

            res.status(200).json(recursoEducativo);
        });
    });
}


/** 
 * Función para insertar un Recurso educativo.
 *
 * @author Samuel Carrasco Fuentes
 * @exports postEvaluacion POST /recursosEducativos
 * @param req Petición HTTP, JSON Objeto Recurso Educativo en Body
 * @param res | 200 Recurso educativo creada | 500 Error al buscar |
 * @return {recursoEducativo} JSON con Objeto Recurso Educativo
 */
exports.postRecursoEducativo = (req, res) =>{


    ModelRecursoEducativo.create(req.body, function (err, recursoEducativo) {

        if (err) {
            res.status(404).send(Responses.getError({ message: err.message }));
            return;
        }

        recursoEducativo.save(function (err) {

            if (err) {
                res.status(500).send(Responses.getError({ message: err.message }));
                return;
            }

            res.status(200).json(recursoEducativo);

        })
    });
}





