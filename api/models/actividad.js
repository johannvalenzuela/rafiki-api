'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActividadSchema = new Schema({

    autor: {
        type: String,
        //RELACIONAR CON USER
    },

    dificultad: {
        type: String,
        enum: ['Alta', 'Media', 'Baja']
    },

    nivelAprendizaje: {
        type: String,
        enum: ['Recordar', 'Comprender', 'Aplicar', 'Analizar', 'Evaluar', 'Crear']
    },

    tipoPregunta: {
        type: String,
        enum: ['Enumeracion', 'Conocimiento especifico', 'Ensayo', 'Verdadero y Falso', 'Alternativas',]
    },

    /*asignatura: {
        type: String 
    },*/

    tema: {
        type: String
    },

    subTema: {
        type: String
    },

    preguntaEnunciado: {
        type: String
    },

    alternativas: {
        type: [{
            type: String
        }]
    },

    respuesta: {
        type: String
    },

    respuestaVerdaderoFalso: {
        type: Boolean
    },

    puntajeTotal: {
        type: Number,
    },

    //Enlaces de interes y/o información complementaria. Se entrega solo en preguntas de Ensayo.
    retroalimentacion: {
        type: [{
            type: String
        }]
    },

    //Fecha de creación
    createAt: {
        type: Date,
        default: Date.now
    }



});

module.exports = mongoose.model('Actividad', ActividadSchema);