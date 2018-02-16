'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActividadSchema = new Schema ({
    
    profesorAutor: {
        type: String, 
    },

    anhoAcademico: {
        type: Number,
    },

    semestre: {
        type: Number,
        enum: ['1','2']
    },

    nivelDificultad: {
        type: String, 
        enum: ['Alta','Media','Baja']
    },

    nivelAprendizaje: {
        type: String, 
        enum: ['Recordar', 'Comprender', 'Aplicar','Analizar','Evaluar', 'Crear']
    }, 

    tipoPregunta:{
        type: String, 
        enum: ['Enumeracion', 'Conocimiento especifico', 'Ensayo','Verdadero y Falso','Alternativas',]
    },

    asignatura: {
        type: String 
    },

    tema: {
        type: String 
    },

    subTema: {
        type: String 
    },

    preguntaEnunciado: {
        type: String
    },

    preguntaAlternativas: {
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

    respuestaAlternativas: {
        type: [{
            type: String  
        }]
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

  

});

module.exports = mongoose.model('Actividad', ActividadSchema);