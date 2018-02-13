'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecursoEducativoSchema = new Schema({

    //Titulo del recurso educativo
    titulo: {
        type: String
    },

    //Descripcion del recurso educativo
    descripcion: {
        type: String
    },

    //Nombre de la asignatura a la que alude el recurso educativo
    asignatura: {
        type: String
    },

    //Nivel al que corresponde el recurso educativo
    nivel: {
        type: String
    },

    //Tipo de recurso educativo
    tipoRecurso: {
        type: String,
        enum: ['Actividad', 'Imagenenes y Multimedia', 'Lectura', 'Partitura']
    },

    //Nombre del autor del recurso educativo
    autor: {
        type: String
    },

    //Enlaces a las partes que componen el recurso educativo
    links: {
        type: [{
            type: String
        }]
    },


});

module.exports = mongoose.model('RecursoEducativo', RecursoEducativoSchema);