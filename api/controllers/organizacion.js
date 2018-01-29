'use strict';

var util = require('util');

module.exports = {
  getListOrganizaciones: getListOrganizaciones,
  getOrganizacion: getOrganizacion,
  createOrganizacion: createOrganizacion,
  updateOrganizacion: updateOrganizacion,
  deleteOrganizacion: deleteOrganizacion
};

const ModelOrganizacion = require('../../api/models/organizacion');
const Responses = require('../helpers/responses');

/*
  Funcion que obtiene una lista de todas las organizaciones

  Param 1: una identificacion de solicitud de un objeto
  Param 2: una identificacion de respuesta de un objeto
*/
function getListOrganizaciones(req, res) {
  ModelOrganizacion.find({}, (err, organizacion) => {
    console.log(organizacion.length);
    if(err) return res.status(500).json({message: `Error al realizar peticion: ${err}`});
    if(!organizacion) return res.status(400).json({message: 'No existe ninguna organizacion'});

    res.status(200).json({organizacion});
  });
}

/*
  Funcion que obtiene una organizacion en especifico por medio de la ID

  Param 1: una identificacion de solicitud de un objeto
  Param 2: una identificacion de respuesta de un objeto
*/
function getOrganizacion(req, res) {
  let organizacionID = req.swagger.params.id.value;
  ModelOrganizacion.findById(organizacionID, function(err, organizacion){
    // console.log(organizacion);
    if (err){
      res.status(500).send(Responses.getError({message: err.message}));
      return;
    }
    if (!organizacion){
      res.status(404).send(Responses.getError({message: `La organizacion con ID ${organizacionID} no existe.`}));
      return;
    }
    res.json({organizacion});
  });
}

/*
  Funcion que actualiza los atributos modificados de una organizacion en especifico por medio de la ID

  Param 1: una identificacion de solicitud de un objeto
  Param 2: una identificacion de respuesta de un objeto
*/
function updateOrganizacion(request, response) {
  let id = request.swagger.params.id.value;
  
  if(id.length < 24 || id.length > 24){
    return response.status(400).send(Responses.getError({message: 'Se ingresó una ID no valida'}));
  }

  ModelOrganizacion.findById(id, function(err, organizacion) {
    if (err) {
      response.status(500).send(Responses.getError({message: err.message}));
      return;
    }
    if (!organizacion) {
      response.status(404).send(Responses.getError({message: `La organización con ID ${id} no se ha encontrado.`}));
      return;
    }
    organizacion = Object.assign(organizacion, request.body);
    organizacion.save(id, function (err, organizacion) {
      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
      }
      response.json(organizacion);
    });
  });
}


/*
  Funcion que elimina una organizacion en especifico por medio de la ID

  Param 1: una identificacion de solicitud de un objeto
  Param 2: una identificacion de respuesta de un objeto
*/
function deleteOrganizacion(request, response) {
  let organizacionID = request.swagger.params.id.value;ç

  if(id.length < 24 || id.length > 24){
    return response.status(400).send(Responses.getError({message: 'Se ingresó una ID no valida'}));
  }

  ModelOrganizacion.findById(organizacionID, (err, organizacion) => {
    if(err) return response.status(500).json({message: `Error al borrar la organizacion: ${err}`});
    if (!organizacion) {
      response.status(404).send(Responses.getError({message:  `La organizacion de ID ${organizacionID} no existe.`}));
      return;
    }
    //Elimina la organizacion si se encontró el id
    organizacion.remove(organizacionID, function (err, organizacion) {
      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
      }
      response.status(200).json(Responses.getSuccess({message: `La organizacion ${organizacionID} ha sido borrada.`}));
    });
  });
}

/*
  Funcion que crea una organizacion

  Param 1: una identificacion de solicitud de un objeto
  Param 2: una identificacion de respuesta de un objeto
*/
function createOrganizacion(req, res) {
  ModelOrganizacion.create(req.body, function (err, organizacion) {
    organizacion.save(function(err){
      if (err){
        res.status(500).send(Responses.getError({message: err.message}));
        return;
      }
      console.log(organizacion);

      res.status(200).json({ 
        nombre: organizacion.nombre,
        rbd: organizacion.rbd,
        descripcion: organizacion.descripcion, 
        reconocimientoOficial: organizacion.reconocimientoOficial, 
        dependencia: organizacion.dependencia, 
        sostenedor: organizacion.sostenedor,
        orientacionReligiosa: organizacion.orientacionReligiosa,
        direccion: {
            calle: organizacion.direccion.calle,
            region: organizacion.direccion.region,
            comuna: organizacion.direccion.comuna
        },
        correo: organizacion.correo,
        telefono: organizacion.telefono,
        web: organizacion.web,
        director: organizacion.director,
        numVacantes: organizacion.numVacantes,
        fechaPostulacion:{
            inicio: organizacion.fechaPostulacion.inicio,
            cierre: organizacion.fechaPostulacion.cierre
        },
        mensualidad: organizacion.mensualidad,
        totalAlumnosMatriculados: organizacion.totalAlumnosMatriculados,
        promAlumnosCurso: organizacion.promAlumnosCurso,
        puntajeSimce: organizacion.puntajeSimce,
        proyectosEducativos: [organizacion.proyectosEducativos],
      });
    })
  });
}
