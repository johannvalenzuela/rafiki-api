'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EvaluacionSchema = new Schema ({
    
    profesorAutor: {
        type: String, 
    },

    creado_fecha: {
        type: Date,
        default: Date.now 
    },

    nivelAprendizaje: {
        type: String, 
        enum: ['Recordar', 'Comprender', 'Aplicar','Analizar','Evaluar', 'Crear']
    }, 

    tipoEjecucion:{
        type: String, 
        enum: ['Al azar', 'Orden numeral', 'Mayor dificultad','Menor dificultad']
    },

    asignatura: {
        type: String 
    },

    detalles: {
        type: String
    },

    //Enlaces de interes y/o información complementaria. Se entrega solo en preguntas de Ensayo.
    retroalimentacion: {
        type: [{
            type: String  
        }]
    }, 

});

module.exports = mongoose.model('Evaluacion', EvaluacionSchema);