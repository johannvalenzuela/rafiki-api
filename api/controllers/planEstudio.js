'use strict';

var util = require('util');

const ModelPlanEstudio = require('../../api/models/planEstudio');
const Responses = require('../helpers/responses');

/** 
 * @name getPlanEstudios getPlanEstudios GET /planEstudio
 * @description Funcion que obtiene una lista de todas las planEstudioes
 * @author Israel Ogas
 * @param req una identificacion de solicitud de un objeto
 * @param res una identificacion de respuesta de un objeto
 * @return {planEstudio} JSON Objeto planEstudio
 */
exports.getPlanEstudios = (req, res) => {
    ModelPlanEstudio.find({}, (err, planEstudio) => {
        if (err) return res.status(500).send({ message: "Error al realizar peticion: ${err}" });

        if (!planEstudio) return res.status(404).send({ message: 'No existe ningun plan de estudio' });

        console.log(planEstudio);
        res.status(200).send({ planEstudio });
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

    ModelPlanEstudio.findById(planEstudioID, function (err, planEstudio) {
        // console.log(planEstudio);
        if (err) return res.status(500).send(Responses.getError({ message: err.message }));
        if (!planEstudio) return res.status(404).send(Responses.getError({ message: `El plan de estudio con ID ${planEstudioID} no existe.` }));

        res.json({ planEstudio });
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
    ModelPlanEstudio.create(req.body, function (err, planEstudio) {
        planEstudio.save(function (err) {
            if (err) return res.status(500).send(Responses.getError({ message: err.message }));
            res.status(200).json(planEstudio);
        })
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

    if (id.length < 24 || id.length > 24) return res.status(400).send(Responses.getError({ message: 'Se ingresó una ID no valida' }));

    ModelPlanEstudio.findById(id, function (err, planEstudio) {
        if (err) return res.status(500).send(Responses.getError({ message: err.message }));
        if (!planEstudio) return res.status(404).send(Responses.getError({ message: `El plan de estudio con ID ${id} no se ha encontrado.` }));

        planEstudio = Object.assign(planEstudio, req.body);
        planEstudio.save(id, function (err, planEstudio) {
            if (err) return res.status(500).send(Responses.getError({ message: err.message }));
            res.json(planEstudio);
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

    if (planEstudioID.length < 24 || planEstudioID.length > 24) return res.status(400).send(Responses.getError({ message: 'Se ingresó una ID no valida' }));

    ModelPlanEstudio.findById(planEstudioID, (err, planEstudio) => {
        if (err) return res.status(500).json({ message: `Error al borrar la plan de estudio: ${err}` });
        if (!planEstudio) return res.status(404).send(Responses.getError({ message: `El plan de estudio de ID ${planEstudioID} no existe.` }));

        //Elimina un plan de estudio si se encontró el id
        planEstudio.remove(planEstudioID, function (err, planEstudio) {
            if (err) return res.status(500).send(Responses.getError({ message: err.message }));
            res.status(200).json(Responses.getSuccess({ message: `El plan de estudio ${planEstudioID} ha sido borrado.` }));
        });
    });
}