'use strict';

var util = require('util');

const ModelPlanEstudio = require('../../api/models/planEstudio');

/** 
 * @name getPlanEstudios getPlanEstudios GET /planEstudio
 * @description Funcion que obtiene una lista de todas las planEstudioes
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {planEstudio} JSON Objeto planEstudio
 */
exports.getPlanEstudios = (req, res) => {
    let Error = [];
    ModelPlanEstudio.find({}, (err, planEstudio) => {
        if (err) {
            Error.push({
                titulo: "Error Interno en el Servidor",
                detalle: "Ocurrio algun error al realizar peticion",
                link: req.url,
                estado: "500"
            })
            return res.status(500).json({ errors: Error })
        }
        if (planEstudio.length == 0) {
            return res.status(200).json({ message: 'No existe ningun plan de estudio' });
        } else {
            return res.status(200).json({
                link: req.url,
                data: planEstudio,
                type: "planEstudio"
            });
        }
    });
}

/** 
 * @name getPlanEstudio getPlanEstudio GET /planEstudio
 * @description Funcion que obtiene un plan de estudio en especifico por medio de la ID
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {planEstudio} JSON Objeto planEstudio
 */
exports.getPlanEstudio = (req, res) => {
    let planEstudioID = req.swagger.params.id.value;
    let Error = [];
    if (planEstudioID.length < 24 || planEstudioID.length > 24) {
        Error.push({
            titulo: "ID no es valida",
            detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
            link: req.url,
            estado: "404"
        });
        return res.status(404).json({ errors: Error });
    }
    ModelPlanEstudio.findById(planEstudioID, function (err, planEstudio) {
        if (err) {
            Error.push({
                titulo: "Error Interno en el Servidor",
                detalle: "Ocurrio algun error al realizar peticion",
                link: req.url,
                estado: "500"
            })
            return res.status(500).json({ errors: Error })
        }
        if (!planEstudio) {
            Error.push({
                titulo: "ID no encontrada",
                detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
                link: req.url,
                estado: "404"
            });
            return res.status(404).json({ errors: Error });
        }
        res.status(200).json({
            link: req.url,
            data: [planEstudio],
            type: "planEstudio"
        });
    });
}

/** 
 * @name postPlanEstudio postPlanEstudio POST /planEstudio
 * @description Funcion que crea un plan de estudio
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {planEstudio} JSON Objeto planEstudio
 */
exports.postPlanEstudio = (req, res) => {
    let Error = [];

    /* Verificando si existe cada atributo que realmente sea requerido y necesario */
    if (!req.body.nombre) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se esperaba el atributo 'nombre', pero no hubo exito",
        link: req.url,
        estado: "417"
    });
    if (!req.body.asignaturas) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se esperaba el objeto 'asignaturas', pero no hubo exito",
        link: req.url,
        estado: "417"
    });
    if (!req.body.tipo) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se esperaba el atributo 'tipo', pero no hubo exito",
        link: req.url,
        estado: "417"
    });
    if (!req.body.horasLibreDisposicion) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se esperaba el atributo 'horasLibreDisposicion', pero no hubo exito",
        link: req.url,
        estado: "417"
    });
    if (!req.body.totalTiempoMinFG) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se esperaba el atributo 'totalTiempoMinFG', pero no hubo exito",
        link: req.url,
        estado: "417"
    });
    if (!req.body.totalTiempoMinFD) Error.push({
        titulo: "Peticion Incompleta",
        detalle: "Se esperaba el atributo 'totalTiempoMinFD', pero no hubo exito",
        link: req.url,
        estado: "417"
    });

    if (Error.length > 0) {
        return res.status(417).json({ errors: Error });
    }

    ModelPlanEstudio.create(req.body, function (err, planEstudio) {
        if (err) {
            Error.push({
                titulo: "Error Interno en el Servidor",
                detalle: "Ocurrio algun error al realizar peticion",
                link: req.url,
                estado: "500"
            })
            return res.status(500).json({ errors: Error })
        }
        if (!planEstudio) {
            Error.push({
                titulo: "Peticion Erronea",
                detalle: "El JSON que se envió no es valido",
                link: req.url,
                estado: "404"
            })
            return res.status(404).json({ errors: Error })
        }
        if (planEstudio) {
            planEstudio.save(function (err) {
                if (err) {
                    Error.push({
                        titulo: "Error Interno en el Servidor",
                        detalle: "Ocurrio algun error al realizar peticion",
                        link: req.url,
                        estado: "500"
                    })
                    return res.status(500).json({ errors: Error })
                }
                res.status(200).json({ link: req.url });
            });
        }
    });
}

