const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = new Schema({

    nombre: {
        type: String
    },

    salaCurso: {
        type: String
    },

    nivel: {
        type: String
    },

    detalles: {
        type: String
    },

    planificacion: {
        type: [{

            oa: String, //REFERENCIAR OBJETIVO DE APRENDIZAJE
            fecha: Date,
            detalles: String,
            recursos: {
                type: [{
                    type: String
                    //REFERENCIAR RECURSO EDUCATIVO
                }]
            },
        }]
    },

    profesores: {
        type: [{
            type: String
            //REFERENCIAR USER
        }]
    },

    alumnos: {
        type: [{
            type: String
            //REFERENCIAR USER
        }]
    },

    //Fecha de creación
    createAt: {
        type: Date,
        default: Date.now
    }

    /*asignatura: {
        type: String
    },*/

});

module.exports = mongoose.model('Curso', CursoSchema);