'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var util = require('util');
var ModelRecursoEducativo = require('../../api/models/recursoEducativo');
var Actividad = mongoose.model('Actividad');
var ModelNivel = require('../../api/models/nivel');

const Responses = require('../helpers/responses');

/** 
 * Función para obtener un arreglo de Recursos Educativos
 *
 * @author Samuel Carrasco Fuentes
 * @exports getRecursosEducativos GET /recursosEducativos
 * @param req Petición HTTP
 * @param res | 200 Recursos Educativos | 404 No hay Recursos Educativos | 500 Error al buscar |
 * @return {object} JSON con un objeto que contiene arreglo de Objetos Recurso Educativo
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getRecursosEducativos = (req, res) => {

    let Error = [];

    var query = {};


    if (req.query.titulo) {

        query["titulo"] = { $regex: req.query.titulo, $options: "i" };
    }

    if (req.query.descripcion) {

        query["descripcion"] = { $regex: req.query.descripcion, $options: "i" };

    }

    if (req.query.asignatura) {

        query["asignatura"] = { $regex: req.query.asignatura, $options: "i" };

    }

    if (req.query.nivel) {

        query["nivel"] = { $regex: req.query.nivel, $options: "i" };

    }

    if (req.query.tipoRecurso) {

        query["tipoRecurso"] = { $regex: req.query.tipoRecurso, $options: "i" };

    }

    ModelRecursoEducativo.find(query)
        .populate('nivel')
        .exec(function (err, recursosEducativos) {

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

            return res.status(200).json({
                link: req.url,
                data: recursosEducativos,
                type: "recursos educativos"
            });

        }
        );
}

/** 
 * Función para obtener un Recurso educativo.
 *
 * @author Samuel Carrasco Fuentes
 * @exports getRecursoEducativo GET /recursosEducativos/{id}
 * @param req Petición HTTP, id de Recurso educativo en path
 * @param res | 200 Recurso educativo encontrado | 404  Recurso educativo no existe | 500 Error al buscar |
 * @return {object} JSON con objeto Recurso Educativo
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getRecursoEducativo = (req, res) => {

    let Error = [];
    let idRecursoEducativo = req.swagger.params.id.value;


    ModelRecursoEducativo.findById(idRecursoEducativo)
        .populate('nivel')
        .exec(function (err, recursoEducativo) {
            if (err) {
                Error.push({
                    titulo: "Error Interno en el Servidor",
                    detalle: "Ocurrio algun error al realizar peticion",
                    link: req.url,
                    estado: "500"
                })
                return res.status(400).json({ errors: Error })
            }

            if (!recursoEducativo) {

                Error.push({
                    titulo: "El Recurso Educativo no existe",
                    detalle: "El id ingresado no corresponde a un recurso educativo",
                    link: req.url,
                    estado: "404"
                });
                return res.status(400).json({ errors: Error });
            }
            else {

                return res.status(200).json({
                    link: req.url,
                    data: [recursoEducativo],
                    type: "recursos educativos"
                });

            }
        });
}

/** 
 * Función para obtener un Recurso educativo.
 *
 * @author Samuel Carrasco Fuentes
 * @exports getNivelRecursoEducativo GET /recursosEducativos/{id}/nivel
 * @param req Petición HTTP, id de Recurso educativo en path
 * @param res | 200 Recurso educativo encontrado | 404  Recurso educativo no existe | 500 Error al buscar |
 * @return {object} JSON con objeto Nivel de Recurso Educativo
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getNivelRecursoEducativo = (req, res) => {

    let Error = [];
    let idRecursoEducativo = req.swagger.params.id.value;


    ModelRecursoEducativo.findById(idRecursoEducativo)
        .populate('nivel')
        .exec(function (err, recursoEducativo) {
            if (err) {
                Error.push({
                    titulo: "Error Interno en el Servidor",
                    detalle: "Ocurrio algun error al realizar peticion",
                    link: req.url,
                    estado: "500"
                })
                return res.status(400).json({ errors: Error })
            }

            if (!recursoEducativo) {

                Error.push({
                    titulo: "El Recurso Educativo no existe",
                    detalle: "El id ingresado no corresponde a un recurso educativo",
                    link: req.url,
                    estado: "404"
                });
                return res.status(400).json({ errors: Error });
            }
            else {

                return res.status(200).json({
                    link: req.url,
                    data: [recursoEducativo.nivel],
                    type: "niveles"
                });

            }
        });
}

/** 
 * Función para eliminar un Recurso educativo.
 *
 * @author Samuel Carrasco Fuentes
 * @exports deleteRecursoEducativo DELETE /recursosEducativos/{id}
 * @param req Petición HTTP, id de Recurso educativo en Path
 * @param res | 200 Recurso educativo eliminado | 500 Error al buscar | 404 El Recurso educativo no existe |
 * @return {req.url} JSON con link
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.deleteRecursoEducativo = (req, res) => {

    let Error = [];
    let idRecursoEducativo = req.swagger.params.id.value;

    ModelRecursoEducativo.findById(idRecursoEducativo, (err, recursoEducativo) => {

        if (!recursoEducativo) {

            Error.push({
                titulo: "El Recurso Educativo no existe",
                detalle: "El id ingresado no corresponde a un recurso educativo",
                link: req.url,
                estado: "404"
            });
            return res.status(400).json({ errors: Error });
        }

        recursoEducativo.remove(idRecursoEducativo, function (err, recursoEducativo) {

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
 * Función para actualizar un Recurso educativo.
 *
 * @author Samuel Carrasco Fuentes
 * @exports updateRecursoEducativo PUT /recursosEducativos/{id}
 * @param req Petición HTTP, id de evaluación en path
 * @param res | 200 Recurso educativo encontrado | 404 Recurso educativo no existe | 500 Error al buscar |
 * @return {req.url} JSON con link
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.updateRecursoEducativo = (req, res) => {

    let Error = [];
    let idRecursoEducativo = req.swagger.params.id.value;

    ModelRecursoEducativo.findById(idRecursoEducativo, function (err, recursoEducativo) {

        if (!recursoEducativo) {

            Error.push({
                titulo: "El Recurso Educativo no existe",
                detalle: "El id ingresado no se corresponde a un recurso educativo",
                link: req.url,
                estado: "404"
            });
            return res.status(400).json({ errors: Error });
        }

        recursoEducativo = Object.assign(recursoEducativo, req.body);

        recursoEducativo.save(idRecursoEducativo, function (err, recursoEducativo) {

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
                return res.status(201).json({ link: req.url });
        });
    });
}


/** 
 * Función para insertar un Recurso educativo.
 *
 * @author Samuel Carrasco Fuentes
 * @exports postEvaluacion POST /recursosEducativos
 * @param req Petición HTTP, JSON Objeto Recurso Educativo en Body
 * @param res | 201 Recurso educativo creado | 500 Error al buscar | 400 Solicitud incorrecta |
 * @return {req.url} JSON con link
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.postRecursoEducativo = (req, res) => {

    let Error = [];

    if (!req.body.titulo) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se requiere el campo 'titulo'",
        link: req.url,
        estado: "417"
    });

    if (!req.body.asignatura) Error.push({
        titulo: "Solicitud Incompleta",
        detalle: "Se requiere el campo 'asignatura'",
        link: req.url,
        estado: "417"
    });

    if (!req.body.nivel) Error.push({
        titulo: "Solicitud Incompleta",
        detalle: "Se requiere el campo 'nivel'",
        link: req.url,
        estado: "417"
    });

    if (!req.body.tipoRecurso) Error.push({
        titulo: "Solicitud Incompleta",
        detalle: "Se requiere el campo 'tipoRecurso'",
        link: req.url,
        estado: "417"
    });

    if (!req.body.links) Error.push({
        titulo: "Solicitud Incompleta",
        detalle: "Se requiere el campo 'links'",
        link: req.url,
        estado: "417"
    });

    if (Error.length > 0) {
        return res.status(400).json({ errors: Error });
    }

    ModelRecursoEducativo.create(req.body, function (err, recursoEducativo) {

        if (err) {
            Error.push({
                titulo: "Solicitud incorrecta",
                detalle: "El valor de un atributo es incorrecto",
                link: req.url,
                estado: "400"
            })
            return res.status(400).json({ errors: Error })
        }

        recursoEducativo.save(function (err) {

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
                return res.status(201).json({ link: req.url });

        })
    });
}





