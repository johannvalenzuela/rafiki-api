'use strict';

var util = require('util');
var Model = require('../../api/models/evaluacion');
const Responses = require('../helpers/responses');

/** 
 * Función para obtener un arreglo de evaluaciones
 *
 * @author Johann Valenzuela Torres
 * @author Israel Ogas Vega
 * @exports getEvaluaciones GET /evaluaciones
 * @param req Petición HTTP
 * @param res | 200 Evaluaciones | 404 No hay evaluaciones | 500 Error al buscar |
 * @return {[evaluaciones]} JSON con un objeto que contiene arreglo de Objeto evaluacion
 */
exports.getEvaluaciones = (req, res) => {
    let Error = [];
    var query = {};

    if (req.query.autor) {
        query["profesorAutor"] = { $in: req.query.autor }
    }
    if (req.query.titulo) {
        query["titulo"] = { $regex: req.query.titulo, $options: "i" };
    }
    if (req.query.nivel_aprendizaje) {
        query["nivelAprendizaje"] = { $regex: req.query.nivel_aprendizaje, $options: "i" };
    }
    if (req.query.tipo_ejecucion) {
        query["tipoEjecucion"] = { $regex: req.query.tipo_ejecucion, $options: "i" };
    }
    if (req.query.asignatura) {
        query["asignatura"] = { $in: req.query.asignatura }
    }
    if (req.query.detalles) {
        query["detalles"] = { $regex: req.query.detalles, $options: "i" };
    }
    if (req.query.retroalimentacion) {
        query["retroalimentacion"] = { $in: req.query.retroalimentacion }
    }
    if (req.query.actividad) {
        query["actividad"] = { $in: req.query.actividad }
    }

    Model.find(query)
        .populate('profesorAutor')
        .populate('asignatura')
        .populate('retroalimentacion')
        .populate('actividades')
        .exec(function (err, evaluaciones) {
            if (err) {
                Error.push({
                    titulo: "Error Interno en el Servidor",
                    detalle: "Ocurrio algun error al realizar peticion",
                    link: req.url,
                    estado: "500"
                })
                return res.status(400).json({ errors: Error })
            }
            if (!evaluaciones) {
                Error.push({
                    titulo: "No existen evaluaciones",
                    detalle: "La base de datos se encuentra sin evaluaciones",
                    link: req.url,
                    estado: "404"
                })
                return res.status(400).json({ errors: Error })
            }
            if (evaluaciones || evaluaciones.length == 0) {
                console.log(evaluaciones);
                return res.status(200).json({
                    link: req.url,
                    data: evaluaciones,
                    type: "evaluacion"
                });
            }
        })
}

/** 
 * Función para obtener una evaluación.
 *
 * @author Johann Valenzuela Torres
 * @author Israel Ogas Vega
 * @exports getEvaluacion GET /evaluaciones/{id}
 * @param req Petición HTTP, id de evaluación en path
 * @param res | 200 Evaluacion encontrada | 404 Evaluación no existe | 500 Error al buscar |
 * @return {evaluacion: evaluacion} JSON con una variable de valor Objeto evaluacion
 */
exports.getEvaluacion = (req, res) => {
    let id = req.swagger.params.id.value;
    let Error = [];

    if (id.length < 24 || id.length > 24) {
        Error.push({
            titulo: "ID no es valida",
            detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
            link: req.url,
            estado: "404"
        });
        return res.status(400).json({ errors: Error });
    }

    Model.findById(id)
        .populate('profesorAutor')
        .populate('asignatura')
        .populate('retroalimentacion')
        .populate('actividades')
        .exec(function (err, evaluacion) {
            if (err) {
                Error.push({
                    titulo: "Error Interno en el Servidor",
                    detalle: "Ocurrio algun error al realizar peticion",
                    link: req.url,
                    estado: "500"
                })
                return res.status(400).json({ errors: Error })
            }
            if (!evaluacion) {
                Error.push({
                    titulo: "ID no encontrada",
                    detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
                    link: req.url,
                    estado: "404"
                });
                return res.status(400).json({ errors: Error });
            }
            console.log(evaluacion)
            if (evaluacion) {
                return res.status(200).json({
                    link: req.url,
                    data: [evaluacion],
                    type: "evaluacion"
                });
            }
        });
}

