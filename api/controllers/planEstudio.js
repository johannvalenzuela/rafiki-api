'use strict';

var util = require('util');

const ModelPlanEstudio = require('../../api/models/planEstudio');
const Responses = require('../helpers/responses');

/*
  Funcion que obtiene una lista de todas las planEstudioes

  Param 1: una identificacion de solicitud de un objeto
  Param 2: una identificacion de respuesta de un objeto
*/
exports.getPlanEstudios = (req, res) => {
    ModelPlanEstudio.find({}, (err, planEstudio) => {
        if (err) return res.status(500).send({ message: "Error al realizar peticion: ${err}" });

        if (!planEstudio) return res.status(404).send({ message: 'No existe ningun plan de estudio' });

        console.log(planEstudio);
        res.status(200).send({ planEstudio });
    });
}

/*
  Funcion que obtiene un planEstudio en especifico por medio de la ID

  Param 1: una identificacion de solicitud de un objeto
  Param 2: una identificacion de respuesta de un objeto
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

/*
  Funcion que actualiza los atributos modificados de una planEstudio en especifico por medio de la ID

  Param 1: una identificacion de solicitud de un objeto
  Param 2: una identificacion de respuesta de un objeto
*/
exports.updatePlanEstudio = (req, res) => {
    let id = req.swagger.params.id.value;

    if (id.length < 24 || id.length > 24) {
        return res.status(400).send(Responses.getError({ message: 'Se ingresó una ID no valida' }));
    }

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


/*
  Funcion que elimina una planEstudio en especifico por medio de la ID

  Param 1: una identificacion de solicitud de un objeto
  Param 2: una identificacion de respuesta de un objeto
*/
exports.deletePlanEstudio = (req, res) => {
    let planEstudioID = req.swagger.params.id.value;
    console.log(planEstudioID);

    if (planEstudioID.length < 24 || planEstudioID.length > 24) {
        return res.status(400).send(Responses.getError({ message: 'Se ingresó una ID no valida' }));
    }

    ModelPlanEstudio.findById(planEstudioID, (err, planEstudio) => {
        if (err) return res.status(500).json({ message: `Error al borrar la plan de estudio: ${err}` });
        if (!planEstudio) return res.status(404).send(Responses.getError({ message: `El plan de estudio de ID ${planEstudioID} no existe.` }));

        //Elimina la planEstudio si se encontró el id
        planEstudio.remove(planEstudioID, function (err, planEstudio) {
            if (err) return res.status(500).send(Responses.getError({ message: err.message }));
            res.status(200).json(Responses.getSuccess({ message: `El plan de estudio ${planEstudioID} ha sido borrada.` }));
        });
    });
}


/*
  Funcion que crea una planEstudio

  Param 1: una identificacion de solicitud de un objeto
  Param 2: una identificacion de respuesta de un objeto
*/
exports.postPlanEstudio = (req, res) => {
    ModelPlanEstudio.create(req.body, function (err, planEstudio) {
        planEstudio.save(function (err) {
            if (err) return res.status(500).send(Responses.getError({ message: err.message }));
            res.status(200).json(planEstudio);
        })
    });
}
