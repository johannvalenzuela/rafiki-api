'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EvaluacionSchema = new Schema ({
    
    profesorAutor: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },

    createAt: {
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
        type: Schema.Types.ObjectId, ref: 'Asignatura'
    },

    detalles: {
        type: String
    },

    //Enlaces de interes y/o información complementaria. Se entrega solo en preguntas de Ensayo.
    retroalimentacion: {
        type: Schema.Types.ObjectId, ref: 'RecursoEducativo'
    }, 

    titulo: {
        type: String
    },

    actividades: [{
        type: Schema.Types.ObjectId, ref: 'Actividad'
    }]

});

module.exports = mongoose.model('Evaluacion', EvaluacionSchema);