/** 
 * Función para eliminar una evaluación.
 *
 * @author Johann Valenzuela Torres
 * @author Israel Ogas Vega
 * @exports deleteEvaluacion DELETE /evaluaciones/{id}
 * @param req Petición HTTP, id de evaluación en Path
 * @param res | 200 Evaluacion eliminada | 500 Error al buscar | 404 La evaluación no existe |
 * @return {message:mensaje} JSON con mensaje
 */
exports.deleteEvaluacion = (req, res) => {
    let id = req.swagger.params.id.value;
    let Error = [];

    if (id.length < 24 || id.length > 24) {
        Error.push({
            titulo: "ID no es valida",
            detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
            link: req.url,
            estado: "404"
        });
        return res.status(400).json({ errors: Error });
    }

    Model.findById(id, (err, evaluacion) => {
        if (err) {
            Error.push({
                titulo: "Error Interno en el Servidor",
                detalle: "Ocurrio algun error al realizar peticion",
                link: req.url,
                estado: "500"
            })
            return res.status(400).json({ errors: Error })
        }

        if (!evaluacion) {
            Error.push({
                titulo: "ID no encontrada",
                detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
                link: req.url,
                estado: "404"
            });
            return res.status(400).json({ errors: Error });
        }

        evaluacion.remove(id, function (err, evaluacion) {
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
 * Función para actualizar una evaluación.
 *
 * @author Johann Valenzuela Torres
 * @author Israel Ogas Vega
 * @exports getEvaluacion PUT /evaluaciones/{id}
 * @param req Petición HTTP, id de evaluación en path
 * @param res | 200 Evaluacion encontrada | 404 Evaluación no existe | 500 Error al buscar |
 * @return {evaluacion} JSON Objeto evaluación
 */
exports.updateEvaluacion = (req, res) => {
    let id = req.swagger.params.id.value;
    let Error = [];

    if (id.length < 24 || id.length > 24) {
        Error.push({
            titulo: "ID no es valida",
            detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
            link: req.url,
            estado: "404"
        });
        return res.status(400).json({ errors: Error });
    }

    Model.findById(id, (err, evaluacion) => {
        if (err) {
            Error.push({
                titulo: "Error Interno en el Servidor",
                detalle: "Ocurrio algun error al realizar peticion",
                link: req.url,
                estado: "500"
            })
            return res.status(400).json({ errors: Error })
        }
        if (!evaluacion) {
            Error.push({
                titulo: "ID no encontrada",
                detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
                link: req.url,
                estado: "404"
            });
            return res.status(400).json({ errors: Error });
        }

        evaluacion = Object.assign(evaluacion, req.body);
        evaluacion.save(id, (err, evaluacion) => {
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
 * Función para insertar una evaluación.
 *
 * @author Johann Valenzuela Torres
 * @author Israel Ogas Vega
 * @exports postEvaluacion POST /evaluaciones
 * @param req Petición HTTP, JSON Objeto evaluación en Body
 * @param res | 200 Evaluacion creada | 500 Error al buscar |
 * @return {evaluacion} JSON Objeto evaluación
 */
exports.postEvaluacion = (req, res) => {
    let Error = [];

    /* Verificando si existe cada atributo que realmente sea requerido y necesario */
    if (!req.body.profesorAutor) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se esperaba el atributo 'profesorAutor', pero no hubo exito",
        link: req.url,
        estado: "417"
    });
    if (!req.body.nivelAprendizaje) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se esperaba el atributo 'nivelAprendizaje', pero no hubo exito",
        link: req.url,
        estado: "417"
    });
    if (!req.body.tipoEjecucion) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se esperaba el atributo 'tipoEjecucion', pero no hubo exito",
        link: req.url,
        estado: "417"
    });
    if (!req.body.asignatura) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se esperaba el atributo 'asignatura', pero no hubo exito",
        link: req.url,
        estado: "417"
    });


    if (Error.length > 0) {
        return res.status(400).json({ errors: Error });
    }

    Model.create(req.body, function (err, evaluacion) {
        if (err) {
            Error.push({
                titulo: "Error Interno en el Servidor",
                detalle: "Ocurrio algun error al realizar peticion",
                link: req.url,
                estado: "500"
            })
            return res.status(400).json({ errors: Error })
        }
        if (!evaluacion) {
            Error.push({
                titulo: "Peticion Erronea",
                detalle: "El JSON que se envió no es valido",
                link: req.url,
                estado: "404"
            })
            return res.status(400).json({ errors: Error })
        }

        if (evaluacion) {
            evaluacion.save(function (err) {
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
            })
        }
    });
}