/** 
 * @name updatePlanEstudio updatePlanEstudio PUT /planEstudio
 * @description Funcion que actualiza los atributos modificados de un plan de estudio por medio de la ID
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {planEstudio} JSON Objeto planEstudio
 */
exports.updatePlanEstudio = (req, res) => {
    let id = req.swagger.params.id.value;
    let Error = [];

    if (id.length < 24 || id.length > 24) {
        Error.push({
            titulo: "ID no es valida",
            detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
            link: req.url,
            estado: "404"
        });
        return res.status(404).json({ errors: Error });
    }

    ModelPlanEstudio.findById(id, function (err, planEstudio) {
        if (err) {
            Error.push({
                titulo: "Error Interno en el Servidor",
                detalle: "Ocurrio algun error al realizar peticion",
                link: req.url,
                estado: "500"
            })
            return res.status(500).json({ errors: Error })
        }
        if (!planEstudio) {
            Error.push({
                titulo: "ID no encontrada",
                detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
                link: req.url,
                estado: "404"
            });
            return res.status(404).json({ errors: Error });
        }

        planEstudio = Object.assign(planEstudio, req.body);
        planEstudio.save(id, function (err, planEstudio) {
            if (err) {
                Error.push({
                    titulo: "Error Interno en el Servidor",
                    detalle: "Ocurrio algun error al realizar peticion",
                    link: req.url,
                    estado: "500"
                })
                return res.status(500).json({ errors: Error })
            }
            res.status(201).json({ link: req.url });
        });
    });
}

/** 
 * @name deletePlanEstudio deletePlanEstudio DELETE /planEstudio
 * @description Funcion que elimina un plan de estudio especifico por medio de la ID
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {planEstudio} JSON Objeto planEstudio
 */
exports.deletePlanEstudio = (req, res) => {
    let planEstudioID = req.swagger.params.id.value;
    let Error = [];

    if (planEstudioID.length < 24 || planEstudioID.length > 24) {
        Error.push({
            titulo: "ID no es valida",
            detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
            link: req.url,
            estado: "404"
        });
        return res.status(404).json({ errors: Error });
    }

    ModelPlanEstudio.findById(planEstudioID, (err, planEstudio) => {
        if (err) {
            Error.push({
                titulo: "Error Interno en el Servidor",
                detalle: "Ocurrio algun error al realizar peticion",
                link: req.url,
                estado: "500"
            })
            return res.status(500).json({ errors: Error })
        }
        if (!planEstudio) {
            Error.push({
                titulo: "ID no encontrada",
                detalle: "Se esperaba ID valida o existente en la BD, pero no hubo exito",
                link: req.url,
                estado: "404"
            });
            return res.status(404).json({ errors: Error });
        }

        //Elimina un plan de estudio si se encontró el id
        planEstudio.remove(planEstudioID, function (err, planEstudio) {
            if (err) {
                Error.push({
                    titulo: "Error Interno en el Servidor",
                    detalle: "Ocurrio algun error al realizar peticion",
                    link: req.url,
                    estado: "500"
                })
                return res.status(500).json({ errors: Error })
            }
            res.status(200).json({ link: req.url });
        });
    });
}